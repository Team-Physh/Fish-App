import {useState, useEffect} from 'react';
import {  Keyboard, TouchableWithoutFeedback, FlatList, KeyboardAvoidingView, Modal, Alert, StyleSheet, Text, Image, TextInput, View, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'
import * as SQLite from 'expo-sqlite'
import {updateDatabase, getCurrentDate, getCurrentDateNonReadable, downloadDatabase, uploadDatabase, uploadDatabaseSync} from '../database/databasefunctions';
import Svg, { Path } from 'react-native-svg';
import {bluetoothTest} from '../bluetooth/bluetoothfunctions';



export default function HomeScreen({navigation}) {

  // this data is temp storage for whatever key the user is viewing/working on
  const [pitTag, setPit] = useState({
    number: '',
    lastCaught: '0000-00-00T00:00:00.000Z',
    length: 0,
    rivermile: 0,
    species: '',
    // remove?
    temp: '1',
  });

  // const function that just makes the date/time look pretty and readable
  const fixDate=(datetime) => {
    return datetime.slice(0, 19).replace('T', ' ');;
  };

  // main modal bool
  const [modalVisible, setModalVisible] = useState(false);

  // update modal bool
  const [updateVisible, setUpdateVisible] = useState(false);

  // history modal bool
  const [fishHistoryVisible, setFishHistoryVisible] = useState(false);

  // data is stored here temporarily that needs to be viewed.
  const [readyData, setData] = useState([]);

  const [lastSyncDate, updateDate] = useState({
    date: '12023-03-29T00:30:07.662Z',
  });

  // Just converts fish type to readable string for user
  const getSpecies=(species)=>{

    if(species=="RBT")
    {
      return "Rainbow Trout";
    }
    else if (species == "BNT")
    {
      return "Brown Trout";
    }
  };

  // This is run in uploadData function. Basically just checks if it should update or insert value
  // handles edge case for if a user (for whatever reason) uploads data for same fish twice
  // basically just doesnt allow 2 of the same fish to exist in the history table (updates other value instead)
  // NOTE ABOUT THIS ONE: IF WE WANT TO ALLOW A USER TO HAVE A CATCH STORED FOR THE SAME FISH TWICE IN HISTORY (super unlikely), 
  // then uncomment and comment sections in transcation
  const keyExistHistory = (_array) => {

    // opens db
    const db = SQLite.openDatabase("fish.db");

    // gets count
    var count = Object.keys(_array).length;

    // start transaction
    db.transaction(tx => {

      
      // just insert into history no matter what. with this uncommented and bottom part commented, users can have same fish in history 
      // multiple times. If you dont want this, just comment this out and uncomment part below
      tx.executeSql("INSERT INTO history (hex, lastCaught, length, pit, rivermile, species) VALUES (?, ?, ?, ?, ?, ?);",
        [pitTag.number, getCurrentDateNonReadable(), pitTag.length, pitTag.temp, pitTag.rivermile, pitTag.species]);


      // if( count == 0)
      // {
      //   tx.executeSql("INSERT INTO history (hex, lastCaught, length, pit, rivermile, species) VALUES (?, ?, ?, ?, ?, ?);",
      //   [pitTag.number, getCurrentDate(), pitTag.length, pitTag.temp, pitTag.rivermile, pitTag.species]);
      // }

      // else if ( count > 0)
      // {
      //   tx.executeSql("UPDATE history SET lastCaught = ?, length = ?, riverMile = ? WHERE hex = ?;",
      //                   [getCurrentDate(), pitTag.length, pitTag.rivermile, pitTag.number]
      //                   );
      // }



    });

  };

  // This is run in uploadData function. Basically just checks if it should update or insert value
  // handles edge case for if a user (for whatever reason) uploads data for same fish twice
  // basically just doesnt allow 2 of the same fish to exist in the catch table
  const keyExistCatch = (_array) => {

    const db = SQLite.openDatabase("fish.db");

    var count = Object.keys(_array).length;


    db.transaction(tx => {


      if( count == 0)
      {
        // inserting catch
        tx.executeSql("INSERT INTO catchTable (hex, lastCaught, length, pit, rivermile, species) VALUES (?, ?, ?, ?, ?, ?);",
        [pitTag.number, getCurrentDateNonReadable(), pitTag.length, pitTag.temp, pitTag.rivermile, pitTag.species]);
      }

      else if ( count > 0)
      {
        tx.executeSql("UPDATE catchTable SET lastCaught = ?, length = ?, riverMile = ? WHERE hex = ?;",
                        [getCurrentDateNonReadable(), pitTag.length, pitTag.rivermile, pitTag.number]
                        );
      }

    });

  };

  // goes to next modal. Exists because i dont want to run 2 things from the "update data ->" button
  // just combines them here instead
  const nextModal = () => {
    setUpdateVisible(true);
    setModalVisible(false);
  };

  // TODO: WRAP IN NETINFO CHECKER (along with other things requiring online functionality)
  // sync button function. First, checks internet connection. If connected, 
  // it uploads data from recent catches and clears recent catch table
  // then it downloads the database so everything is in sync
  // if no internet, alerts user and does nothing
  function syncUp() {


    // UPLOAD DATA FIRST
    const db = SQLite.openDatabase("fish.db");
    db.transaction(tx => {

      //upload data to local database. runs on success of select from catchTable
      const storeInfo = (_array) => {

        // get count
        var count = Object.keys(_array).length;

        // if catch table not empty, store in data field and upload
        if(count >= 0)
        {

          // upload data
          uploadDatabaseSync(_array);




        }

        };


        // select all recent catches, and upload them. otherwise print no values grabbed cus the table doesnt exist (get data anyways)
        tx.executeSql(
          "select * from catchTable",
          [],
          // success
          (_, { rows: { _array } }) => storeInfo(_array),
          // error
          () => updateDatabase()
                      );

    });

    // start transaction
    db.transaction(tx => {
  
      const useDate = async (_array) => {

        // get date
        var retrievedDate = Object.values(_array[0]);
        

        updateDate({ date: retrievedDate[1]});
        

        };

      // retrieve new data
      tx.executeSql(
        "select * from recentDate WHERE idNum = ?",
        [1],
        // success
        (_, { rows: { _array } }) => useDate(_array));
    });


    

  }

  // This is run when the user confirms new lenght/rivermile in update data popup modal.
  // just uploads data to local database first, then adds the entry to recent catch table and history
  // All this is done locally on phone
  function uploadData() {

    // make db
    const db = SQLite.openDatabase("fish.db");

    // start transaction
    db.transaction(tx => {
    
      // upload data to local database. Does this so it isn't out of date while the user doesn't have internet
      // COMMENTED OUT BECAUSE IT MAKES A DUPE
      // tx.executeSql("INSERT INTO fishTable (hex, lastCaught, length, pit, rivermile, species) VALUES (?, ?, ?, ?, ?, ?);",
      //   [pitTag.number, getCurrentDate(), pitTag.length, pitTag.temp, pitTag.rivermile, pitTag.species]);
      

      // make recent catch table if not exists
      tx.executeSql(
        "create table if not exists catchTable (hex integer prmiary key not null, lastCaught date, length integer, pit varchar(100), riverMile float, species varchar(100));",
        []
        );

      // check if key exist locally already. do so by running that const and either update or insert
      tx.executeSql(
      "select * from catchTable where hex = ?",
      [pitTag.number],
      // success
      (_, { rows: { _array } }) => keyExistCatch(_array));

      // make history catch table if not exists
      tx.executeSql(
        "create table if not exists history (hex integer prmiary key not null, lastCaught date, length integer, pit varchar(100), riverMile float, species varchar(100));",
        []
        );

      // check if key exist locally already. do so by running that const and either update or insert
      tx.executeSql(
        "select * from history where hex = ?",
        [pitTag.number],
        // success
        (_, { rows: { _array } }) => keyExistHistory(_array));

    });


    // finally, close modal
    setUpdateVisible(false);
  }

  // This is run when you press the green enter button.
  // it just stores data for the fish from local database to const so the user can view/edit it
  function enterTag(number) {

    // open db
    const db = SQLite.openDatabase("fish.db");

  

      // this const runs when it gets a valid code from DB. just gets the data
      const printInfo = (_array) => {
        
        
        // get count of keys retrieved
        var count = Object.keys(_array).length;

        // if entry found (count>1)
        if (count >= 1)
        {
          // get data for the first key (will be most recent since sorted by date)
          //var key = Object.values(_array[0]);

          var key = _array[0];
          

          // set data retrieved (3 is hex?)
          setPit({ number: key.hex, species: key.species, lastCaught: key.lastCaught, length: key.length, rivermile: key.riverMile, temp: key.pit});

          // make screen visible to user so they can see the data
          setModalVisible(true);
        }

        // otherwise, the code doesn't exist in database. 
        // if you want to allow the user to create a new PIT code in the database, heres the place to do it
        // right now just shows an error
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

    // start transcation
    db.transaction(tx => {

          // gets all data for that pit code and orders by the date
          tx.executeSql(
          "select * from fishTable where hex = ? ORDER BY lastCaught DESC",
          [number],
          // success, show user the data
          (_, { rows: { _array } }) => printInfo(_array),
          
          () => console.log("db not exist"));

      });
  }

  // This function is run for when the user wants to view the history of a fish. (all of its catches)
  // shows a list of every catch of a single given fish
  function fishHistory() {
    setData([]);
    // get history
    // open db
    const db = SQLite.openDatabase("fish.db");

    // start transaction
    db.transaction(tx => {
  
      //stores data to array
      const storeInfo = (_array) => {
        
        // get count
        var count = Object.keys(_array).length;

        
        // if recent catches exist for fish (they have to at this point)
        if(count >= 0)
        {
          // set to data array
          setData(_array);
        }

      };

      // select a given fish and get its history 
      tx.executeSql(
        "select * from fishTable where hex = ?",
        [pitTag.number],
        // success, store in data so it can be viewed
        (_, { rows: { _array } }) => storeInfo(_array));
    });

    // make visible so user can see history modal slide up
    setFishHistoryVisible(true);
  }

  // style for rows of history from first modal.
  // this is here because of the functionality from the background colors alternating
  const rowStyle = (index) => ({
    borderBottomColor: 'rgba(100, 100, 100, .7)',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomWidth: 3,
    width: "100%",
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, .7)' : 'rgba(200, 200, 200, 0.7)',
  });


  // sync button (styling is up here in case we want to add functionality to it. (ex: making it only appear when a sync is needed?))
  // currently serves no purpose other than styling, but its up here because i may want to add some functionality later
  const syncStyle = () => ({
    backgroundColor: 'rgba(255, 253, 250, .5)',
    height: 50,
    width: 70,
    justifyContent: 'center',
    borderRadius: 100,
    // top: "45%",
    alignSelf: 'center',
    left: 10,
    position: 'absolute',
    borderWith: 5,
    borderWidth: 0,
    borderColor: 'black',
    bottom: 0,
  });


  // bluetooth button style
  const bluetoothIcon = () => ({
    backgroundColor: 'rgba(64, 128, 2, 0.5)',
    height: Platform.OS === 'android' ? 70 : 0,
    width: Platform.OS === 'android' ? 100 : 0,
    justifyContent: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    left: 10,
    position: 'absolute',
    borderWith: 5,
    borderWidth: 0,
    borderColor: 'black',
    top: "15%",
  });


  const blueImage = () => ({
    height: Platform.OS === 'android' ? 35 : 0,
    width: Platform.OS === 'android' ? 35 : 0,
    resizeMode: 'contain',
    alignSelf: 'center',
  });


  // this runs when you open screen. gets last sync date
  useEffect(() => {

    // open db
    const db = SQLite.openDatabase("fish.db");

    
    // start transaction
    db.transaction(tx => {
  
      const useDate = (_array) => {

        // get date
        var retrievedDate = Object.values(_array[0]);
        

        updateDate({ date: retrievedDate[1]});
        

        };

      // retrieve new data
      tx.executeSql(
        "select * from recentDate WHERE idNum = ?",
        [1],
        // success
        (_, { rows: { _array } }) => useDate(_array));
    });
  }, []);


  // This function is run for when the user wants to view the history of a fish. (all of its catches)
  // shows a list of every catch of a single given fish
  async function bluetoothRun(scannerNum) {

    var pit = await bluetoothTest(2);
    console.log("HOMESCREEN PIT");
    console.log(pit);
    if (pit === undefined){
      Alert.alert(
        "PIT code not recieved from bluetooth",
        "Make sure scanner is connected",
        [
          { text: "Ok" }
        ]
      );
    }
    else{
      enterTag(pit);
    }
    
  }




  // screen begin
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

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

              

              <View style={styles.headerHist}>

              <TouchableOpacity style={styles.closeIconHist} onPress={() => setFishHistoryVisible(false)}>
                    <Image style={styles.ModaliconHist} source={require('../assets/exit.png')}></Image>
              </TouchableOpacity>
              
                <Text style={styles.headerTextHist}>Previous Catches:{"\n"}{pitTag.number}</Text>

              </View>

              <FlatList
                style ={styles.flatlisterHist}
                  ListHeaderComponent={() => (
                    <View style={styles.listHeadHist}>
                    </View>
                  )}
                  data={readyData}

                  contentContainerStyle={{ paddingBottom: "100%" }}

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
                          Date: {new Date(item.lastCaught).toLocaleString("en-US", {
            localeMatcher: "best fit",
          })}
                          </Text>
                          <Text style={styles.rightTextHist}>
                          Mile: {item.riverMile}
                          </Text>
                        </View>
                    </View>
                  )}
                  keyExtractor={(item) => item.hex+ ' '+item.lastCaught}
              />

            </View>

          </View>

        </Modal>

        <View style={styles.bgmodal}>

          <View style={styles.modalView}>

            

            <View style={styles.modalHeader}>

            <TouchableOpacity style={styles.zraiser} onPress={() => setModalVisible(false)}>
                  <Image style={styles.Modalicon} source={require('../assets/exit.png')}></Image>
            </TouchableOpacity>


            <Text style={styles.modalText}>View Data</Text>


              <TouchableOpacity style={styles.infoIcon} onPress={() => fishHistory()}>
                <Text style={styles.buttonTextInfo}>More</Text>
              </TouchableOpacity>

              
            </View>

            <View style = {styles.displayData}>

              <Text style={styles.headerText}>Tag Number</Text>
              <Text style={styles.dataText}>{pitTag.number}</Text>

              <Text style={styles.headerText}>Species</Text>
              <Text style={styles.dataText}>{getSpecies(pitTag.species)}</Text>

              <Text style={styles.headerText}>Last Caught</Text>
              <Text style={styles.dataText}>{new Date(pitTag.lastCaught).toLocaleString("en-US", {
            localeMatcher: "best fit",
            timeZoneName: "short"
          })}</Text>
              
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.bgmodal}>

          <KeyboardAvoidingView behavior='padding'
            keyboardVerticalOffset={
            Platform.select({
              ios: () => -30,
              android: () => -30
            })() }        style={styles.modalView}>

            

            <View style={styles.modalHeader}>


            <TouchableOpacity style={styles.zraiser} onPress={() => setUpdateVisible(false)}>
                  <Image style={styles.Modalicon} source={require('../assets/exit.png')}></Image>
            </TouchableOpacity>

              <Text style={styles.modalText}>Update</Text>
            </View>

            <View style = {styles.displayData}>

              <Text style={styles.headerTextUpdate}>New Length</Text>
              <TextInput
                  style={styles.textInUpdate}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: pitTag.number, species: pitTag.species, lastCaught: pitTag.lastCaught, length: text, rivermile: pitTag.rivermile, temp: pitTag.temp})    }
                  placeholder="Enter Length (mm)"
                  placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
                  keyboardType="numeric"
                />

              <Text style={styles.headerTextUpdate}>River Mile</Text>
              <TextInput
                  style={styles.textInUpdate}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: pitTag.number, species: pitTag.species, lastCaught: pitTag.lastCaught, length: pitTag.length, rivermile: text, temp: pitTag.temp})    }
                  placeholder="Enter River Mile"
                  placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
                  keyboardType="numeric"
                />

              <Text style={styles.headerTextUpdate}>Current Timestamp</Text>
              <Text style={styles.dataText}>{new Date().toLocaleString("en-US", {
            localeMatcher: "best fit",
            timeZoneName: "short"
          })}</Text>

              <TouchableOpacity style={styles.nextButton} onPress={() => uploadData()}>
                <Text style={styles.updateText}>Confirm Updates</Text>
              </TouchableOpacity>

            </View>

          </KeyboardAvoidingView>
        </View>

        </TouchableWithoutFeedback>
      </Modal>

      
      

      <View style={styles.header}>
        <TouchableOpacity style={syncStyle()} onPress={() => syncUp()}>
          <Text style={styles.buttonTextSync}>Sync</Text>
        </TouchableOpacity>

        <TouchableOpacity  style ={styles.help} onPress={() => navigation.navigate('HelpScreen')}>
        <Image style={ styles.icon } source={require('../assets/question.png')}></Image>
      </TouchableOpacity>


        <Text style={styles.topHeader}>View and Update</Text>
      </View>
      <View style={styles.svgheader}>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 144 1440 320"><Path fill="rgb(40, 81, 135)" fill-opacity="1" d="M0,192L26.7,170.7C53.3,149,107,107,160,85.3C213.3,64,267,64,320,80C373.3,96,427,128,480,154.7C533.3,181,587,203,640,224C693.3,245,747,267,800,261.3C853.3,256,907,224,960,202.7C1013.3,181,1067,171,1120,181.3C1173.3,192,1227,224,1280,245.3C1333.3,267,1387,277,1413,282.7L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></Path></Svg>
      </View>

      <KeyboardAvoidingView behavior='padding'
      keyboardVerticalOffset={
      Platform.select({
        ios: () => -250,
        android: () => -250
      })() }           
      style={styles.itemsHome}
      >


        <TouchableOpacity style={bluetoothIcon()} onPress={() => bluetoothRun()}>
        <Image style={blueImage()} source={require('../assets/blue.png')}></Image>
        </TouchableOpacity>

        <Text style ={styles.dateText}> Last Attempted Sync{"\n"} {new Date(lastSyncDate.date).toLocaleString("en-US", {
            localeMatcher: "best fit",
          })}</Text>

        <TextInput
            style={styles.textIn}
            autoCapitalize="none"
            onChangeText={text => setPit({ number: text, species: pitTag.species, lastCaught: pitTag.lastCaught, length: pitTag.length, rivermile: pitTag.riverMile, temp: pitTag.temp})}
            placeholder="Enter PIT tag"
            placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
            keyboardType="numeric"
          />


        <TouchableOpacity style={styles.sendButton} onPress={() => enterTag(pitTag.number)}>
          <Text style={styles.buttonText}>Enter </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>


      <Footer />

    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(255, 253, 250)',
    },

    itemsHome: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      
    },

    icon:{
      height: 50,
      width: 70,
      resizeMode: 'contain',
      
    },

    help:{
      zIndex: 1,
      justifyContent: 'center',
      height: 50,
      width: 70,
      resizeMode: 'contain',
      right:10,
      bottom: 0,
      position: 'absolute',
      backgroundColor: 'rgba(255, 253, 250, .5)',
      borderRadius: 100,
      
    },
    sendButton:{
      backgroundColor: 'rgb(40, 81, 135)',
      height: '12%',
      width: '70%',
      justifyContent: 'center',
      borderRadius: 50,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 5,
    },

    buttonText:{
      color: 'white',
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
    },

    buttonTextSync:{
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    
    textIn: {
    borderWidth: 2,
    alignSelf: 'center',
    width: "70%",
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    fontSize: 25,
    textAlign: "center",
    // top: "40%",
    borderRadius: 10,
    fontWeight: 'bold',
    },

    modalView: {
      width: "80%",
      height: "60%",
      backgroundColor: 'rgb(255, 253, 250)',
      alignSelf: 'center',
      top: "20%",
      borderRadius: 30,
    },

    Modalicon:{
      backgroundColor: 'rgba(255, 253, 250, .5)',
      height: 50,
      width: 70,
      borderRadius: 100,
      resizeMode: 'contain',
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
      color: 'white',
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
      backgroundColor: 'rgb(40, 81, 135)',
      height: '12%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
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
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
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
    fontWeight: 'bold',
    },

    header:{
      width: "100%",
      height: "15%",
      backgroundColor: 'rgb(40, 81, 135)',
      justifyContent: 'center',
    },

    topHeader:{
      fontWeight: 'bold',
      bottom: 0,
      position: 'absolute',
      alignSelf: 'center',
      fontSize: 25,
      color: 'white',
      
    },

    modalHeader: {
      width: "100%",
      height: "15%",
      backgroundColor: "rgb(40, 81, 135)",
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
      justifyContent: 'center',
      borderRadius: 100,
      // top: "45%",
      right: 10,
      position: 'absolute',
    },

    infoIcon:{
      backgroundColor: 'rgba(255, 253, 250, .5)',
      height: 50,
      width: 70,
      justifyContent: 'center',
      borderRadius: 100,
      // top: "45%",
      left: 10,
      position: 'absolute',
      },

    buttonTextInfo: {
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },

    modalViewHist: {
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(255, 255, 255, 1)',
      
      alignSelf: 'center',
      top: "10%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 5,
      marginBottom: 2,
    },
  
    ModaliconHist:{
      height: 50,
      width: 70,
      resizeMode: 'contain',
      right:10,
      position: 'absolute',
      backgroundColor: 'rgba(255, 253, 250, .5)',
      borderRadius: 100,
      
    },
  
    closeIconHist: {
      zIndex: 1,
      justifyContent: 'center',
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
      backgroundColor: '#c6bfb3',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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
      borderWidth: 2,
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

    svgheader: {
      top: "15%",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 255, 0, 0)",
      position: "absolute",
    },

    dateText: {
      fontWeight: 'bold',
      position: 'absolute',
      top: "15%",
      fontSize: 12,
      alignSelf: 'center',
      textAlign: 'center',
    }

});
  
