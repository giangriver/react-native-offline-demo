import * as React from 'react';
import {StackActions} from '@react-navigation/native';
import {BackHandler, Keyboard} from 'react-native';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  if (navigationRef.current.canGoBack()) {
    navigationRef.current?.goBack();
    Keyboard.dismiss();
  } else BackHandler.exitApp();
}
/**
 * The state object specified in reset replaces
 * the existing navigation state with the new one,
 */
export function reset(name) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}

export function replace(name) {
  navigationRef.current?.dispatch(StackActions.replace(name));
}
