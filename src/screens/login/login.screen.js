import React, { useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import {connect} from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login.styles'
import { loginRequest } from "../../actions/auth";
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from "../../components/alertLoader/alertLoader";

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const authRe = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const dispatchRequest = (username, password) => dispatch(loginRequest(username, password));


  const onLogin = () => {
    dispatchRequest(username, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ backgroundColor: '#fff', flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Loader loading={authRe.loading} />
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
                onChangeText={text => {setUsername(text)}}
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
                onChangeText={text => {setPassword(text)}}
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
            <TouchableOpacity style={styles.btnLogin} onPress={() => onLogin()}>
              <Text style={styles.txtSubmit}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <TouchableOpacity
                onPress={() => { }}>
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