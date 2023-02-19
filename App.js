import {useEffect} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewScreen from './screens/ViewScreen';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import HelpScreen from './screens/HelpScreen';
import * as SQLite from 'expo-sqlite';
 import { getAllData, downloadDatabase } from './database/databasefunctions.js';

const Stack = createNativeStackNavigator()

export default function App() {
  console.log("App Start");

  // THIS CHECKS IF IT IS USERS FIRST TIME OPENING APP. IF SO, DOWNLOAD DATABASE
  useEffect(() => {
  const db = SQLite.openDatabase("fish.db");
  db.transaction(tx => {

    //upload data to local database
    const checkinfo = (_array) => {
      //var count = Object.keys(_array).length;
      //console.log(_array);
      //9891031619722

      var count = Object.keys(_array).length;

      // if catch table not empty, store in data field
      if(count > 0)
      {
        console.log("DB Populated");
      }

      };



      tx.executeSql(
        "select * from fishTable",
        [],
        // success
        (_, { rows: { _array } }) => checkinfo(_array),
        // error
        () => downloadDatabase()
                    );
  });
}, []);



  // download function!
  //downloadDatabase();

  return (
    <View style={{ flex: 1,}}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: true, 
          gestureEnabled: true,
        }} 
        mode="modal"
        initialRouteName="Home">

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
