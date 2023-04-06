import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { downloadDatabase } from '../database/databasefunctions.js';
import {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import Svg, { Path } from 'react-native-svg';
import {Picker} from '@react-native-picker/picker';
import {getCurrentDateNonReadable} from '../database/databasefunctions';



export default function NewEntry({route, navigation}) {

    // gets pit num
    const { pitNum } = route.params;

    // this data is temp storage for whatever key the user is viewing/working on
    // this is used to display data to the user on a singular fish
    const [pitTag, setPit] = useState({
        number: pitNum,
        lastCaught: '0000-00-00T00:00:00.000Z',
        length: 0,
        rivermile: 0,
        species: 'BBH',
        // remove?
        temp: '1',
    });


  // This is run in uploadData function. Basically just checks if it should update or insert value
  // handles edge case for if a user (for whatever reason) uploads data for same fish twice
  // basically just doesnt allow 2 of the same fish to exist in the history table (updates other value instead)
  // NOTE ABOUT THIS ONE: IF WE WANT TO ALLOW A USER TO HAVE A CATCH STORED FOR THE SAME FISH TWICE IN HISTORY (super unlikely), 
  // then uncomment and comment sections in transcation
  const keyExistHistory = (_array) => {

    // opens db
    const db = SQLite.openDatabase("fish.db");

    // gets count (unused right now unless area below is uncommented)
    //var count = Object.keys(_array).length;

    // start transaction
    db.transaction(tx => {

      // just insert into history no matter what. with this uncommented and bottom part commented, users can have same fish in history 
      // multiple times. If you dont want this, just comment this out and uncomment part below
      // if u choose to do it other way, be warned it hasnt been tested too much but it should work. just updated value though
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

    // make db
    const db = SQLite.openDatabase("fish.db");

    // get count
    var count = Object.keys(_array).length;

    // start transaction
    db.transaction(tx => {

      // if the count of keys recieved in 0
      if( count == 0)
      {
        // inserting catch as new catch
        tx.executeSql("INSERT INTO catchTable (hex, lastCaught, length, pit, rivermile, species) VALUES (?, ?, ?, ?, ?, ?);",
        [pitTag.number, getCurrentDateNonReadable(), pitTag.length, pitTag.temp, pitTag.rivermile, pitTag.species]);
      }

      // otherwise its already existing in the recent catches
      else if ( count > 0)
      {
        // update instead
        tx.executeSql("UPDATE catchTable SET lastCaught = ?, length = ?, riverMile = ? WHERE hex = ?;",
                        [getCurrentDateNonReadable(), pitTag.length, pitTag.rivermile, pitTag.number]
                        );
      }

    });

  };

    // upload data functions from homescreen
    function uploadData() {

        // make db
        const db = SQLite.openDatabase("fish.db");
    
        // start transaction
        db.transaction(tx => {
    
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
        navigation.goBack();
  }
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>

        <View style={styles.moreheader}>
        <TouchableOpacity style={styles.help} onPress={() => navigation.goBack()}>
                <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
            </TouchableOpacity>
            <Text style={styles.moreheaderText}>New entry for:{'\n'}{pitNum}</Text>
        </View>
        <View style={styles.svgheader}>
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 144 1440 320"><Path fill="rgb(76, 106, 62)" fill-opacity="1" d="M0,192L26.7,170.7C53.3,149,107,107,160,85.3C213.3,64,267,64,320,80C373.3,96,427,128,480,154.7C533.3,181,587,203,640,224C693.3,245,747,267,800,261.3C853.3,256,907,224,960,202.7C1013.3,181,1067,171,1120,181.3C1173.3,192,1227,224,1280,245.3C1333.3,267,1387,277,1413,282.7L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></Path></Svg>
    </View>

      <KeyboardAvoidingView behavior='padding'
      keyboardVerticalOffset={
      Platform.select({
        ios: () => 0,
        android: () => 0
      })() }           
      style={styles.entryFields}>

        <Text style={styles.headerTextUpdate}>Length</Text>
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

              <Text style={styles.headerTextUpdate}>Species (A-Z)</Text>
              <Picker
                selectedValue={pitTag.species}
                onValueChange={(itemValue, itemIndex) =>
                    setPit({ number: pitTag.number, species: itemValue, lastCaught: pitTag.lastCaught, length: pitTag.length, rivermile: pitTag.rivermile, temp: pitTag.temp})
                }
                style = {styles.fishpicker}>
                <Picker.Item label="BLACK BULLHEAD" value="BBH" />
                <Picker.Item label="BLUEGILL" value="BGS" />
                <Picker.Item label="BLUEHEAD SUCKER" value="BHS" />
                <Picker.Item label="BLACK CRAPPIE" value="BKC" />
                <Picker.Item label="BROOK TROUT" value="BKT" />
                <Picker.Item label="CHANNEL CATFISH" value="CCF" />
                <Picker.Item label="COMMON CARP" value="CRP" />
                <Picker.Item label="CUTTHROAT TROUT" value="CTT" />
                <Picker.Item label="FLANNELMOUTH SUCKER" value="FMS" />
                <Picker.Item label="FLANNELMOUTH/RAZORBACK HYBRID" value="FRH" />
                <Picker.Item label="GREEN SUNFISH" value="GSF" />
                <Picker.Item label="GIZZARD SHAD" value="GZD" />
                <Picker.Item label="HUMPBACK CHUB" value="HBC" />
                <Picker.Item label="LARGEMOUTH BASS" value="LMB" />
                <Picker.Item label="NO FISH CAUGHT" value="NFC" />
                <Picker.Item label="NORTHERN PIKE" value="NOP" />
                <Picker.Item label="PLAINS KILLIFISH" value="PKF" />
                <Picker.Item label="RAZORBACK SUCKER" value="RBS" />
                <Picker.Item label="RAINBOW TROUT" value="RBT" />
                <Picker.Item label="RAINBOW/CUTTHROAT HYBRID" value="RCH" />
                <Picker.Item label="SMALLMOUTH BASS" value="SMB" />
                <Picker.Item label="STRIPED BASS" value="STB" />
                <Picker.Item label="UNIDENTIFIED SUCKER" value="SUC" />
                <Picker.Item label="TEST PIT TAG" value="TET" />
                <Picker.Item label="UNIDENTIFIED TROUT" value="TRT" />
                <Picker.Item label="UNIDENTIFIED BULLHEAD" value="UBH" />
                <Picker.Item label="UNIDENTIFIED BASS" value="UIB" />
                <Picker.Item label="UNIDENTIFIED MINNOW" value="UIM" />
                <Picker.Item label="UNIDENTIFIED SUNFISH" value="UIS" />
                <Picker.Item label="UNIDENTIFIED TROUT" value="UTR" />
                <Picker.Item label="WALLEYE" value="WAL" />
                <Picker.Item label="YELLOW BULLHEAD" value="YBH" />
                <Picker.Item label="YELLOW PERCH" value="YPE" />

              </Picker>

              <Text style={styles.headerTextUpdate}>Current Timestamp</Text>
              <Text style={styles.dataText}>{new Date().toLocaleString("en-US", {
            localeMatcher: "best fit",
            timeZoneName: "short"
          })}</Text>

            <TouchableOpacity style={styles.nextButton} onPress={() => uploadData()}>
                <Text style={styles.updateText}>Confirm Entry</Text>
            </TouchableOpacity>


        </KeyboardAvoidingView>
        
    </View>

    </TouchableWithoutFeedback> 
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(248, 245, 237)',
    },

    fishpicker:{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        marginBottom: 20,
        width: "80%",
        alignSelf: 'center',
    },


    moreheader:{
        width: "100%",
        height: "15%",
        backgroundColor: 'rgb(76, 106, 62)',
        
    },
  
    moreheaderText:{
    fontWeight: 'bold',
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    },
  
    svgheader: {
    top: "15%",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 255, 0, 0)",
    position: "absolute",
    },

    entryFields: {
        top: "10%",
        height: "60%",
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

    nextButton:{
        alignSelf: 'center',
        backgroundColor: 'rgb(76, 106, 62)',
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

    updateText:{
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
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
    bottom: "10%",
    position: 'absolute',
    backgroundColor: 'rgba(255, 253, 250, .5)',
    borderRadius: 100,
    },



  });
  
