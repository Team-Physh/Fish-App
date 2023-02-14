import { TouchableOpacity , Text , Image , StyleSheet , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Footer(){
    const navigation = useNavigation();
    return(
            <View elevation={5} style={ style.footer }>
                  <View style={ style.textAlign }>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                      <Image style={ style.icon } source={require('../assets/scan.png')}></Image>
                      <Text style={style.iconText}>Scan</Text>
                     </TouchableOpacity> 
                     <TouchableOpacity onPress={() => navigation.navigate('View')}>
                      <Image style={ style.icon } source={require('../assets/catches.png')}></Image>
                      <Text style={style.iconText}>View</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('More')}>
                      <Image style={ style.icon } source={require('../assets/more.png')}></Image>
                      <Text style={style.iconText}>More</Text>
                     </TouchableOpacity>
                     
                  </View>
            </View>
    );
}
const style = StyleSheet.create({
   footer:{
     flex: 1,
     backgroundColor: 'white',
     position: 'absolute',
     left: 0,
     right: 0,
     bottom: 0,
     height: '12%',
     borderRadius: 20,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.8,
     shadowRadius: 2,  
     elevation: 5,
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


})
