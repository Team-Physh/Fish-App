import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Pressable, Modal } from 'react-native';
import {SafeAreaView, ScrollView, StatusBar, Alert, React} from 'react-native';
import { useState } from 'react';

export default function HelpScreen({navigation}) {

    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.container}>
        <TouchableOpacity style ={styles.help} onPress={() => navigation.goBack()}>
                        <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
        </TouchableOpacity>
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    {/*All views of Modal*/}
                    {/*Animation can be slide, slide, none*/}
                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.help} onPress={() => setShowModal(!showModal)}>
                            <Image style={styles.icon} source={require('../assets/exit.png')}></Image>
                        </TouchableOpacity>
                        <Text style={styles.titleText}>
                            {'\n'}{'\n'}
                            Syncing with the Database
                            {'\n'}
                        </Text>
                        <Text>
                            text
                        </Text>
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
                                //onPress={() => Alert.alert('button 1 pressed')}
                                onPress={() => {setShowModal(!showModal)}}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                My phone isn't{'\n'} syncing with{'\n'} the database
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => Alert.alert('button 2 pressed')}
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
                                onPress={() => Alert.alert('button 3 pressed')}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                How do I{'\n'} know if my{'\n'} entry was{'\n'} uploaded?
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => Alert.alert('button 4 pressed')}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                How do I{'\n'} pair my{'\n'} phone with my{'\n'} PIT scanner?
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
        color: 'blue',
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
        backgroundColor: 'lightgreen',
        borderRadius: 50,
        width: '45%',
    },
    buttonText: {
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        width: '100%',
        alignSelf: 'flex-end'
    }
  });
  
