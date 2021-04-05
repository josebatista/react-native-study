import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import { init } from './helpers/db'

import PlacesReducer from './store/places-reducer'

import PlacesNavigator from './navigation/PlacesNavigator'

init()
  .then(() => {
    console.log('Initialized database')
  })
  .catch((err) => {
    console.log('Initializing db falied')
    console.error(err)
  })

const rootReducer = combineReducers({
  places: PlacesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
