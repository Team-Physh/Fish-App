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
                                {'\n'}
                                {'\n'}
                                Syncing with the Database
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
                            <Text style={styles.boxText}>
                                text
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
                            <Text style={styles.boxText}>
                                text
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
                            <Text style={styles.headerText}>
                                {'\n'}
                                {'\n'}
                                Tips for Improving App Experience
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
                    <Text style={styles.headerText}>How to Use the FISH App</Text>
                    <Text style={styles.boxText}>
                        {'\n'}
                        Once you scan the fish with your PIT scanner, record it's PIT tag value in the entry field.
                        {'\n'}
                        {'\n'}
                        <Image style={styles.image} source={require('../assets/help_scan_page.png')} />
                        {'\n'}
                        Before you upload any data, make sure that you have the most recent version of the database possible.
                        {'\n'}
                        {'\n'}
                        You can do this by clicking the "Download DB" button on the home screen when you have access to the internet.
                        {'\n'}
                        {'\n'}
                        Click the "Enter" button. Once clicked, you will be sent to the data entry page where you can
                        update information on your fish, such as size and the mile marker at which it was caught.
                        {'\n'}
                        {'\n'}
                        The time of the catch is automatically recorded. If you are retroactively updating a fish's information, please change the time and
                        date accordingly before submitting.
                        {'\n'}
                        {'\n'}
                    </Text>
                    <Text style={styles.titleText}>
                        Additional Help
                        {'\n'}
                        {'\n'}
                        {'\n'}
                        {'\n'}
                        {'\n'}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={() => { setShowModal1(!showModal1) }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                My phone isn't{'\n'} syncing with{'\n'} the database
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { setShowModal2(!showModal2) }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                How can I{'\n'} view my most{'\n'} recent catches
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
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                How do I{'\n'} know if my{'\n'} entry was{'\n'} uploaded?
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { setShowModal4(!showModal4) }}
                            style={styles.button}
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
        color: 'rgb(40, 81, 135)',
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
        backgroundColor: '#008ae6',
        borderRadius: 50,
        width: '45%',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        width: '100%',
        alignSelf: 'flex-end'
    }
});
