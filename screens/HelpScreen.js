import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Modal } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';

export default function HelpScreen({ navigation }) {
    //button 1 modal
    const [showModal1, setShowModal1] = useState(false);
    //button 2 modal
    const [showModal2, setShowModal2] = useState(false);
    //button 3 modal
    const [showModal3, setShowModal3] = useState(false);
    //button 4 modal
    const [showModal4, setShowModal4] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.help} onPress={() => navigation.goBack()}>
                <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
            </TouchableOpacity>
            <SafeAreaView style={styles.container}>
                {/*Modal 1*/}
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal1}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.help} onPress={() => setShowModal1(!showModal1)}>
                            <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
                        </TouchableOpacity>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.titleText}>             
                                Syncing with the Database
                                {'\n'}
                                {'\n'}
                                {'\n'}
                            </Text>

                            <Text style={styles.boxText}>
                                - In order for the FISH app to keep the most up to date data, it must sync by uploading your stored catches and downloading new catches.
                                {'\n'}
                                {'\n'}
                                - Please verify that you have established internet connection before attempting to sync your data with the sync button on the home page.
                                {'\n'}
                                {'\n'}
                                - You should try to sync once you return from fishing and have some recent catches to upload (shown in the view screen).
                                {'\n'}
                                {'\n'}
                                - Once you are connected to the internet, just press the sync button to upload your recent catches and get the most recent data.
                                {'\n'}
                                {'\n'}
                                - If you are connected to the internet but are still unable to sync your device with the database, please
                                attempt to sync at a later time, as there could be server issues.
                            </Text>
                        </ScrollView>
                    </View>
                </Modal>
                {/*Modal 2*/}
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal2}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.help} onPress={() => setShowModal2(!showModal2)}>
                            <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
                        </TouchableOpacity>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.titleText}>
                                Viewing Catch History
                                {'\n'}
                                {'\n'}
                                {'\n'}
                            </Text>
                            <Text style={styles.boxText}>
                                - Recent catches (catches stored but not uploaded) are shown in the "Recent Catches" screen.
                                {'\n'}
                                {'\n'}
                                - If you wish to view your entire catch history, go to the "More" screen and press "Total Catch History"

                            </Text>
                        </ScrollView>
                    </View>
                </Modal>
                {/*Modal 3*/}
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal3}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.help} onPress={() => setShowModal3(!showModal3)}>
                            <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
                        </TouchableOpacity>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.titleText}>
                                Making an Entry
                                {'\n'}
                                {'\n'}
                                {'\n'}
                            </Text>
                            <Text style={styles.boxText}>
                                - To make an entry, you will first need to navigate to the homescreen.
                                {'\n'}
                                {'\n'}
                                - If you are using an Android device, you will have the option to input your caught fish's PIT tag via Bluetooth. 
                                Otherwise, if you are using an iOS device, you must manually input the PIT tag in the entry field.
                                {'\n'}
                                {'\n'}
                                - Once you have entered a valid PIT tag value, click the "Enter" button and navigate to the data entry page. 
                                Here, you will be able to input other values for your caught fish, such as length and the mile marker at which it was caught.
                                {'\n'}
                                {'\n'}
                            </Text>
                        </ScrollView>
                    </View>
                </Modal>
                {/*Modal 4*/}
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal4}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.help} onPress={() => setShowModal4(!showModal4)}>
                            <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
                        </TouchableOpacity>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.titleText}>
                                {'\n'}
                                Bluetooth
                                {'\n'}
                                {'\n'}
                            </Text>
                            <Text style={styles.boxText}>
                                - Bluetooth is currently an Android only feature. In order to use the bluetooth feature, start by connecting to the scanner in your device settings.
                                {'\n'}
                                {'\n'}
                                - Once connected, scan the fish PIT tag. Once the tag number is shown on the scanner device, press the bluetooth icon on the app.
                                {'\n'}
                                {'\n'}
                                - It could several attempts, but the tag number should transmit to the Android device and prompt the user with a data entry screen.
                            </Text>
                        </ScrollView>
                    </View>
                </Modal>
                <Text style={styles.titleText}>Help
                    {'\n'}
                    {'\n'}
                </Text>
                <ScrollView style={styles.scrollView}>

    <View style={styles.moreView}>
        <TouchableOpacity  style ={styles.learn} onPress={() => { setShowModal1(!showModal1) }}>
        <Text style={styles.buttonText}>Syncing</Text>
        </TouchableOpacity>

        <TouchableOpacity  style ={styles.history} onPress={() => { setShowModal2(!showModal2) }}>
        <Text style={styles.buttonText}>Catch History</Text>
        </TouchableOpacity>

        <TouchableOpacity  style ={styles.otherOne} onPress={() => { setShowModal3(!showModal3) }}>
          <Text style={styles.buttonText}>Entering Data</Text>
        </TouchableOpacity>

        <TouchableOpacity  style ={styles.otherTwo} onPress={() => { setShowModal4(!showModal4) }}>
          <Text style={styles.buttonText}>Bluetooth</Text>
        </TouchableOpacity>
      </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(248, 245, 237)",
    },
    boxText: {
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

    moreView:{
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        paddingTop: 100,
      },
      
    titleText: {
        color: '#222d1c',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        top: "10%",
        fontFamily: "Arial",
    },

    modal: {
        backgroundColor: "rgb(248, 245, 237)",
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        top: 50,
        right: 20,
        position: 'absolute',
    },
    help: {
        zIndex: 1,
    },
    scrollView: {
        margin: 20,
    },
    image: {
        width: 100,
        height: undefined,
        resizeMode: 'contain',
    },
    buttonText:{
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
      },

        learn:{
      backgroundColor: '#49683D',
      height: '50%',
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
      backgroundColor: '#768D6B',
      height: '50%',
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
      backgroundColor: '#A2B097',
      height: '50%',
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
      backgroundColor: '#D0D5C5',
      height: '50%',
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
});
