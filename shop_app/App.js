import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import ShopNavigator from './navigation/ShopNavigator'

import productsReducer from './store/reducers/products'

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <ShopNavigator />
    </Provider>
  );
}
