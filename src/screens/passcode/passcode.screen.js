import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './passcode.styles'
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Passcode({ navigation }) {

    const [passcode, setPasscode] = useState('')

    // useEffect(async () => {
    //     let access_token = await AsyncStorage.getItem("@access_token")
    //     console.log("Access token is " + access_token)
    // })

    const create_passcode_tapped = async () => {
        let previous_passcode = await AsyncStorage.getItem('@passcode')
        if (previous_passcode == null) {
            if (passcode == "") {
                Alert.alert('ALert', "Please type passcode.", [{ text: 'OK' }]);
            } else {
                navigation.navigate("ConfirmPasscode", {
                    passcode: passcode
                })
            }
        } else {
            if(previous_passcode == passcode){
                navigation.navigate("Home", {
                    display_name: "offline demo"
                })
            } else {
                Alert.alert('ALert', "Passcode is not right.", [{ text: 'OK' }]);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TYPE PASSCODE</Text>
            <TextInput
                label="PASSCODE"
                onChangeText={text => { setPasscode(text) }}
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
                autoCapitalize="none"
            />
            <TouchableOpacity
                onPress={() => { create_passcode_tapped() }}
                style={styles.button}>
                <Text style={styles.textButton}>OK</Text>
            </TouchableOpacity>
        </View>
    )
}
