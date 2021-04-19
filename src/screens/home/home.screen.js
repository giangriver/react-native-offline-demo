import React, { useState } from 'react'
import { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from "./home.styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({route, navigation}) {
  // const {display_name} = route.params;
  const [token, setToken] = useState('')

  useEffect(() => {
    getToken()
    console.log('token: ', token);
  })

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
        setToken(value);
      }
    } catch(e) {
      // error reading value
    }
  }

  const onLogOut = () => {
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <View style={styles.headerImg}>
          <Image source={require('../../assets/images/ship-icon.png')} style={styles.iconHead} />
        </View>
        <Text style={styles.textHome}>Home screen.</Text>
        {/* <Text style={styles.textWelcome}>Hello {display_name}, welcome to Demo app.</Text> */}
        <TouchableOpacity style={{marginTop: 50}} onPress={() => onLogOut()}>
          <Text style={styles.textLogout}>Log out.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}