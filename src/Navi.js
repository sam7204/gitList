import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import Home from './Home';
import Search from './Search';
import User from './User'
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
export default function Navi() {
  return (
    <NavigationContainer>
    <Tab.Navigator 
    initialRouteName="Home"
    activeColor="#fff" >
      <Tab.Screen name="Home" component={temp}
      options={{
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          )
      }}
      />
      <Tab.Screen name="Search" component={Search}
       options={{
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={26} />
          )
      }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
  function temp(){
    return (
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="User" component={User}/>
        </Stack.Navigator>
      );
  }
