import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Pressable, Modal } from 'react-native';
import { SafeAreaView, ScrollView, StatusBar, Alert, React } from 'react-native';
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
                                In order for the FISH app to sync with the main database, the phone must be connected
                                to the internet.
                                {'\n'}
                                {'\n'}
                                Please verify that you have established internet connection before attempting to connect
                                to the database.
                                {'\n'}
                                {'\n'}
                                You can check if you have internet connection by going to your device's settings and seeing if
                                it is connected to wifi or if you have cellular connection.
                                {'\n'}
                                {'\n'}
                                If you are connected to the internet but are still unable to sync your device with the database, please
                                attempt to sync at a later time, as there could be issues with the main server.
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
                                {'\n'}
                                Viewing Catch History
                                {'\n'}
                            </Text>
                            <Text style={styles.boxText}>
                                To view your catch history, navigate to the "view" button located at the bottom of the homescreen.
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
                                To make an entry, you will first need to navigate to the homescreen.
                                {'\n'}
                                {'\n'}
                                If you are using an Android device, you will have the option to input your caught fish's PIT tag via Bluetooth. 
                                Otherwise, if you are using an IOS device, you must manually input the PIT tag in the entry field.
                            </Text>
                            <Image style={styles.image} source={require('../assets/pit_entry.png')}></Image>
                            <Text style={styles.boxText}>
                                {'\n'}
                                {'\n'}
                                Once you have entered a valid PIT tag value, click the "Enter" button and navigate to the data entry page. 
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
                                Tips for Improving App Experience
                                {'\n'}
                                {'\n'}
                            </Text>
                            <Text style={styles.boxText}>
                                {'\n'}
                                For best practice and to avoid connectivity issues, always ensure that your version of the database is 
                                up-to-date before going fishing.
                                {'\n'}
                                {'\n'}
                                You can do this by clicking the "sync" button on the home screen while you are connected to the internet.
                                {'\n'}
                                {'\n'}
                                We reccomend that you have X MB of data free on your device when using this app.
                            </Text>
                        </ScrollView>
                    </View>
                </Modal>
                <Text style={styles.titleText}>Instructions
                    {'\n'}
                    {'\n'}
                </Text>
                <ScrollView style={styles.scrollView}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => { setShowModal1(!showModal1) }}
                        style={styles.databaseBtn}
                    >
                        <Text style={styles.buttonText}>
                            Syncing Your Phone with the Database
                        </Text>
                    </Pressable>
                    <Text>
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Pressable
                        onPress={() => { setShowModal2(!showModal2) }}
                        style={styles.viewBtn}
                    >
                        <Text style={styles.buttonText}>
                            Viewing Most Recent Catches
                        </Text>
                    </Pressable>
                </View>
                <Text>
                    {'\n'}
                    {'\n'}
                </Text>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => { setShowModal3(!showModal3) }}
                        style={styles.entryBtn}
                    >
                        <Text style={styles.buttonText}>
                            Making an Entry
                        </Text>
                    </Pressable>
                    <Text>
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Pressable
                        onPress={() => { setShowModal4(!showModal4) }}
                        style={styles.tipsBtn}
                    >
                        <Text style={styles.buttonText}>
                            Tips for Best Usability
                        </Text>
                    </Pressable>
                </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cadetlblue',
        paddingTop: StatusBar.currentHeight,
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
    titleText: {
        color: '#18324e',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        top: "10%",
        fontFamily: "Arial",
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
    safeAreaView: {
        marginHorizontal: 20,
        padding: 20,
    },
    image: {
        width: 100,
        height: undefined,
        resizeMode: 'contain',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#008ae6',
        borderRadius: 50,
        width: '85%',
    },
    buttonText: {
        fontSize: 30,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        width: '95%',
        alignSelf: 'flex-end'
    },
    databaseBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1f3f61',
        borderRadius: 50,
        width: '90%',
    },
    viewBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#28517D',
        borderRadius: 50,
        width: '90%',
    },
    entryBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#6481A0',
        borderRadius: 50,
        width: '90%',
    },
    tipsBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#8FA3B9',
        borderRadius: 50,
        width: '90%',
    },
});
