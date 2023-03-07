import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewScreen from './screens/ViewScreen';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import HelpScreen from './screens/HelpScreen';
import * as SQLite from 'expo-sqlite'
 import { getAllData, downloadDatabase } from './database/databasefunctions.js'
//import * as Network from 'expo-network';

const Stack = createNativeStackNavigator()
//const networkState = await Network.getNetworkStateAsync();

export default function App() {
  console.log("App Start");

  //console.log("network state: " + networkState);

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
