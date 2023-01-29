import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'

async function getAllData()
{
  const response = await fetch('http://api.vlexum.com:3000/fish/9891031619722')
  const data = await response.json()

  return data;

  //console.log(JSON.stringify(data, null, 4));

}

async function displayData()
{
  const fishData = await getAllData()
  console.log(fishData);




}

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
  