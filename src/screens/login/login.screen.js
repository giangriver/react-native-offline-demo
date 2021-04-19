import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import styles from './login.styles'
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Loader from "../../components/alertLoader/alertLoader";
import { responseSuccess } from "../../utils/dataResponse";
import realm from '../../models/Database';
import NetInfo from "@react-native-community/netinfo";

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const API_LOGIN = 'http://enclave.mrmai.net:8930/wp-json/jwt-auth/v1/token';

  const onLogin = () => {
    axios.post(API_LOGIN, {
      username: username,
      password: password,
    })
      .then((res) => {
        let obj = responseSuccess(res.data);
        var user = {
          token: obj.token,
          name: obj.user_display_name,
        };
        save_account_if_need({ username: user.name, password: password })
        setLoading(false)
        navigation.navigate('Home', {
          display_name: user.name
        });
        console.log('Success ', user.name);
      })
      .catch((err) => {
        let errResponse =
          (err && err.response && err.response.data.message) ||
          (err && err.message);
        console.log('Error: ', errResponse);
        Alert.alert('Error', errResponse, [{ text: 'OK' }]);
        setLoading(false)
      });
  }

  useEffect(() => {
    console.log("LOGIN SCREEN")
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
          password: account.password
        })
      }
    })

  }

  const check_network = () => {
    setLoading(true);
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if(!state.isConnected){
        onLogin()
      } else {
        offline_login({ username: username, password: password })
      }
    });
  }

  const offline_login = account => {
    let all_accounts = realm.objects("Account")
    var isHasAccount = false
    all_accounts.map((item, index) => {
      if(account.username == item.username && account.password == item.password){
         isHasAccount = true
      }
    })
    if(isHasAccount){
      navigation.navigate('Home', {
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
        console.log("item is " + item.username + " and password is " + item.password)
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