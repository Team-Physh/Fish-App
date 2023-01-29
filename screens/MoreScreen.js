import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'

export default function MoreScreen({navigation}) {


    return (
        <View style={styles.container}>
            <Text style={styles.boxText}>More Page</Text>
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
  
  });
  