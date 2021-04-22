import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Contacts from './data';
import {SwipeListView} from 'react-native-swipe-list-view';
import * as Navigation from '../../../navigation/Navigation';
import {list_contact} from '../../../constants/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {responseSuccess, responseFailed} from '../../../utils/dataResponse';

export default function List() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const onGetList = token => {
    setLoading(true);
    console.log('Token: ', token);
    axios
      .get(list_contact, {
        headers: {
          token: `${token}`,
        },
      })
      .then(res => {
        let data = res.data.responseData.contacts;
        console.log(data);
        handleData(data);
      })
      .catch(err => {
        console.log(err);
        let errResponse = responseFailed(err);
        console.log('Error: ', errResponse);
        Alert.alert('Error', errResponse, [{text: 'OK'}]);
      });
  };

  useEffect(async () => {
    let access_token = await AsyncStorage.getItem('@access_token');
    if (access_token != null) {
      onGetList(access_token);
    }
  }, []);

  const handleData = value => {
    // sort name alphabetically
    let data = value.sort((a, b) => {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    data = data.reduce((r, e) => {
      // get first letter of name of current element
      let group = e.name[0].toUpperCase();
      // if there is no property in accumulator with this letter create it
      if (!r[group]) r[group] = {group, contacts: [e]};
      // if there is push current element to children array for that letter
      else r[group].contacts.push(e);
      // return accumulator
      return r;
    }, {});
    // since data at this point is an object, to get array of values
    // we use Object.values method
    let result = Object.values(data);

    console.log('Group data: ', result);

    setLoading(false);
    setContacts(result);
  };

  const editContact = contact => {
    Navigation.navigate('AddContact', {contact: contact});
  };

  const renderItemGroupAlphabet = item => {
    return (
      <View style={{marginVertical: 10}}>
        <Text style={styles.groupName}>{item.group}</Text>
        <SwipeListView
          useFlatList={true}
          disableRightSwipe
          disableLeftSwipe
          data={item.contacts}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => {
            return item._id.toString();
          }}
          renderItem={(data, rowMap) => {
            return (
              <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={() => editContact(data.item)}>
                <View style={styles.itemContact}>
                  {data.item.photo ? (
                    <ImageBackground
                      style={styles.avatar}
                      source={require('../../../assets/images/avatar_default.png')}>
                      <Image
                        source={{uri: data.item.photo}}
                        style={styles.avatar}
                      />
                    </ImageBackground>
                  ) : (
                    <Image
                      style={styles.avatar}
                      source={require('../../../assets/images/avatar_default.png')}
                    />
                  )}
                  <Text style={styles.contactName}>{data.item.name}</Text>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => Navigation.navigate('AddContact')}>
          <Icon name="account-plus-outline" size={32} color="#404142" />
          <Text style={{paddingHorizontal: 8, fontSize: 20}}>New Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.myContactBtn}>
          <Text style={styles.myContactText}>MY CONTACTS</Text>
          <Icon name="chevron-down" size={24} color="#8E9195" />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            color="#000"
          />
        ) : (
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={contacts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => renderItemGroupAlphabet(item)}
          />
        )}
      </View>
    </View>
  );
}
