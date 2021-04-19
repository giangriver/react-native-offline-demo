import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login/login.screen';
import Home from "./src/screens/home/home.screen";
import Passcode from './src/screens/passcode/passcode.screen';
import ConfirmPasscode from './src/screens/passcode/confirmpasscode.screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Passcode" component={Passcode} />
        <Stack.Screen name="ConfirmPasscode" component={ConfirmPasscode} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};