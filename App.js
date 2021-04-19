import React from 'react';
import {LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware } from 'redux';
import { useSelector } from 'react-redux';
import createSagaMiddleWare from 'redux-saga';
import { Provider } from 'react-redux';
import rootSaga from "./src/store/rootSaga";
import rootReducer from "./src/store/rootReducer";
import { navigationRef } from "./src/navigation/rootNavigation";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {connect} from 'react-redux';
import Login from './src/screens/login/login.screen';
import Home from "./src/screens/home/home.screen";

const Stack = createStackNavigator();

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
const persistor = persistStore(store);
sagaMiddleWare.run(rootSaga);

const Auth = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const Main = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Auth />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};