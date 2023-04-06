import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { downloadDatabase } from '../database/databasefunctions.js';
import {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import Svg, { Path } from 'react-native-svg';


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
        species: '',
        // remove?
        temp: '1',
    });



  return (
    <View style={styles.container}>
        <View style={styles.moreheader}>
            <Text style={styles.moreheaderText}>New entry for code:{'\n'}{pitNum}</Text>
        </View>
        <View style={styles.svgheader}>
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 144 1440 320"><Path fill="rgb(76, 106, 62)" fill-opacity="1" d="M0,192L26.7,170.7C53.3,149,107,107,160,85.3C213.3,64,267,64,320,80C373.3,96,427,128,480,154.7C533.3,181,587,203,640,224C693.3,245,747,267,800,261.3C853.3,256,907,224,960,202.7C1013.3,181,1067,171,1120,181.3C1173.3,192,1227,224,1280,245.3C1333.3,267,1387,277,1413,282.7L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></Path></Svg>
    </View>


        <View style={styles.entryFields}>

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

              <Text style={styles.headerTextUpdate}>Species</Text>

              <Text style={styles.headerTextUpdate}>Current Timestamp</Text>
              <Text style={styles.dataText}>{new Date().toLocaleString("en-US", {
            localeMatcher: "best fit",
            timeZoneName: "short"
          })}</Text>

        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(248, 245, 237)',
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
        backgroundColor: 'rgba(255, 0, 0, .2)',
        top: "15%",
        height: "60%",
    },





  });
  
