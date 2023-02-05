import {useState} from 'react';
import { Modal, Alert, StyleSheet, Text, Image, TextInput, View, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'
import * as SQLite from 'expo-sqlite'
import {downloadDatabase} from '../database/databasefunctions'

export default function HomeScreen({navigation}) {

  // pit constant
  const [pitTag, setPit] = useState({
    number: '',
  });


  const [modalVisible, setModalVisible] = useState(false);

  function enterTag(number)
  {
  const db = SQLite.openDatabase("fish.db");

    // testing function that prints out whatever index of data your tryna see. Can also print whole thing
    const printInfo = (_array) => {
    //console.log(Object.values(_array[1]));

    var count = Object.keys(_array).length;

    // if entry found
    if (count >= 1)
    {
      console.log("got em");
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
    console.log(count);
    console.log(_array);

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



            <Text style={styles.modalText}>Tag Number: {pitTag.number}</Text>
          </View>
          </View>

      </Modal>








            <TouchableOpacity onPress={() => navigation.navigate('HelpScreen')}>
                      <Image style={ styles.icon } source={require('../assets/question.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.syncButton} onPress={() => downloadDatabase()}>
              <Text style={styles.buttonText}>Download DB </Text>
            </TouchableOpacity>
            <Text style={styles.boxText}>Scanning Screen</Text>
            <TextInput
                style={styles.textIn}
                autoCapitalize="none"
                onChangeText={text => setPit({ number: text})}
                label={"Username"}
                placeholder="Enter PIT tag"
              />
            <TouchableOpacity style={styles.sendButton} onPress={() => enterTag(pitTag.number)}>
              <Text style={styles.buttonText}>ENTER </Text>
            </TouchableOpacity>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    icon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      top: 50,
      right:20,
      position: 'absolute',
    },

    boxText:{
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        top: "30%",
        alignSelf: 'center',
    },
    sendButton:{
      backgroundColor: 'lightblue',
      height: '10%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
      top: "30%",
      alignSelf: 'center',
    },

    syncButton:{
      backgroundColor: 'lightgreen',
      height: '10%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
      top: "15%",
      alignSelf: 'center',
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
    fontSize: "20px",
    textAlign: "center",
    top: "30%",
    alignSelf: 'center',
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
      marginTop: 30,
      marginLeft: 20,
      fontSize: 15,
    },
  
  });
  
