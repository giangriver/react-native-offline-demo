import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import styles from './login.styles'
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Loader from "../../components/alertLoader/alertLoader";
import { responseSuccess } from "../../utils/dataResponse";
import realm from '../../repo/Realm';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../constants/API'

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onLogin = () => {
    console.log(username, password, login);
    axios.post(login, {
      username: username,
      password: password,
    })
      .then((res) => {
        console.log(res)
        let obj = responseSuccess(res.data);
        save_account_if_need({ username: username, password: password, access_token: obj.responseData.token })
        setLoading(false)
        AsyncStorage.setItem('@access_token', obj.responseData.token)
        navigation.navigate('Passcode', {
          display_name: username
        });
        console.log('Success ', username);
      })
      .catch((err) => {
        console.log(err)
        let errResponse =
          (err && err.response && err.response.data.message) ||
          (err && err.message);
        console.log('Error: ', errResponse);
        Alert.alert('Error', errResponse, [{ text: 'OK' }]);
        setLoading(false)
      });
  }

  useEffect(async () => {
    let access_token = await AsyncStorage.getItem("@access_token")
    if (access_token != null) {
      navigation.navigate('Passcode')
    }
  })

  const save_account_if_need = account => {
    realm.write(() => {
      var isHasAccount = false
      let all_accounts = realm.objects("Account")
      all_accounts.map((item, index) => {
        if (item.username == account.username) {
          if (item.password != account.password) {
            item.password = account.password
          }
          isHasAccount = true
        }
      })
      if (isHasAccount == false) {
        realm.create('Account', {
          username: account.username,
          password: account.password,
          access_token: account.access_token,
        })
      }
    })

  }

  const check_network = () => {
    setLoading(true);
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        onLogin()
      } else {
        offline_login({ username: username, password: password })
      }
    })
  }

  const offline_login = account => {
    let all_accounts = realm.objects("Account")
    var isHasAccount = false
    all_accounts.map((item, index) => {
      if (account.username == item.username && account.password == item.password) {
        AsyncStorage.setItem("@access_token", item.access_token)
        isHasAccount = true
      }
    })
    if (isHasAccount) {
      navigation.navigate('Passcode', {
        display_name: username
      });
    } else {
      Alert.alert('Alert', "Cannot login", [{ text: 'OK' }]);
    }
    setLoading(false)
  }

  const test_realm = () => {
    console.log("test realm")
    let all_items = realm.objects('Account')
    if (all_items.length == 0) {
      console.log("No have account")
    } else {
      for (let i = 0; i < all_items.length; i++) {
        let item = all_items[i]
        console.log("item is " + item.username + " and password is " + item.password + " token is " + item.access_token)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ backgroundColor: '#fff', flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Loader loading={loading} />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerImg}>
              <Image source={require('../../assets/images/ship-icon.png')} style={styles.iconHead} />
            </View>
            <Text style={styles.txtWelcome}>Welcome to Demo App</Text>
            <Text style={styles.txtLogin}>Login</Text>
            <Text style={styles.txtSignIn}>Please sign in to continue.</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.formLogin}>
              <TextInput
                label="Username"
                onChangeText={text => { setUsername(text) }}
                mode="outlined"
                style={[styles.inputText, { textTransform: 'lowercase' }]}
                autoCapitalize="none"
                returnKeyType="next"
                theme={{
                  colors: {
                    primary: '#00b3b3',
                    underlineColor: 'transparent',
                  },
                }}
                dense={true}
                autoCapitalize="none"
              />
              <TextInput
                label="Password"
                onChangeText={text => { setPassword(text) }}
                mode="outlined"
                style={[styles.inputText, { textTransform: 'lowercase' }]}
                autoCapitalize="none"
                returnKeyType="next"
                secureTextEntry={true}
                theme={{
                  colors: {
                    primary: '#00b3b3',
                    underlineColor: 'transparent',
                  },
                }}
                dense={true}
              />
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={() => check_network()}>
              <Text style={styles.txtSubmit}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <TouchableOpacity
                onPress={() => {
                  test_realm()
                }}>
                <Text style={{ color: '#686868' }}>
                  Don't have an account?{' '}
                  <Text style={{ color: '#00b3b3', fontWeight: '700' }}>
                    Sign Up Now
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}