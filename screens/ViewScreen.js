import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';
import {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite'
import {mmToFeetAndInches, uploadDatabase, getSpecies} from '../database/databasefunctions';

export default function ViewScreen({navigation}) {

  // data that is displayed
  const [data, setData] = useState([]);

  // upload is ready constant
  // THIS IS CURRENTLY ALWAYS FALSE.
  // IF YOU WOULD LIKE THE ABILITY FOR USERS TO UPLOAD DATA WITHOUT DOWNLOADING ANY, UNCOMMENT CODE BELOW (marked)
  const [uploadReady, setUploadReady] = useState(false);

  

  // styling for sync button to appear
  const syncStyle = () => ({
    backgroundColor: 'rgba(255, 253, 250, .5)',
    height: uploadReady == true ? 50 : 0,
    width: uploadReady == true ? 70 : 0,
    justifyContent: 'center',
    borderRadius: 100,
    // top: "45%",
    alignSelf: 'center',
    bottom: "10%",
    left: 10,
    position: 'absolute',
    borderWith: 5,
    borderWidth: 0,
    borderColor: 'black',
    
  });

  // styling for alternating row colors
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
    backgroundColor: index % 2 === 0 ? 'rgba(248, 245, 237, .7)' : 'rgba(200, 200, 200, 0.7)',
    
  });

  // this runs when you open screen. loads in recent catches to show in flatlist
  useEffect(() => {

    // open db
    const db = SQLite.openDatabase("fish.db");

    // start transaction
    db.transaction(tx => {
  
      // store data in data array
      const storeInfo = (_array) => {

        // get count
        var count = Object.keys(_array).length;

        // if catch table not empty, store in data field
        if(count >= 0)
        {
          // make button uppear and store
          // UNCOMMENT THIS LINE TO ALLOW USER TO UPLOAD
          //setUploadReady(true);
          setData(_array);
        }

        };

        // select all values and store
        tx.executeSql(
          "select * from catchTable",
          [],
          // success: store
          (_, { rows: { _array } }) => storeInfo(_array));
    });
  }, []);

  return (
    <View style={styles.container}>

      

      <View style={styles.header}>

        <TouchableOpacity style={syncStyle()} onPress={() => uploadDatabase(data)}>
          <Text style={styles.buttonText}>↑</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Recent Catches</Text>


        <TouchableOpacity  style ={styles.help} onPress={() => navigation.navigate('HelpScreen')}>

                  <Image style={ styles.icon } source={require('../assets/question.png')}></Image>

      </TouchableOpacity>

      </View>

      <View style = {styles.bgscreen}>

        <FlatList
          style ={styles.flatlister}
            ListHeaderComponent={() => (
              <View style={styles.listHead}>
              </View>
            )}
          data={data}

          contentContainerStyle={{ paddingBottom: "100%" }}

          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>
                  No stored catches
              </Text>
            </View>
          )}

          renderItem={({item, index}) => (
            <View style={rowStyle(index)}>
                <View style={styles.leftSide}>
                  <Text style={styles.rowText}>
                  PIT: {item.hex}
                  </Text>
                </View>

                <View style={styles.rightSide}>
                  <Text style={styles.rightText}>
                    Length: {mmToFeetAndInches(item.length)}
                    </Text>
                    <Text style={styles.rightText}>
                    Species: {getSpecies(item.species)}
                    </Text>
                    <Text style={styles.rightText}>
                  Date: {new Date(item.lastCaught).toLocaleString("en-US", {
            localeMatcher: "best fit",
          })}
                  </Text>
                  <Text style={styles.rightText}>
                  Mile: {item.riverMile}
                  </Text>
                </View>
            </View>
          )}

          keyExtractor={(item) => item.hex}

        />
        </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(255, 253, 250)',
    },

    bgscreen: {
      width: "100%",
      height: "100%",
      backgroundColor: 'rgb(248, 245, 237)',
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

    itemRow:{
      borderBottomColor: 'green',
      borderLeftColor: 'white',
      borderRightColor: 'white',
      borderTopColor: 'white',
      borderBottomWidth: 3,
      width: "90%",
      height: 100,
      alignSelf: 'center',
      justifyContent: 'center',
      zIndex: 0,
    },

    header:{
      width: "100%",
      height: "16.666666666%",
      backgroundColor: 'rgb(76, 106, 62)',
      marginBottom: 0,
    },

    headerText:{
      fontWeight: 'bold',
      bottom: "10%",
      position: 'absolute',
      alignSelf: 'center',
      fontSize: 25,
      color: 'white',
      
    },

    rowText:{
      textAlign: 'left',
      fontSize:18,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      fontWeight: 'bold',
      borderWidth: 2,
    },

    leftSide: {
      display: "flex",
      flexDirection: "column",
      left: 10,
      position: 'absolute',
    },

    rightSide: {
      display: "flex",
      flexDirection: "column",
      right: 10,
      position: 'absolute',
    },
    
    rightText:{
      textAlign: 'left',
      fontSize:12,
    },

    emptyView:{
      width: "100%",
      height: 100,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(248, 245, 237)',
      
    },

    emptyText:{
      textAlign: 'left',
      fontSize:20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: "#999",
    },

    buttonText:{
      color: 'black',
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
    },
});
  
