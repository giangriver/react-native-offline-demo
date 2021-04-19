import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import Storage from '@react-native-async-storage/async-storage';
import authReducer from '../reducers/auth';

const rootReducer = combineReducers({
  authReducer,
});

const rootPersistConfig = {
  key: 'root',
  storage: Storage,
  whitelist: ['authReducer'],
};

export default persistReducer(rootPersistConfig, rootReducer);
