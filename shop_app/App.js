import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

import React, { useState } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

//import { composeWithDevTools } from 'redux-devtools-extension'

import ShopNavigator from './navigation/ShopNavigator'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

const store = createStore(rootReducer/*, composeWithDevTools()*/, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.error(err)}
    />
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <ShopNavigator />
    </Provider>
  );
}
