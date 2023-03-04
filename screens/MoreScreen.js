import { Alert, FlatList, Modal, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import {clearLocal, clearRecent} from '../database/databasefunctions';


export default function MoreScreen({navigation}) {
  // history modal
  const [historyVisible, setHistoryVisible] = useState(false);

  // data for history
  const [data, setData] = useState([]);

  // data for clearing
  const [cleared, setCleared] = useState(false);

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
  }

  // style for rows of hisotry
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

  // This function is for the clear button in the history modal
  // just clears all the users fishing history
  function clearHistory() {
    // start db
    const db = SQLite.openDatabase("fish.db");

      // drop history
      db.transaction(tx => {
  
        // drop history
        tx.executeSql("DROP TABLE IF EXISTS history;", []);
    });

    // set data to empty, then run next function
    setData([]); 
    openHistory();    
  }

  // this function opens the history stored on the app (all catches)
  // just stores in the constant to be shown by the flatlist
  function openHistory() {

    // get history
    const db = SQLite.openDatabase("fish.db");
    db.transaction(tx => {

      // function for setting history data
      const storeInfo = (_array) => {

        // get count
        var count = Object.keys(_array).length;

        // if history table not empty, store in data field
        if(count >= 0)
        {
          setData(_array);
        }

      };

      // select all from history and store
      tx.executeSql(
        "select * from history", 
        [],
        // success
        (_, { rows: { _array } }) => storeInfo(_array));
    });

    // make modal visible
    setHistoryVisible(true);
  }

  return (
    <View style={styles.container}>

      <Modal
      animationType="slide"
      transparent={true}
      visible={historyVisible}
      >
        <View style={styles.bgmodal}>

          <View style={styles.modalView}>

            <TouchableOpacity style={styles.closeIcon} onPress={() => setHistoryVisible(false)}>
                  <Image style={styles.Modalicon} source={require('../assets/exit.png')}></Image>
            </TouchableOpacity>


          

            <View style={styles.header}>

              <TouchableOpacity style={styles.clearIcon} onPress={() => {Alert.alert(
                                                                          "Clearing History",
                                                                          "This will clear your fishing history. Are you sure you want to continue?",
                                                                          [
                                                                            { text: "Cancel" },
                                                                            { text: "Clear",
                                                                              onPress: () => clearHistory()}
                                                                          ]
                                                                        );} }>
                <Text style={styles.buttonTextClear}>Clear</Text>
              </TouchableOpacity>
            

              <Text style={styles.headerText}>History</Text>
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

              renderItem={({item,index}) => (
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

              keyExtractor={(item) => item.hex + item.lastCaught}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.moreView}>

        <TouchableOpacity  style ={styles.learn} onPress={() => { Linking.openURL('https://ceias.nau.edu/capstone/projects/CS/2022/TeamPhysh_F22/')}}>
        <Text style={styles.buttonText}>Our Website</Text>
        </TouchableOpacity>

        <TouchableOpacity  style ={styles.history} onPress={() => openHistory()}>
        <Text style={styles.buttonText}>Total Catch History</Text>
        </TouchableOpacity>

        <TouchableOpacity  style ={styles.otherOne} onPress={() => {Alert.alert(
                                                                  "Clearing History",
                                                                  "This will clear your recent catches. Are you sure you want to continue?",
                                                                  [
                                                                    { text: "Cancel" },
                                                                    { text: "Clear",
                                                                      onPress: () => clearRecent()}
                                                                  ]
                                                                );}}>
          <Text style={styles.buttonText}>Clear Recent Catches</Text>
        </TouchableOpacity>

        <TouchableOpacity  style ={styles.otherTwo} onPress={() => {Alert.alert(
                                                                  "Clearing History",
                                                                  "This will clear your whole local database. You must restart the app to redownload it. Are you sure you want to continue?",
                                                                  [
                                                                    { text: "Cancel" },
                                                                    { text: "Clear",
                                                                      onPress: () => clearLocal()}
                                                                  ]
                                                                );}}>
          <Text style={styles.buttonText}>Clear Local Database</Text>
        </TouchableOpacity>
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

    moreView:{
      justifyContent: 'center',
      width: "100%",
      height: "100%",
    },

    learn:{
      backgroundColor: '#797bab',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 2.5,
      
    },

    history:{
      backgroundColor: '#bb98a7',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 2.5,
    },

    otherOne:{
      backgroundColor: '#dfb9a1',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 2.5,
    },

    otherTwo:{
      backgroundColor: '#edcdb4',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 2.5,
    },

    buttonText:{
      color: 'black',
      fontSize: 25,
      textAlign: 'center',
    },
  
    modalView: {
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(255, 255, 255, 1)',
      
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

    Modalicon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      top: 10,
      right:10,
      position: 'absolute',

    },

    closeIcon: {
      zIndex: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 2.5,
    },

    bgmodal:{
      height: "90%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0)",
    },

    modalText:{
      fontSize: 25,
      top: "5%",
      alignSelf: 'center',
      marginBottom: 40,
    },


    header:{
      justifyContent:'center',
      width: "100%",
      height: "10%",
      backgroundColor: '#bb98a7',
      borderRadius: 0,
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

      position: 'absolute',
      alignSelf: 'center',
      fontSize: 30,
      
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
      color: "black",
    },


    itemRow:{
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

    clearIcon:{
    backgroundColor: '#fc6666',
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

    buttonTextClear: {
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
    },


  });
  
