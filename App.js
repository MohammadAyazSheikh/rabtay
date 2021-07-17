/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RootStack from './src/routes/rootStack';
import { configureStore } from './src/redux/configStore';
import { Provider } from 'react-redux';
const store = configureStore();


function App() {

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};


export default App;





