import React ,{useState, useEffect}from "react";
import {View,FlatList,Text,StyleSheet} from 'react-native';
import { Avatar} from 'react-native-elements';
export default function User({ navigation, route}){
    const item1 = route.params;
    const[temp,setTemp]=useState([])
    useEffect(() => {
        fetch(`https://api.github.com/users/${item1.login}/repos`)
          .then((response) => response.json())
          .then((json) => setTemp(json))
          .then(console.log(temp))
          .catch((error) => console.error(error))
      }, [])
    return(
        <View style={Styles.container}>
            <View style={{flex:1,flexDirection:"row",paddingBottom:40,}}>
        <Avatar
             rounded
          source={{
                 uri:
                   item1.avatar_url,
                 }}
          />
          <Text style={{paddingLeft:5}}>{item1.login}</Text>
          </View>
        <FlatList
      keyExtractor={(item) => item.id} 
      ItemSeparatorComponent={() => (<View
          style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
        />)}
      data={temp} 
      renderItem={({ item }) => ( 
               <View style={Styles.list}>
          <Text>/{item.name}</Text>
          </View>
      )}
      />
      </View>
    )
}
const Styles = StyleSheet.create({
    container: { flex: 1,
        padding: 16,
        backgroundColor: '#fff' },
  list:{flexDirection: 'row',
     alignItems: 'center',
     justifyContent:'flex-start',
     fontSize:50,
     paddingBottom:15,
     paddingTop:15}
});