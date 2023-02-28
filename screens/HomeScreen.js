import {useState, useEffect} from 'react';
import {  FlatList, KeyboardAvoidingView, Modal, Alert, StyleSheet, Text, Image, TextInput, View, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'
import * as SQLite from 'expo-sqlite'
import {downloadDatabase, uploadDatabase} from '../database/databasefunctions'

export default function HomeScreen({navigation}) {
  //9891031619722
  // pit constant
  const [pitTag, setPit] = useState({
    number: '',
    lastCaught: '0000-00-00T00:00:00.000Z',
    length: 0,
    rivermile: 0,
    species: '',
    // remove?
    temp: '1',
  });

  const fixDate=(datetime)=>{
    return datetime.slice(0, 19).replace('T', ' ');;
  }


  // main modal
  const [modalVisible, setModalVisible] = useState(false);

  // update modal
  const [updateVisible, setUpdateVisible] = useState(false);

  // history modal
  const [fishHistoryVisible, setFishHistoryVisible] = useState(false);

  // data to be uploaded or data to be viewed for fish history
  const [readyData, setData] = useState([]);

  // date grabber
  const getCurrentDate=()=>{

      var date;
      date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      //date = new Date();


      // if we dont want seconds/minutes
      // date = date.getUTCFullYear() + '-' +
      // ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      // ('00' + date.getUTCDate()).slice(-2);

    //   date = date.getUTCFullYear() + '-' +
    // ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    // ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    // ('00' + date.getUTCHours()).slice(-2) + ':' + 
    // ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    // ('00' + date.getUTCSeconds()).slice(-2);
 
      return date;//format: d-m-y H:M:S;
}


// Const that checks if we should update or insert to history 
const keyExistHistory = (_array) => {

    const db = SQLite.openDatabase("fish.db");

    var count = Object.keys(_array).length;

    console.log("KEYS:");
    console.log(count);


    db.transaction(tx => {


      if( count == 0)
      {
        tx.executeSql("INSERT INTO history (hex, lastCaught, length, pit, rivermile, species) VALUES (?, ?, ?, ?, ?, ?);",
        [pitTag.number, getCurrentDate(), pitTag.length, pitTag.temp, pitTag.rivermile, pitTag.species]);
      }

      else if ( count > 0)
      {
        tx.executeSql("UPDATE history SET lastCaught = ?, length = ?, riverMile = ? WHERE hex = ?;",
                        [getCurrentDate(), pitTag.length, pitTag.rivermile, pitTag.number]
                        );
      }



  });

    };

// Const that checks if we should update or insert to catchtable 
const keyExistCatch = (_array) => {

    const db = SQLite.openDatabase("fish.db");

    var count = Object.keys(_array).length;

    console.log("KEYS:");
    console.log(count);


    db.transaction(tx => {


      if( count == 0)
      {
        tx.executeSql("INSERT INTO catchTable (hex, lastCaught, length, pit, rivermile, species) VALUES (?, ?, ?, ?, ?, ?);",
        [pitTag.number, getCurrentDate(), pitTag.length, pitTag.temp, pitTag.rivermile, pitTag.species]);
      }

      else if ( count > 0)
      {
        tx.executeSql("UPDATE catchTable SET lastCaught = ?, length = ?, riverMile = ? WHERE hex = ?;",
                        [getCurrentDate(), pitTag.length, pitTag.rivermile, pitTag.number]
                        );
      }

  });

    };



// species grabber. converts abbrev to string
const getSpecies=(species)=>{

  if(species=="RBT")
  {
    return "Rainbow Trout";
  }
  else if (species == "BNT")
  {
    return "Brown Trout";
  }
}

  // goes to next modal 
  const nextModal = () => {
    setUpdateVisible(true);
    setModalVisible(false);

  }

  // format datetime
  const formateDateTime = () => {
    
  }
// sync button function WILL CHANGE
// uploads recent catches, then downloaded new database. Should only be done once in a while
function syncUp()
{

  // UPLOAD DATA FIRST
  const db = SQLite.openDatabase("fish.db");
  db.transaction(tx => {

    //upload data to local database
    const storeInfo = (_array) => {
      //var count = Object.keys(_array).length;
      console.log(_array);
      //9891031619722

      var count = Object.keys(_array).length;

      // if catch table not empty, store in data field and upload
      if(count >= 0)
      {
        setData(_array);
        uploadDatabase(readyData);
      }

      };

      tx.executeSql(
        "select * from catchTable",
        [],
        // success
        (_, { rows: { _array } }) => storeInfo(_array),
        // error
        () => console.log("No values grabbed")
                    );
  });

  // download database
  downloadDatabase();

}




// this updates entries 
function uploadData()
{
  const db = SQLite.openDatabase("fish.db");
  db.transaction(tx => {
  
        //upload data to local database
  
        tx.executeSql("UPDATE fishTable SET lastCaught = ?, length = ?, riverMile = ? WHERE hex = ?;",
                        [getCurrentDate(), pitTag.length, pitTag.rivermile, pitTag.number]
                        );

    });
    db.transaction(tx => {
  
      //upload data to local database

      // check if local table exists first
      tx.executeSql(
        "create table if not exists catchTable (hex integer prmiary key not null, lastCaught date, length integer, pit varchar(100), riverMile float, species varchar(100));",
        []
        );



        // check if key exist locally
        tx.executeSql(
        "select * from catchTable where hex = ?",
        [pitTag.number],
        // success
        (_, { rows: { _array } }) => keyExistCatch(_array),
        // error
        () => console.log("Error with key conflict stuff (catchtable)")
                    );




      // check if history table exists first
      tx.executeSql(
        "create table if not exists history (hex integer prmiary key not null, lastCaught date, length integer, pit varchar(100), riverMile float, species varchar(100));",
        []
        );


      // check if key exist locally
      tx.executeSql(
        "select * from history where hex = ?",
        [pitTag.number],
        // success
        (_, { rows: { _array } }) => keyExistHistory(_array),
        // error
        () => console.log("Error with key conflict stuff (history)")
                    );





  });


  setUpdateVisible(false);


}



// this runs when u hit green enter button
  function enterTag(number)
  {
  const db = SQLite.openDatabase("fish.db");

    // this const runs when it gets a valid code from DB
    const printInfo = (_array) => {


      var count = Object.keys(_array).length;
      console.log(count);
      // if entry found
      if (count >= 1)
      {
        var key = Object.values(_array[0]);


        // set data retrieved (3 is hex?)
        setPit({ number: key[0], species: key[5], lastCaught: key[1], length: key[2], rivermile: key[4], temp: key[3]});

        // make screen visible
        setModalVisible(true);


      }
      else
      {
        Alert.alert(
        "PIT code not found",
        "Try again",
        [
          { text: "Ok" }
        ]
      );
      }


    };

  db.transaction(tx => {

        // function for testing, just selects the table to print it out and stuff. printInfo above is called for this
        tx.executeSql(
        "select * from fishTable where hex = ? ORDER BY lastCaught DESC",
        [number],
        // success
        (_, { rows: { _array } }) => printInfo(_array),
        // error
        () => console.log("error fetching")
                    );

    });
  }


  // stores data of a fishes history in data const for display in the history modal
  function fishHistory()
  {
    setData([]);
    // get history
    const db = SQLite.openDatabase("fish.db");
    db.transaction(tx => {
  
      //upload data to local database
      const storeInfo = (_array) => {
        //var count = Object.keys(_array).length;
        //console.log(_array);
        //9891031619722

        var count = Object.keys(_array).length;
        
        // if catch table not empty, store in data field
        if(count >= 0)
        {
          // clear and set
          setData(_array);
        }

        };

        tx.executeSql(
          "select * from fishTable where hex = ? ORDER BY lastCaught DESC",
          [pitTag.number],
          // success
          (_, { rows: { _array } }) => storeInfo(_array),
          // error
          () => console.log("FISH HISTORY EMPTY ERROR")
                      );
    });

    console.log("HELLO")
    // make visible
    setFishHistoryVisible(true);

    
  }

  // style for rows of history from first modal
  const rowStyle = (index) => ({
    borderBottomColor: 'rgba(100, 100, 100, .5)',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomWidth: 3,
    width: "100%",
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, .8)' : 'rgba(200, 200, 200, 0.8)',
  });


  // sync button (styling is up here in case we want to add functionality)
  const syncStyle = () => ({
    backgroundColor: '#c6d9fd',
    height: 50,
    width: 70,
    justifyContent: 'center',
    borderRadius: 100,
    // top: "45%",
    alignSelf: 'center',
    top: 50,
    left: 20,
    position: 'absolute',
    borderWith: 5,
    borderWidth: 0,
    borderColor: 'black',
    shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 2.5,
  });

    // screen begin
    return (
        <View style={styles.container}>


        {/* FIRST POP UP */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >


          {/* INSIDE POP UP */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={fishHistoryVisible}
            >
            <View style={styles.bgmodalHist}>

              <View style={styles.modalViewHist}>

              <TouchableOpacity style={styles.closeIconHist} onPress={() => setFishHistoryVisible(false)}>
                    <Image style={styles.ModaliconHist} source={require('../assets/exit.png')}></Image>
              </TouchableOpacity>


              

              <View style={styles.headerHist}>
              

                <Text style={styles.headerTextHist}>Previous Catches:{"\n"}{pitTag.number}</Text>
              </View>



              <FlatList
                style ={styles.flatlisterHist}
                  ListHeaderComponent={() => (
                    <View style={styles.listHeadHist}>
                    </View>
                  )}
                  data={readyData}

                  ListEmptyComponent={() => (
                    <View style={styles.emptyViewHist}>
                      <Text style={styles.emptyTextHist}>
                        No stored catches
                      </Text>
                    </View>
                  )}



                  renderItem={({item,index}) => (
                    <View style={rowStyle(index)}>
                        <View style={styles.leftSideHist}>
                          <Text style={styles.rowTextHist}>
                          PIT: {item.hex}
                          </Text>
                        </View>

                        <View style={styles.rightSideHist}>
                          <Text style={styles.rightTextHist}>
                            Length: {item.length}mm
                            </Text>
                            <Text style={styles.rightTextHist}>
                            Species: {getSpecies(item.species)}
                            </Text>
                            <Text style={styles.rightTextHist}>
                          Date: {fixDate(item.lastCaught)}
                          </Text>
                          <Text style={styles.rightTextHist}>
                          Mile: {item.riverMile}
                          </Text>
                        </View>
                    </View>
                  )}
                  keyExtractor={(item) => item.hex+ ' '+item.pit+' '+item.lastCaught}
                />




              </View>
              </View>

          </Modal>






        <View style={styles.bgmodal}>

          <View style={styles.modalView}>

          <TouchableOpacity style={styles.zraiser} onPress={() => setModalVisible(false)}>
                <Image style={styles.Modalicon} source={require('../assets/exit.png')}></Image>
          </TouchableOpacity>

          <View style={styles.modalHeader}>


          <TouchableOpacity style={styles.infoIcon} onPress={() => fishHistory()}>
            <Text style={styles.buttonTextInfo}>More</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>View Data</Text>
          </View>

            <View style = {styles.displayData}>


              <Text style={styles.headerText}>Tag Number</Text>
              <Text style={styles.dataText}>{pitTag.number}</Text>

              <Text style={styles.headerText}>Species</Text>
              <Text style={styles.dataText}>{getSpecies(pitTag.species)}</Text>

              <Text style={styles.headerText}>Last Caught</Text>
              <Text style={styles.dataText}>{fixDate(pitTag.lastCaught)}</Text>
              
              <Text style={styles.headerText}>Last River Mile</Text>
              <Text style={styles.dataText}>{pitTag.rivermile}</Text>

              <Text style={styles.headerText}>Last Recorded Length</Text>
              <Text style={styles.dataText}>{pitTag.length}mm</Text>

              <TouchableOpacity style={styles.nextButton} onPress={() => nextModal()}>
                <Text style={styles.updateText}>Update Data  ⮕</Text>
              </TouchableOpacity>

            </View>


          </View>
          </View>

      </Modal>









     
































        {/* UPDATE DATA POP UP */}
       <Modal
        animationType="fade"
        transparent={true}
        visible={updateVisible}
        >
        <View style={styles.bgmodal}>

          <KeyboardAvoidingView behavior='padding'
  keyboardVerticalOffset={
            Platform.select({
              ios: () => 0,
              android: () => 0
            })() }        style={styles.modalView}>

          <TouchableOpacity style={styles.zraiser} onPress={() => setUpdateVisible(false)}>
                <Image style={styles.Modalicon} source={require('../assets/exit.png')}></Image>
          </TouchableOpacity>

          <View style={styles.modalHeader}>
          <Text style={styles.modalText}>Update Data</Text>
          </View>

            <View style = {styles.displayData}>


              <Text style={styles.headerTextUpdate}>New Length</Text>
              <TextInput
                  style={styles.textInUpdate}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: pitTag.number, species: pitTag.species, lastCaught: pitTag.lastCaught, length: text, rivermile: pitTag.rivermile, temp: pitTag.temp})    }
                  placeholder="Enter Length (mm)"
                />

              <Text style={styles.headerTextUpdate}>River Mile</Text>
              <TextInput
                  style={styles.textInUpdate}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: pitTag.number, species: pitTag.species, lastCaught: pitTag.lastCaught, length: pitTag.length, rivermile: text, temp: pitTag.temp})    }
                  placeholder="Enter River Mile"
                />

              <Text style={styles.headerTextUpdate}>Current Timestamp</Text>
              <Text style={styles.dataText}>{getCurrentDate()} UTC</Text>

              <TouchableOpacity style={styles.nextButton} onPress={() => uploadData()}>
                <Text style={styles.updateText}>Confirm Updates</Text>
              </TouchableOpacity>

            </View>


          </KeyboardAvoidingView>
          </View>

      </Modal>














            <TouchableOpacity  style ={styles.help} onPress={() => navigation.navigate('HelpScreen')}>
                      <Image style={ styles.icon } source={require('../assets/question.png')}></Image>
            </TouchableOpacity>

            <View style={styles.header}>

              <TouchableOpacity style={syncStyle()} onPress={() => syncUp()}>
                <Text style={styles.buttonTextSync}>Sync</Text>
              </TouchableOpacity>
            <Text style={styles.topHeader}>View and Update</Text>
          </View>


            <KeyboardAvoidingView behavior='padding'
  keyboardVerticalOffset={
            Platform.select({
              ios: () => -250,
              android: () => -250
            })() }           
            style={styles.itemsHome}>
              <TextInput
                  style={styles.textIn}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: text, species: pitTag.species, lastCaught: pitTag.lastCaught, length: pitTag.length, rivermile: pitTag.riverMile, temp: pitTag.temp})}
                  placeholder="Enter PIT tag"
                />
              <TouchableOpacity style={styles.sendButton} onPress={() => enterTag(pitTag.number)}>
                <Text style={styles.buttonText}>Enter </Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>





            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    itemsHome: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      flex: 1,
    },

    icon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      top: 50,
      right:20,
      position: 'absolute',
    },

    help:{
      zIndex: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 2.5,
    },
    sendButton:{
      backgroundColor: '#89ca97',
      height: '10%',
      width: '70%',
      justifyContent: 'center',
      borderRadius: 50,
      alignSelf: 'center',
    },

    buttonText:{
      color: 'black',
      fontSize: 25,
      textAlign: 'center',
    },

    buttonTextSync:{
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
    },
    

    textIn: {
    borderWidth: 2,
    alignSelf: 'center',
    width: "70%",
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    fontSize: 20,
    textAlign: "center",
    // top: "40%",
    borderRadius: 10,
    
    },

    modalView: {
      width: "80%",
      height: "60%",
      backgroundColor: 'rgb(255, 255, 255)',
      alignSelf: 'center',
      top: "20%",
      borderRadius: 30,
    },

    Modalicon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      top: 10,
      right:10,
      position: 'absolute',
    },

    bgmodal:{
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, .7)",
    },

    modalText:{
      fontWeight: "bold",
      fontSize: 25,
      alignSelf: 'center',
    },

    headerText:{
      fontWeight: "bold",
      fontSize: 15,
      alignSelf: 'center',
    },

    headerTextUpdate: {
      fontWeight: "bold",
      fontSize: 15,
      alignSelf: 'center',
    },

    dataText:{
      fontSize: 15,
      alignSelf: 'center',
      marginBottom: 20,
    },

    nextButton:{
      alignSelf: 'center',
      backgroundColor: '#b5dcb4',
      height: '10%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
      marginTop: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 2.5,
    },

    displayData:{
      width: "100%",
      height: "80%",
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 5,
    },

    updateText:{
      color: 'black',
      fontSize: 15,
      textAlign: 'center',
    },

    bgmodal2:{
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, .7)",
    },
    textInUpdate: {
    borderWidth: 2,
    alignSelf: 'center',
    width: "70%",
    height: 40,
    color: 'black',
    fontSize: 20,
    textAlign: "center",
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
    },

    header:{
      width: "100%",
      height: "15%",
      backgroundColor: 'white',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 5,
      marginBottom: 2,
    },

    topHeader:{
      fontWeight: '',
      bottom: 0,
      position: 'absolute',
      alignSelf: 'center',
      fontSize: 25,
      
    },

    modalHeader: {
      width: "100%",
      height: "15%",
      backgroundColor: "#b5dcb4",
      justifyContent: 'center',
      zIndex: 0,
      borderRadius: 20,
      marginBottom: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 5,
    },

    zraiser: {
      zIndex: 1,
    },

    infoIcon:{
      backgroundColor: '#cfb591',
      height: 50,
      width: 70,
      justifyContent: 'center',
      borderRadius: 100,
      // top: "45%",
      alignSelf: 'center',
      top: 10,
      left: 10,
      position: 'absolute',
      shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 2.5,
      },

      buttonTextInfo: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
      },







      modalViewHist: {
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(255, 255, 255, .8)',
        
        alignSelf: 'center',
        top: "10%",
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 5,
        marginBottom: 2,
      },
  
      ModaliconHist:{
        height: 50,
        width: 50,
        resizeMode: 'contain',
        top: 10,
        right:10,
        position: 'absolute',
  
      },
  
      closeIconHist: {
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 2.5,
      },
  
      bgmodalHist:{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
  
      modalTextHist:{
        fontSize: 25,
        top: "5%",
        alignSelf: 'center',
        marginBottom: 40,
      },
  
  
      headerHist:{
        justifyContent:'center',
        width: "100%",
        height: "10%",
        backgroundColor: '#a7d6a5',
        borderRadius: 0,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 5,
        marginBottom: 2,
      },
  
      headerTextHist:{
        fontWeight: '',
  
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 25,
        
      },
  
      emptyViewHist:{
        width: "100%",
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "",
        
      },
  
      emptyTextHist:{
        textAlign: 'left',
        fontSize:20,
        textAlign: 'center',
        color: "black",
      },
  
  
      itemRowHist:{
        borderBottomColor: '#6e4b78',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white',
        borderBottomWidth: 3,
        width: "90%",
        height: 80,
        alignSelf: 'center',
        justifyContent: 'center',
        zIndex: 0,
      },
  
      rowTextHist:{
        textAlign: 'left',
        fontSize:18,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        fontWeight: 'bold',
      },
  
      leftSideHist: {
        display: "flex",
        flexDirection: "column",
        left: 10,
        position: 'absolute',
      },
  
      rightSideHist: {
        display: "flex",
        flexDirection: "column",
        right: 10,
        position: 'absolute',
      },
      
      rightTextHist:{
        textAlign: 'left',
        fontSize:12,
      },
  
  });
  
