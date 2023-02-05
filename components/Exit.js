import { TouchableOpacity , Text , Image , StyleSheet , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Exit({navigation}) {
  
  const backButton = useNavigation();
  
  return (
    <View elevation={5} style={style.Exit}>
      <TouchableOpacity onPress={() => backButton.goBack()}>
        <Image style={style.icon} source={require('../assets/exit.png')}></Image>
      </TouchableOpacity>   
    </View>
  );
}

const style = StyleSheet.create({
   helpIcon:{
     flex: 1,
     position: 'absolute',
     top: 20,
     right: 5,
     height: '12%',
     borderTopColor: '#ccc',
     borderTopWidth: 1,
  },

  textAlign:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  
  icon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
  },

  iconText:{
    color: 'black',
    textAlign: 'center',
  },

  Exit: {
    flex: 1,
    position: 'absolute',
    top: 20,
    right: 5,
    height: '12%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },


})