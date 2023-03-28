import { Alert, FlatList, Modal, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { downloadDatabase } from '../database/databasefunctions.js';
import {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';


export default function SplashScreen({navigation}) {

    const [intro, setIntro] = useState({
        text: "Loading...",
      });

      // useEffect function that checks if user has database downloaded. If not, it will download the database.
  // This is mainly for first time users opening the app.
  useEffect(() => {

    // make db object
    const db = SQLite.openDatabase("fish.db");
  
    // start transaction
    db.transaction(tx => {
  
      //FUNCTION that just runs if db is populated. doesn't do anything, just here for testing
      const checkinfo = (_array) => {

        setIntro("Database found!");
  
        console.log("checking");
  
        //get keycount
        var count = Object.keys(_array).length;
        console.log(count);
  
        //TESTING FUNCTION if local table not empty, just log that it is populated
        if(count > 0)
        {

        navigation.navigate('Home');
        }
        else {
          downloadDatabase();
        }
  
        };

        //setIntro({ text: "Checking for database..."});
  
        // grab all fish
        tx.executeSql(
          "select count(*) from fishTable",
          [],
          // success: do nothing (runs checkinfo function above)
          (_, { rows: { _array } }) => checkinfo(_array),
          // error: table is empty so download DB
          () => downloadSplash()
                      );
    });
  }, []);

  async function downloadSplash(){

    setIntro({ text: "Downloading Database..."});
    await downloadDatabase();
    navigation.navigate('Home');
  }




  return (
    <View style={styles.container}>
        <Text style={styles.textIntro}>{intro.text}</Text>
        <Image style={styles.swimmer} source={require('../assets/swimming.gif')}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(255, 253, 250)',
      justifyContent: 'center',
    },

    textIntro: {
        textAlign: 'center',
        fontSize: 20,
      },
    
    swimmer: {
        width: 300,
        height: 200,
        alignSelf: 'center',
        fontWeight: 'bold',
    },

  });
  
