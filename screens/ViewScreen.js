import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';
import {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite'

export default function ViewScreen({navigation}) {

  const [data, setData] = useState([]);

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

  useEffect(() => {
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
          setData(_array);
        }

        };

        tx.executeSql(
          "select * from catchTable",
          [],
          // success
          (_, { rows: { _array } }) => storeInfo(_array),
          // error
          () => console.log("error fetching")
                      );
    });
  }, []);

    return (
        <View style={styles.container}>
         <TouchableOpacity  style ={styles.help} onPress={() => navigation.navigate('HelpScreen')}>
                      <Image style={ styles.icon } source={require('../assets/question.png')}></Image>
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerText}>Recent Catches</Text>
          </View>


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



              renderItem={({item}) => (
                <View style={styles.itemRow}>
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

      help:{
      zIndex: 1,
    },

    itemRow:{
      borderBottomColor: 'green',
      borderLeftColor: 'white',
      borderRightColor: 'white',
      borderTopColor: 'white',
      borderWidth: 3,
      width: "90%",
      height: 100,
      alignSelf: 'center',
      justifyContent: 'center',
      zIndex: 0,
    },

    header:{
      width: "100%",
      height: "15%",
      borderColor: '#ccc',
      borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 20,
    },

    headerText:{
      fontWeight: 'bold',
      bottom: 0,
      position: 'absolute',
      alignSelf: 'center',
      fontSize: 30,
      
    },

    rowText:{
      textAlign: 'left',
      fontSize:18,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      fontWeight: 'bold',
    },

    leftSide: {
      display: "flex",
      flexDirection: "column",
      left: 0,
      position: 'absolute',
    },

    rightSide: {
      display: "flex",
      flexDirection: "column",
      right: 0,
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

  
  });
  
