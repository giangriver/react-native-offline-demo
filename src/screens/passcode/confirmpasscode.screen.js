import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './passcode.styles'
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfirmPasscode({ route, navigation }) {
    const { passcode } = route.params;
    const [confirmPasscode, setConfirmPasscode] = useState('')

    const confirm_passcode_tapped = () => {
        if (confirmPasscode == "") {
            Alert.alert('ALert', "Please type confrim passcode.", [{ text: 'OK' }]);
        } else {
            if (confirmPasscode != passcode) {
                Alert.alert('ALert', "Passcode is not the same.", [{ text: 'OK' }]);
            } else {
                AsyncStorage.setItem("@passcode", passcode)
                navigation.navigate("Home", {
                    display_name: "offline demo"
                })
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CONFIRM PASSCODE</Text>
            <TextInput
                label="PASSCODE"
                onChangeText={text => { setConfirmPasscode(text) }}
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
            <TouchableOpacity
                onPress={() => confirm_passcode_tapped()}
                style={styles.button}>
                <Text>CONFIRM</Text>
            </TouchableOpacity>
        </View>
    )
}