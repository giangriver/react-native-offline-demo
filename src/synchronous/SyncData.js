import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { add_contact, update_contact } from "../constants/API"
import realm from "../repo/Realm"



export const sync_data_if_need = async () => {
    let token = await AsyncStorage.getItem("@access_token")
    console.log("Token is" + token);
    sync_all_contacts(token)

}

const sync_all_contacts = token => {
    let edit_contacts = realm.objects('Contact').filtered(`status = "edit"`)
    edit_contacts.map(item => {
        let form = new FormData()
        // form.append('file', item.photo);
        form.append('name', item.name);
        form.append('email', item.email);
        form.append('number', item.number);
        axios.put(update_contact + item._id, form, {
            headers: {
                token: `${token}`,
            },
        }).then(res => {
            console.log("Result updated of " + item.name + " is " + res.data.status);
        }).catch(err => {
            console.log(err + " haha " + item.name);
        })
    })

    let add_contacts = realm.objects('Contact').filtered(`status = "add"`)
    add_contacts.map(item => {
        let form = new FormData()
        // form.append('file', item.photo);
        form.append('name', item.name);
        form.append('email', item.email);
        form.append('number', item.number);
        axios.post(add_contact, form, {
            headers: {
                token: `${token}`
            }
        }).then(res => {
            console.log("Result added of " + item.name + " is " + res.data.status);
        }).catch(err => {
            console.log(err + " haha " + item.name);
        })
    })
}