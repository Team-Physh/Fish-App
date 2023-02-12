import {useState} from 'react';
import { Modal, Alert, StyleSheet, Text, Image, TextInput, View, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'
import * as SQLite from 'expo-sqlite'
import {downloadDatabase} from '../database/databasefunctions'

export default function HomeScreen({navigation}) {

  // pit constant
  const [pitTag, setPit] = useState({
    number: '',
    lastCaught: '',
    length: 0,
    rivermile: 0,
    species: '',
  });


  // main modal
  const [modalVisible, setModalVisible] = useState(false);

  // update modal
  const [updateVisible, setUpdateVisible] = useState(false);


  // date grabber
  const getCurrentDate=()=>{

      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      //Alert.alert(date + '-' + month + '-' + year);
      // You can turn it in to your desired format
      return year + '-' + month + '-' + date;//format: d-m-y;
}


function uploadData()
{
  // db.transaction(tx => {
  //
  //       //upload data to local database
  //       for (var i = 0; i < data.length; i++)
  //       {
  //       const array = data[i];
  //
  //       tx.executeSql("UPDATE fishTable (hex, lastCaught, length, pit, riverMile, species) VALUES (?, ?, ?, ?, ?, ?)",
  //                       [array.hex, array.lastCaught, array.length, array.pit, array.riverMile, array.species])
  //       }
  //
  //       console.log("database download complete");
  //
  //
  //       // // function for testing, just selects the table to print it out and stuff. printInfo above is called for this
  //       //         tx.executeSql(
  //       // "select * from fishTable",
  //       // null,
  //       // // success
  //       // (_, { rows: { _array } }) => printInfo(_array),
  //       // // error
  //       // () => console.log("error fetching")
  //       //             );
  //
  //   });



  setModalVisible(false);


}




  function enterTag(number)
  {
  const db = SQLite.openDatabase("fish.db");

    // this const runs when it gets a valid code from DB
    const printInfo = (_array) => {


    var count = Object.keys(_array).length;

    // if entry found
    if (count == 1)
    {
      var key = Object.values(_array[0]);


      // set data retrieved
      if (key[5] == 'RBT')
      {
        setPit({ number: key[0], species: "Rainbow Trout", lastCaught: key[1], length: key[2], rivermile: key[4]});
      }
      else if (key[5] = "BNT")
      {
        setPit({ number: key[0], species: "Brown Trout", lastCaught: key[1], length: key[2], rivermile: key[4]});
      }
      // make screen visible
      setModalVisible(true);




    }
    else
    {
      Alert.alert(
      "Invalid PIT code",
      "This will change to new entry screen maybe",
      [
        { text: "Ok" }
      ]
    );
    }

    //9891031619722
    };

  db.transaction(tx => {

        // function for testing, just selects the table to print it out and stuff. printInfo above is called for this
        tx.executeSql(
        "select * from fishTable where hex = ?",
        [number],
        // success
        (_, { rows: { _array } }) => printInfo(_array),
        // error
        () => console.log("error fetching")
                    );

    });
  }


  const nextModal = () => {
    setUpdateVisible(true);
    setModalVisible(false);

  }






    return (
        <View style={styles.container}>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.bgmodal}>

          <View style={styles.modalView}>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image style={styles.Modalicon} source={require('../assets/exit.png')}></Image>
          </TouchableOpacity>

          <Text style={styles.modalText}>View Data</Text>


            <View style = {styles.displayData}>


              <Text style={styles.headerText}>Tag Number</Text>
              <Text style={styles.dataText}>{pitTag.number}</Text>

              <Text style={styles.headerText}>Species</Text>
              <Text style={styles.dataText}>{pitTag.species}</Text>

              <Text style={styles.headerText}>Last Caught</Text>
              <Text style={styles.dataText}>{pitTag.lastCaught}</Text>

              <Text style={styles.headerText}>River Mile</Text>
              <Text style={styles.dataText}>{pitTag.rivermile}</Text>

              <Text style={styles.headerText}>Last Recorded Length</Text>
              <Text style={styles.dataText}>{pitTag.length} mm</Text>

              <TouchableOpacity style={styles.nextButton} onPress={() => nextModal()}>
                <Text style={styles.updateText}>Update Data  ⮕</Text>
              </TouchableOpacity>

            </View>


          </View>
          </View>

      </Modal>







       <Modal
        animationType="fade"
        transparent={true}
        visible={updateVisible}
        >
        <View style={styles.bgmodal}>

          <View style={styles.modalView}>

          <TouchableOpacity onPress={() => setUpdateVisible(false)}>
                <Image style={styles.Modalicon} source={require('../assets/exit.png')}></Image>
          </TouchableOpacity>

          <Text style={styles.modalText}>Update Data</Text>


            <View style = {styles.displayData}>


              <Text style={styles.headerText}>New Length</Text>
              <TextInput
                  style={styles.textInUpdate}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: pitTag.number, species: pitTag.species, lastCaught: pitTag.lastCaught, length: text, rivermile: pitTag.rivermile})    }
                  placeholder="Enter Length (mm)"
                />

              <Text style={styles.headerText}>River Mile</Text>
              <TextInput
                  style={styles.textInUpdate}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: pitTag.number, species: pitTag.species, lastCaught: pitTag.lastCaught, length: pitTag.length, rivermile: text})    }
                  placeholder="Enter River Mile"
                />

              <Text style={styles.headerText}>Current Date</Text>
              <Text style={styles.dataText}>{getCurrentDate()}</Text>

              <TouchableOpacity style={styles.nextButton} onPress={() => uploadData()}>
                <Text style={styles.updateText}>Confirm Updates</Text>
              </TouchableOpacity>

            </View>


          </View>
          </View>

      </Modal>














            <TouchableOpacity  style ={styles.help} onPress={() => navigation.navigate('HelpScreen')}>
                      <Image style={ styles.icon } source={require('../assets/question.png')}></Image>
            </TouchableOpacity>


            <View style={styles.itemsHome}>

              <Text style={styles.boxText}>Scan</Text>
              <TextInput
                  style={styles.textIn}
                  autoCapitalize="none"
                  onChangeText={text => setPit({ number: text})}
                  placeholder="Enter PIT tag"
                />
              <TouchableOpacity style={styles.sendButton} onPress={() => enterTag(pitTag.number)}>
                <Text style={styles.buttonText}>ENTER </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.syncButton} onPress={() => downloadDatabase()}>
                <Text style={styles.buttonText}>Download DB </Text>
              </TouchableOpacity>

            </View>


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
    },

    boxText:{
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        // top: "40%",
        alignSelf: 'center',
    },
    sendButton:{
      backgroundColor: 'lightblue',
      height: '10%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
      // top: "40%",
      alignSelf: 'center',
    },

    syncButton:{
      backgroundColor: 'lightgreen',
      height: '10%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
      // top: "45%",
      alignSelf: 'center',
      marginTop: 10,
    },

    buttonText:{
      color: 'black',
      fontSize: 25,
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
    alignSelf: 'center',
    borderRadius: 10,
    },

    modalView: {
      width: "80%",
      height: "60%",
      backgroundColor: 'silver',
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
      top: "5%",
      alignSelf: 'center',
      marginBottom: 40,
    },

    headerText:{
      fontWeight: "bold",
      fontSize: 15,
      alignSelf: 'center',
      marginTop: 10,
    },
    dataText:{
      fontSize: 15,
      alignSelf: 'center',
    },

    nextButton:{
      alignSelf: 'center',
      backgroundColor: 'lightblue',
      height: '10%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
      marginTop: 20,
    },

    displayData:{
      width: "100%",
      height: "80%",
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-between',
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
    },
  
  });
  
