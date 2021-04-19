import axios from 'axios';
import Storage from '@react-native-async-storage/async-storage';
import { responseSuccess } from "../utils/dataResponse";

const API_LOGIN = 'http://enclave.mrmai.net:8930/wp-json/jwt-auth/v1/token';

export const loginService = req => {
  console.log('do service');
  return new Promise((resolve, reject) => {
    axios
      .post(
        API_LOGIN,
        {
          username: req.username,
          password: req.password,
        },
        {
          headers: {
            'Content-type': 'Application/json',
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('success');
        let obj = responseSuccess(res.data);
        var user = {
          token: obj.token,
          name: obj.user_display_name
        };
        resolve(user);
      })
      .catch(err => {
        if (err.response && err.response.status && err.response.status == 403) {
          reject('Incorrect username or password!');
        } else {
          reject('Something went wrong');
        }
      });
  });
};

export const getUserLocal = () => {
  return new Promise((resolve, reject) => {
    Storage.getItem('currentUser')
      .then(value => {
        if (value) {
          resolve({
            isLogged: true,
            currentUser: JSON.parse(value),
          });
        } else {
          resolve({
            isLogged: false,
            currentUser: null,
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const saveUser = req => {
  return new Promise((resolve, reject) => {
    Storage.setItem('currentUser', JSON.stringify(req))
      .then(res => {
        resolve(req);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const clearStorage = () => {
  return new Promise((resolve, reject) => {
    Storage.clear()
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};