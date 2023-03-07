import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Pressable } from 'react-native';
import {SafeAreaView, ScrollView, StatusBar,} from 'react-native';

export default function HelpScreen({navigation}) {

    return (
        <View style={styles.container}>
        <TouchableOpacity style ={styles.help} onPress={() => navigation.goBack()}>
                        <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
        </TouchableOpacity>
            <SafeAreaView style={styles.container}>

                    <Text style={styles.titleText}>Instructions 
                        {'\n'}
                        {'\n'}
                    </Text>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.headerText}>How to Upload Fish Data</Text>
                        <Text style={styles.boxText}>
                            {'\n'}
                            In order to scan your fish, you will need to first make sure 
                            that your device and PIT scanner are connected via Bluetooth.
                            {'\n'}
                            {'\n'}
                            Ensure that your Bluetooth is on by going to your settings and verifying that 
                            your device is ready for Bluetooth pairing. Here, you can also make sure your device 
                            is connected to your PIT scanner.
                            {'\n'}
                            {'\n'}
                        <Image style = {styles.image} source={require('../assets/bluetooth_help.jpg')} />
                            {'\n'}
                            {'\n'}
                            If your device cannot connect to the PIT scanner, you can also 
                            manually input your fish's PIT code in the app.
                            {'\n'}
                            {'\n'}
                            Once you have a value for the PIT tag in the text box, click enter.
                            {'\n'}
                            {'\n'}
                        <Image style={styles.image} source={require('../assets/help_scan_page.png')} />
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
                        <Text style={styles.titleText}>
                            Help
                            {'\n'}
                            {'\n'}
                            {'\n'}
                            {'\n'}
                            {'\n'}
                            {'\n'}
                        </Text>
                        <Pressable
                            onPress={() => Alert.alert('Left button pressed')}
                            style = {styles.button}
                        >
                            <Text style = {styles.buttonText}>
                                My phone isn't syncing with the database
                            </Text>
                        </Pressable>
                        <Text>
                            {'\n'}
                            {'\n'}
                        </Text>
                        <Pressable
                            onPress={() => Alert.alert('Left button pressed')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                How can I view my past catches?
                            </Text>
                        </Pressable>
                        <Text>
                            {'\n'}
                            {'\n'}
                        </Text>
                        <Pressable
                            onPress={() => Alert.alert('Left button pressed')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                My phone isn't syncing with the database
                            </Text>
                        </Pressable>
                        <Text>
                            {'\n'}
                            {'\n'}
                            {'\n'}
                            {'\n'}
                        </Text>
                     </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'cadetblue',
      paddingTop: StatusBar.currentHeight,
    },
    boxText:{
        color: 'black',
        fontSize: 25,
        textAlign: 'left',
        marginLeft: "10%",
        marginRight: "10%",
        fontFamily: "Arial"
    },
    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "Arial",
    },
    titleText: {
        color: 'oldlace',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        top: "10%",
        fontFamily: "Arial",
    },
    icon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      top: 50,
      right:20,
      position: 'absolute',
    },
    help: {
        zIndex: 1,
    },
    scrollView: {
        margin: 20,
    },  
    safeAreaView: {
        marginHorizontal: 20,
        padding: 20,
    }, 
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
    },
    buttonText: {
        fontSize: 25,
    },
  });
  
