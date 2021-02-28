import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import React, { useState } from 'react';

import MealsNavigator from './navigation/MealsNavigation';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)} />
    )
  }

  return (
    <>
      <MealsNavigator />
      <StatusBar style="auto" />
    </>
  );
}
