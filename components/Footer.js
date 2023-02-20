import { TouchableOpacity , Text , Image , StyleSheet , View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function Footer(){
    const navigation = useNavigation();
    const route = useRoute();

    const scanStyle = (name) => ({
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
      backgroundColor: name == "Home" ? "rgba(0, 90, 37, 0.2)" : 0,
      borderRadius: 10,
    });

    const viewStyle = (name) => ({
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
      backgroundColor: name == "View" ? "rgba(0, 90, 37, .2)" : 0,
      borderRadius: 10,
    });

    const moreStyle = (name) => ({
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
      backgroundColor: name == "More" ? "rgba(0, 90, 37, 0.2)" : 0,
      borderRadius: 10,
    });



    
    return(
            <View elevation={5} style={ style.footer }>
                  <View style={ style.textAlign }>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                      <Image style={ scanStyle(route.name) } source={require('../assets/scan.png')}></Image>
                      <Text style={style.iconText}></Text>
                     </TouchableOpacity> 
                     <TouchableOpacity onPress={() => navigation.navigate('View')}>
                      <Image style={ viewStyle(route.name) } source={require('../assets/catches.png')}></Image>
                      <Text style={style.iconText}></Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('More')}>
                      <Image style={ moreStyle(route.name) } source={require('../assets/more.png')}></Image>
                      <Text style={style.iconText}></Text>
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


  iconText:{
    color: 'black',
    textAlign: 'center',
  },


})
