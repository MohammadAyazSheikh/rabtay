/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import { widthToDp, heightToDp } from './src/utilities/responsiveUtils';
import Splash from './src/screens/splashScreen';

function App() {

  return (
    <Splash />
  );
};


export default App;



