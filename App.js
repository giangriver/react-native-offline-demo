import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/login/login.screen';
import Home from "./src/screens/home/home.screen";
import Passcode from './src/screens/passcode/passcode.screen';
import ConfirmPasscode from './src/screens/passcode/confirmpasscode.screen';
import AddContact from './src/screens/Contacts/AddEdit/Add';
import ListContact from './src/screens/Contacts/List/List';
import {navigationRef} from './src/navigation/Navigation';
import NetInfo from "@react-native-community/netinfo";
import {sync_data_if_need } from './src/synchronous/SyncData';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    LogBox.ignoreAllLogs();
    NetInfo.addEventListener(state => {
      if(state.isConnected){
        console.log("NETWORK CHANGE: HAVE")
        sync_data_if_need()
      } else {
        console.log("NETWORK CHANGE: NO");
      }
    });
  })

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Passcode" component={Passcode} />
        <Stack.Screen name="ConfirmPasscode" component={ConfirmPasscode} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListContact" component={ListContact} />
        <Stack.Screen name="AddContact" component={AddContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
