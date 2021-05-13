import React ,{useEffect, useState }from "react";
import {View,FlatList,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { Avatar,Divider  } from 'react-native-elements';
export default  function  Home({ navigation }){
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`https://api.github.com/users`)
          .then((response) => response.json())
          .then((json) => setData(json))
          .then(console.log(data))
          .catch((error) => console.error(error))
      }, [])
      
      return(
        <View style={Styles.container}>
          <FlatList
        keyExtractor={(item) => item.id} 
        ItemSeparatorComponent={() => (<View
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
          />)}
        data={data} 
        renderItem={({ item }) => ( 
            <TouchableOpacity onPress={()=>navigation.navigate('User',item)}>
                 <View style={Styles.list}>
            <Avatar
               rounded
            source={{
                   uri:
                     item.avatar_url,
                   }}
            />
            <Text style={{paddingLeft:5}}>{item.login}
            </Text>
            </View>
            </TouchableOpacity>
        )}
        />
        </View>
    );
}
const Styles = StyleSheet.create({
    container: { flex: 1,
        padding: 16,
        paddingTop: 10,
        backgroundColor: '#fff' },
  list:{flexDirection: 'row',
     alignItems: 'center',
     justifyContent:'flex-start',
     fontSize:50,
     paddingBottom:15,
     paddingTop:15}
});