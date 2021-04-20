import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './home.styles';
import * as Navigation from '../../navigation/Navigation';

export default function Home({route}) {
  const {display_name} = route.params;
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
        <Text style={styles.textWelcome}>
          Hello {display_name}, welcome to Demo app.
        </Text>
        <TouchableOpacity onPress={() => Navigation.navigate('ListContact')}>
          <Text>Go to contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
