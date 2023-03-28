import {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewScreen from './screens/ViewScreen';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import HelpScreen from './screens/HelpScreen';
import SplashScreen from './screens/Splash';
import * as SQLite from 'expo-sqlite';
import { getAllData, downloadDatabase } from './database/databasefunctions.js';
import NetInfo from '@react-native-community/netinfo';



// creates stack for stack navigator
const Stack = createNativeStackNavigator()

export default function App() {


  // cache icons for faster loading
  let cacheResources = async () => {
    const images = [
    require('./assets/PHYSH.png'),
    require("./assets/question.png"), 
    require('./assets/scan.png'),
    require('./assets/exit.png'),
    require('./assets/more.png'),
    require('./assets/catches.png'),
    require('./assets/splash.png'),
    ];
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  // load the resources
  useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
    };

    loadResources();
  }, [])

//   // useEffect function that checks if user has database downloaded. If not, it will download the database.
//   // This is mainly for first time users opening the app.
//   useEffect(() => {

//   // make db object
//   const db = SQLite.openDatabase("fish.db");

//   // start transaction
//   db.transaction(tx => {

//     //FUNCTION that just runs if db is populated. doesn't do anything, just here for testing
//     const checkinfo = (_array) => {

//       console.log("checking");

//       //get keycount
//       var count = Object.keys(_array).length;
//       console.log(count);

//       //TESTING FUNCTION if local table not empty, just log that it is populated
//       if(count > 0)
//       {
//         console.log("DB Populated");
//       }
//       else {
//         downloadDatabase();
//       }

//       };

//       console.log("SELECING DB");

//       // grab all fish
//       tx.executeSql(
//         "select count(*) from fishTable",
//         [],
//         // success: do nothing (runs checkinfo function above)
//         (_, { rows: { _array } }) => checkinfo(_array),
//         // error: table is empty so download DB
//         () => downloadDatabase()
//                     );
//   });
// }, []);


  return (
    <View style={{flex: 1}}>
      
      <NavigationContainer>
      
        <Stack.Navigator
        screenOptions={{
          headerShown: true, 
          gestureEnabled: true,
        }} 
        mode="modal"
        initialRouteName="Splash">

        <Stack.Screen options={{
          headerShown: false, 
          gestureEnabled: false,
          animation: 'none',
        }} name="Splash" component={ SplashScreen } />

          <Stack.Screen options={{
          headerShown: false, 
          gestureEnabled: false,
          animation: 'none',
        }} name="Home" component={ HomeScreen } />

        <Stack.Screen options={{
          headerShown: false, 
          gestureEnabled: false,
          animation: 'none',
        }} name="View" component={ ViewScreen } />  

        <Stack.Screen options={{
          headerShown: false, 
          gestureEnabled: false,
          animation: 'none',
        }} name="More" component={ MoreScreen } />  

        <Stack.Screen options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
        }} name="HelpScreen" component={HelpScreen} />  


        </Stack.Navigator>
    </NavigationContainer>
    

    </View>
  );
}

const styles = StyleSheet.create({

  mainView: {
    flex: 1,
    backgroundColor: "rgba(1, 255, 1, 1)",
    zIndex: 5,
  }
});