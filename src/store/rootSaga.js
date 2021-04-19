import {all, fork, select, takeEvery} from 'redux-saga/effects';
import {checkUserLogged, authSaga} from '../sagas/auth';

export default function* rootSaga() {
  yield all([
    fork(checkUserLogged),
    authSaga(),
    /**
     * Logger: watch all actions dispatched to the store and logs them
     * '*': all action types, tracker
     */
    takeEvery('*', function* logger(action) {
      const state = yield select();
      console.log('Root Saga: action: ', action);
      console.log('Root Saga: state: ', state);
    }),
  ]);
}
