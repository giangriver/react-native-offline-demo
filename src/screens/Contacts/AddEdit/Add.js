import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  PermissionsAndroid,
  Alert,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Navigation from '../../../navigation/Navigation';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {add_contact, update_contact} from '../../../constants/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {responseSuccess, responseFailed} from '../../../utils/dataResponse';
import Loader from '../../../components/alertLoader/alertLoader';
import RNFetchBlob from 'rn-fetch-blob';

export default function Add(props) {
  const [isLoading, setLoading] = useState(false);
  const [contact, setContact] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailTemp, setEmailTemp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);

  const getToken = async () => {
    let access_token = await AsyncStorage.getItem('@access_token');
    setToken(access_token);
  };

  useEffect(() => {
    let params = props.route.params;
    getToken();
    if (params != undefined && params != null) {
      let contact = params.contact;
      setContact(contact);
      console.log('Contact: ', params.contact);
      if (contact.photo) setAvatarUri(contact.photo);
      if (contact.name) setName(contact.name);
      if (contact.number) setPhone(contact.number);
      if (contact.email) setEmail(contact.email);
      if (contact.email) setEmailTemp(contact.email);
    }
  }, []);

  const selectAvatar = () => {
    setModalVisible(true);
  };

  const addContact = () => {
    setLoading(true);
    let form = new FormData();
    if (avatar) form.append('file', avatar);
    form.append('name', name);
    form.append('email', email);
    form.append('number', phone);
    console.log('Request body: ', form);
    axios
      .post(add_contact, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `${token}`,
        },
      })
      .then(res => {
        console.log(res);
        setLoading(false);
        Navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        let error =
          (err && err.response && err.response.data) || (err && err.message);
        console.log(err.response);
        Alert.alert('Error', error.message, [{text: 'OK'}]);
      });
  };

  const updateContact = () => {
    setLoading(true);
    let form = new FormData();
    if (avatar) form.append('file', avatar);
    form.append('name', name);
    if (email.trim() != emailTemp.trim()) form.append('email', email);
    form.append('number', phone);
    console.log('Request body: ', form);
    axios
      .put(update_contact + contact._id, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `${token}`,
        },
      })
      .then(res => {
        console.log(res);
        setLoading(false);
        Navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        let error =
          (err && err.response && err.response.data) || (err && err.message);
        console.log(err.response);
        Alert.alert('Error', error.message, [{text: 'OK'}]);
      });
  };

  /**
   * Function choice image from library
   */
  const openImageLibrary = () => {
    if (Platform.OS === 'android') setModalVisible(false);
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 0.5,
      includeBase64: true,
    }).then(image => {
      let item = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
        base64: image.data,
      };
      console.log('Image picker:', image);
      setAvatar(item);
      setAvatarUri(image.path);
    });
  };

  /**
   * Open camera, take an image
   */
  const launchCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 0.5,
    }).then(image => {
      let item = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };
      setAvatar(item);
      setAvatarUri(image.path);
    });
  };

  /**
   * Check device and permission to access camera
   */
  const takeAnImage = async () => {
    if (Platform.OS === 'android') setModalVisible(false);
    try {
      if (Platform.OS !== 'ios') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'Contacts needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          launchCamera();
        } else {
          console.log('Camera permission denied');
          Alert.alert(
            'Notification',
            'Camera permission denied. Please check system settings.',
            [{text: 'OK'}],
          );
        }
      } else {
        launchCamera();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderAvatar = () => {
    if (avatarUri != null) {
      return (
        <ImageBackground
          style={styles.avatar}
          source={require('../../../assets/images/avatar_default.png')}>
          <Image source={{uri: avatarUri}} style={styles.avatar} />
        </ImageBackground>
      );
    } else {
      return (
        <Image
          source={require('../../../assets/images/avatar_default.png')}
          style={styles.avatar}
        />
      );
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <Loader loading={isLoading} />
        <View style={styles.toolbar}>
          <Icon
            name="close"
            size={40}
            color="#515151"
            onPress={() => Navigation.goBack()}
          />
          <Text style={styles.title}>
            {contact ? 'Edit Contact' : 'Save Contact'}
          </Text>
          <Icon
            name="check"
            size={40}
            color="#515151"
            onPress={() => {
              contact ? updateContact() : addContact();
            }}
          />
        </View>
        <View style={styles.body}>
          <TouchableOpacity onPress={selectAvatar}>
            {renderAvatar()}
          </TouchableOpacity>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={value => {
              setName(value);
            }}
          />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={phone}
            onChangeText={value => {
              setPhone(value);
            }}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={value => {
              setEmail(value);
            }}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}>
          <Modal
            isVisible={modalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            useNativeDriver={true}
            onBackdropPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalBody}>
                <TouchableOpacity
                  style={styles.buttonOption}
                  onPress={() => {
                    openImageLibrary();
                  }}>
                  <Text>Select image from library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonOption}
                  onPress={() => takeAnImage()}>
                  <Text>Take an image</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
