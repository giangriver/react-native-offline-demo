import * as actions from './actionType';

export const loginRequest = (username, password) => {
  return {
    type: actions.LOGIN_REQUEST,
    payload: {
      username: username,
      password: password,
      loading: true,
    },
  };
};

export const loginSuccess = data => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailed = error => {
  return {
    type: actions.LOGIN_FAILED,
    payload: error,
  };
};

// get user

export const getUserLocalSuccess = data => {
  return {
    type: actions.GET_USER_LOCAL_SUCCESS,
    payload: {
      isLogged: data.isLogged,
      currentUser: data.currentUser,
    },
  };
};

export const getUserLocalFailed = () => {
  return {
    type: actions.GET_USER_LOCAL_FAILED,
  };
};

export const setUserData = data => {
  return {
    type: actions.SET_USER,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: actions.LOGOUT,
  };
};