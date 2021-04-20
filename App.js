import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/login/login.screen';
import Home from './src/screens/home/home.screen';
import AddContact from './src/screens/Contacts/AddEdit/Add';
import ListContact from './src/screens/Contacts/List/List';
import {navigationRef} from './src/navigation/Navigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListContact" component={ListContact} />
        <Stack.Screen name="AddContact" component={AddContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
