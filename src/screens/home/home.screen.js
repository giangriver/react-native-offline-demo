import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import realm from '../../models/Database';
import styles from "./home.styles";

export default function Home({route}) {
  const {display_name} = route.params;

  // useEffect(() => {
  //   realm.write(() => {
  //     const account = realm.create('Account', {
  //       username: 'user1',
  //       password: 'password'
  //     })
  //   })
  // })

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <View style={styles.headerImg}>
          <Image source={require('../../assets/images/ship-icon.png')} style={styles.iconHead} />
        </View>
        <Text style={styles.textHome}>Home screen.</Text>
        <Text style={styles.textWelcome}>Hello {display_name}, welcome to Demo app.</Text>
      </View>
    </View>
  )
}