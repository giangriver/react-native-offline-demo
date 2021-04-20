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
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Navigation from '../../../navigation/Navigation';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

export default function Add(props) {
  const [contact, setContact] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let params = props.route.params;
    if (params != undefined && params != null) {
      let contact = params.contact;
      setContact(contact);
      console.log('Contact: ', params.contact);
      if (contact.avatar) setAvatarUri(contact.avatar);
      if (contact.name) setName(contact.name);
      if (contact.phone) setPhone(contact.phone);
      if (contact.email) setEmail(contact.email);
    }
  }, []);

  const selectAvatar = () => {
    setModalVisible(true);
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
    }).then(image => {
      let item = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };
      setAvatar(item);
      setAvatarUri(image.uri);
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
      return <Image source={{uri: avatarUri}} style={styles.avatar} />;
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
              ToastAndroid.showWithGravity(
                contact ? 'Edit Contact' : 'Save Contact',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}
          />
        </View>
        <View style={styles.body}>
          <TouchableOpacity onPress={selectAvatar}>
            {renderAvatar()}
          </TouchableOpacity>
          <TextInput placeholder="Name" style={styles.input} value={name} />
          <TextInput placeholder="Phone" style={styles.input} value={phone} />
          <TextInput placeholder="Email" style={styles.input} value={email} />
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
