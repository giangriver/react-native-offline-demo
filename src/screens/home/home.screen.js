import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, BackHandler, TouchableOpacity } from 'react-native'
import styles from "./home.styles";
import * as Navigation from '../../navigation/Navigation';


export default function Home({ route, navigation }) {
  const { display_name } = route.params;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)

    return () => {
      console.log("remove back button handle")
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
    }
  }, [])

  const handleBackButtonClick = () => {
    console.log("Back button clicked")
  }

  const logout = () => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [navigation.navigate({routeName: 'Login'})],
    //   key: null,
    // })
    // navigation.dispatch(resetAction)
    navigation.navigate("Login")
    AsyncStorage.removeItem("@access_token")
    AsyncStorage.removeItem("@passcode")
  }

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <View style={styles.headerImg}>
          <Image
            source={require('../../assets/images/ship-icon.png')}
            style={styles.iconHead}
          />
        </View>
        <Text style={styles.textHome}>Home screen.</Text>
        <Text style={styles.textWelcome}>Hello {display_name}, welcome to Demo app.</Text>

        <TouchableOpacity onPress={() => Navigation.navigate('ListContact')}>
          <Text>Go to contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress = {() => { logout() }}
        style={styles.btnLogin}>
          <Text style={styles.txtSubmit}>LOGOUT</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
