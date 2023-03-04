import { TouchableOpacity , Text , Image , StyleSheet , View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function Footer(){
    const navigation = useNavigation();
    const route = useRoute();

    const scanStyle = (name) => ({
      alignSelf: 'center',
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
      borderBottomWidth: name == "Home" ? 3 : 0,
    });

    const viewStyle = (name) => ({
      alignSelf: 'center',
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
      borderBottomWidth: name == "View" ? 3 : 0,
    });

    const moreStyle = (name) => ({
      alignSelf: 'center',
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
      borderBottomWidth: name == "More" ? 3 : 0,
    });

    const boxStyle = (name) => ({
      height: "100%",
      width: "33.3%",
      resizeMode: 'contain',
      position: 'relative',
      justifyContent: 'center',
      backgroundColor: name == "Home" ? "rgba(0, 0, 0, 0.3)" : 0,
      borderRadius: 20,
    });

    const boxStyleTwo = (name) => ({
      height: "100%",
      width: "33.3%",
      resizeMode: 'contain',
      position: 'relative',
      justifyContent: 'center',
      backgroundColor: name == "View" ? "rgba(0, 0, 0, 0.3)" : 0,
      borderRadius: 20,
    });

    const boxStyleThree = (name) => ({
      height: "100%",
      width: "33.3%",
      resizeMode: 'contain',
      position: 'relative',
      justifyContent: 'center',
      backgroundColor: name == "More" ? "rgba(0, 0, 0, 0.3)" : 0,
      borderRadius: 20,
    });



    
    return(
            <View elevation={5} style={ style.footer }>
                  <View style={ style.textAlign }>
                    <TouchableOpacity style={boxStyle(route.name)} onPress={() => navigation.navigate('Home')}>
                      <Image style={ scanStyle(route.name) } source={require('../assets/scan.png')}></Image>
                      <Text style={style.iconText}></Text>
                     </TouchableOpacity> 
                     <TouchableOpacity style={boxStyleTwo(route.name)} onPress={() => navigation.navigate('View')}>
                      <Image style={ viewStyle(route.name) } source={require('../assets/catches.png')}></Image>
                      <Text style={style.iconText}></Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={boxStyleThree(route.name)} onPress={() => navigation.navigate('More')}>
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
     backgroundColor: 'rgba(194, 193, 191, 1)',
     position: 'absolute',
     left: 0,
     right: 0,
     bottom: 0,
     height: '12%',
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
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
