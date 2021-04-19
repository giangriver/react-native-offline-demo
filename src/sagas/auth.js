import {call, takeLatest, put} from 'redux-saga/effects';
import {
  loginService,
  saveUser,
  clearStorage,
  getUserLocal
} from '../services/auth';
import * as actionType from '../actions/actionType';
import * as actions from '../actions/auth';
import * as RootNavigation from '../navigation/rootNavigation';

export function* login(action) {
  console.log('do login');
  try {
    const res = yield call(loginService, action.payload);
    const saveRes = yield call(saveUser, res);
    yield put(actions.loginSuccess(saveRes));
    yield put(actions.setUserData(saveRes));
    yield RootNavigation.replace('Home');
  } catch (error) {
    console.log('LOGIN ERROR: ', error);
    yield put(actions.loginFailed(error));
  }
}

export function* logout() {
  try {
    yield call(clearStorage);
    yield RootNavigation.replace('Login');
  } catch (error) {
    console.log('LOGOUT ERROR: ', error);
  }
}

export function* checkUserLogged() {
  console.log('check logged');
  try {
    const res = yield call(getUserLocal);
    console.log("res", res);
    yield put(actions.getUserLocalSuccess(res));
  } catch (error) {
    console.log("err", error);
    yield put(actions.getUserLocalFailed);
  }
}

export function* setUserData(payload) {
  try {
    const res = yield call(saveUser, payload);
    yield put(actions.setUserData(res));
    yield RootNavigation.replace('Home');
  } catch (error) {
    yield Error(error);
  }
}

export function* authSaga() {
  yield takeLatest(actionType.LOGIN_REQUEST, login);
  yield takeLatest(actionType.SET_USER, setUserData);
  // yield takeLatest(actionType.LOGOUT, logout);
}
