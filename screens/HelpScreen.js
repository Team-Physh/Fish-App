import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {SafeAreaView, ScrollView, StatusBar,} from 'react-native';

export default function HelpScreen({navigation}) {

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Instructions {'\n'}</Text>
                    <Text style={styles.headerText}>How to Upload Fish Data</Text>
                    <Text style={styles.boxText}>
                        {'\n'}
                        In order to scan your fish, you will need to first make sure 
                        that your device and PIT scanner are connected via Bluetooth.
                        {'\n'}
                        {'\n'}
                        If your device cannot connect to the PIT scanner, you can also 
                        manually input your fish's PIT code in the app.
                        {'\n'}
                        {'\n'}
                        Once you have a value for the PIT tag in the text box, click enter.
                        {'\n'}
                        {'\n'}
                        Next, you will be in the data entry page. If your fish has already been 
                        caught and recorded in our database, some fields may already be filled out.
                        {'\n'}
                        {'\n'}
                        If you notice any of the fields have values missing, please fill them in before
                         moving to the next step.
                        {'\n'}
                        {'\n'}
                        Beofre you click "next," please verify that all information is accurate. Clicking 
                        next will push your entry to the database and bring you to the view page.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    boxText:{
        color: 'black',
        fontSize: 15,
        textAlign: 'left',
        top: "50%"
    },
    headerText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        top: "50%"
    },
    titleText: {
        color: 'black',
        fontSize: 35,
        textAlign: 'center',
        top: "50%"
    },
    icon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      top: 50,
      right:20,
      position: 'absolute',
    },
    ScrollView: {
        margin: 20,
        padding: 20,
    },  
    SafeAreaView: {
        margin: 20,
        padding: 20,
    }, 
  });
  
