import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import Footer from '../components/Footer'

export default function MoreScreen({navigation}) {


    return (
        <View style={styles.container}>
            <TouchableOpacity  style ={styles.help} onPress={() => navigation.navigate('HelpScreen')}>
                      <Image style={ styles.icon } source={require('../assets/question.png')}></Image>
            </TouchableOpacity>

            <View style={styles.moreView}>

            <TouchableOpacity  style ={styles.learn} onPress={() => { Linking.openURL('https://ceias.nau.edu/capstone/projects/CS/2022/TeamPhysh_F22/')}}>
            <Text style={styles.buttonText}>Our Website</Text>
            </TouchableOpacity>

            <TouchableOpacity  style ={styles.history} onPress={() => { Linking.openURL('https://ceias.nau.edu/capstone/projects/CS/2022/TeamPhysh_F22/')}}>
            <Text style={styles.buttonText}>View Catch History</Text>
            </TouchableOpacity>

            <TouchableOpacity  style ={styles.otherOne} onPress={() => { Linking.openURL('https://ceias.nau.edu/capstone/projects/CS/2022/TeamPhysh_F22/')}}>
            <Text style={styles.buttonText}>Temp One</Text>
            </TouchableOpacity>

            <TouchableOpacity  style ={styles.otherTwo} onPress={() => { Linking.openURL('https://ceias.nau.edu/capstone/projects/CS/2022/TeamPhysh_F22/')}}>
            <Text style={styles.buttonText}>Temp Two</Text>
            </TouchableOpacity>

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
      backgroundColor: '#fddfba',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
    },

    history:{
      backgroundColor: '#fbd6f3',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
    },

    otherOne:{
      backgroundColor: '#8acc98',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
    },

    otherTwo:{
      backgroundColor: '#c6d9fd',
      height: '10%',
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center',
    },

    buttonText:{
      color: 'black',
      fontSize: 25,
      textAlign: 'center',
    },
  
  });
  
