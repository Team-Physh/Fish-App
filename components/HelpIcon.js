import { TouchableOpacity , Text , Image , StyleSheet , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HelpIcon(){
    const navigation = useNavigation();
    return(
            <View elevation={5} style={ style.helpIcon }>
                  <View style={ style.textAlign }>
                    <TouchableOpacity onPress={() => navigation.navigate('HelpScreen')}>
                      <Image style={ style.icon } source={require('../assets/question.png')}></Image>
                     </TouchableOpacity>                    
                  </View>
            </View>
    );
}
const style = StyleSheet.create({
   helpIcon:{
     flex: 1,
     backgroundColor: 'red',
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

  helpIcon: {
    flex: 1,
    position: 'absolute',
    top: 20,
    right: 5,
    height: '12%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },


})