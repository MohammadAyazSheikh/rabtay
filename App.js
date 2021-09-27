/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import RootStack from './src/routes/rootStack';
import { configureStore } from './src/redux/configStore';
import Test from './src/screens/test';
import { Provider } from 'react-redux';
const store = configureStore();


function App() {

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
    // <View style={{ backgroundColor: 'grey', flex: 1 }}>
    //  {/* <Donut/> */}
    //  <Test/>
    // </View>

  );
};


export default App;





