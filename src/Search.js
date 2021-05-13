  
import React ,{useEffect, useState }from "react";
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet} from 'react-native';
import { SearchBar ,Avatar} from 'react-native-elements';
export default  function  Search({navigation}){
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [text,setText]=useState('');
  const [fullData, setFullData] = useState([]);
   const handleSearch = text => {
     const filteredData = fullData.filter( user => {
       console.log(fullData);
       const itemData = `${user.login.toUpperCase()}`
         const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;  
     });
     setData(filteredData);
     setText(text);
   };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    fetch(`https://api.github.com/users`)
    .then((response) => response.json())
    .then(json => {
      setData(json);
      setFullData(json);
    })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    });
    return () => {
      unsubscribe;
    };
  }, [navigation])
  return(
    <View style={Styles.container}>
    <SearchBar style={{padding:0}}
        placeholder="Type Here..."
        autoCapitalize="none"
          autoCorrect={false}
          value={text}
          clearButtonMode="always"
          onChangeText={qtext =>handleSearch(qtext)}
          round={true}
          lightTheme={true}
           />
     {isLoading ? <ActivityIndicator/> : (
      <FlatList
        numColumns={2}
    keyExtractor={(item) => item.id} 
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
   <Text style={{paddingRight:20}}>{item.login}
   </Text>
   </View>
   </TouchableOpacity>
    )}
    />
     )}
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