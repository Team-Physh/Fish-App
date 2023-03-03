import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';
import {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite'
import {uploadDatabase} from '../database/databasefunctions';

export default function ViewScreen({navigation}) {

  // data that is displayed
  const [data, setData] = useState([]);

  // upload is ready constant
  const [uploadReady, setUploadReady] = useState(false);

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

  // styling for sync button to appear
  const syncStyle = () => ({
    backgroundColor: '#c6d9fd',
    height: uploadReady == true ? 50 : 0,
    width: uploadReady == true ? 50 : 0,
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

  // styling for alternating row colors
  const rowStyle = (index) => ({
    borderBottomColor: 'green',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomWidth: 3,
    width: "100%",
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: index % 2 === 0 ? 'white' : '#ccc',
    
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
          setUploadReady(true);
          setData(_array);
        }

        };

        // select all values and store
        tx.executeSql(
          "select * from catchTable",
          [],
          // success: store
          (_, { rows: { _array } }) => storeInfo(_array),
          // error
          () => console.log("View screen empty")
                      );
    });
  }, []);

  return (
    <View style={styles.container}>

      <TouchableOpacity  style ={styles.help} onPress={() => navigation.navigate('HelpScreen')}>

                  <Image style={ styles.icon } source={require('../assets/question.png')}></Image>

      </TouchableOpacity>

      <View style={styles.header}>

        <TouchableOpacity style={syncStyle()} onPress={() => uploadDatabase(data)}>
          <Text style={styles.buttonText}>↑</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Recent Catches</Text>

      </View>

      <View style = {styles.bgscreen}>

        <FlatList
          style ={styles.flatlister}
            ListHeaderComponent={() => (
              <View style={styles.listHead}>
              </View>
            )}
          data={data}

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
                    Length: {item.length}mm
                    </Text>
                    <Text style={styles.rightText}>
                    Species: {getSpecies(item.species)}
                    </Text>
                    <Text style={styles.rightText}>
                  Date: {item.lastCaught}
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
      backgroundColor: '#fff',
    },

    bgscreen: {
      width: "100%",
      height: "72%",
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

    headerText:{
      fontWeight: '',
      bottom: 0,
      position: 'absolute',
      alignSelf: 'center',
      fontSize: 25,
      
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
      backgroundColor: "",
      
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
  
