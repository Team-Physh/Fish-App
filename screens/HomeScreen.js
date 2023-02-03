import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'
import * as SQLite from 'expo-sqlite'

export default function HomeScreen({navigation}) {
  const [pitData, setData] = useState({
    tag: '',
    fish: '',
  });

    return (
        <View style={styles.container}>
            <Text style={styles.boxText}>Home/Scan Page</Text>
            <TouchableOpacity style={styles.buttonTest} onPress={() => displayData()}>
              <Text style={styles.buttonText}>API call button</Text>
              <Text style={styles.buttonText}>{pitData.fish}</Text>
            </TouchableOpacity>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center' 
    },
    boxText:{
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    buttonTest:{
      backgroundColor: 'green',
      height: '20%',
      width: '50%',
      justifyContent: 'center',
      borderRadius: 50,
    },

    buttonText:{
      color: 'black',
      fontSize: 25,
      textAlign: 'center',
    }
  
  });
  
