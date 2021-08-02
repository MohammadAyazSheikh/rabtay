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


// App.js

// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';
// // require('./assets/profile.jpg')

// export default class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       resourcePath: {},
//       uri: null
//     };

//   }

//   selectFile = () => {
//     var options = {
//       title: 'Select Image',
//       customButtons: [
//         {
//           name: 'customOptionKey',
//           title: 'Choose file from Custom Option'
//         },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',

//       },
//     };

//     ImagePicker.launchImageLibrary(options, res => {
//       console.log('Response = ', res);

//       if (res.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (res.error) {
//         console.log('ImagePicker Error: ', res.error);
//       } else if (res.customButton) {
//         console.log('User tapped custom button: ', res.customButton);
//         alert(res.customButton);
//       } else {
//         let source = res;
//         this.setState({
//           resourcePath: source,
//         });

//         this.setState({ uri: this.state.resourcePath.assets[0].uri })
//         // alert(JSON.stringify(this.state.resourcePath.assets[0].uri))
//         alert(this.state.uri)
//       }
//     });
//   };

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({ selectFile: '' })
//       console.log('fired')
//     }, 500);
//   }
//   render() {

//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           {/* <Image
//             source={{
//               uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
//             }}
//             style={{ width: 100, height: 100 }}
//           /> */}
//           <Text>{"Uri: " + this.state.uri} </Text>
//           {
//             this.state.uri ? <Image
//               source={{
//                 uri: this.state.uri,
//               }}
//               style={{ width: 100, height: 100 }}
//             />
//               :
//               <Text>failed </Text>
//           }

//           <Text style={{ alignItems: 'center' }}>
//             {this.state.resourcePath.uri}
//           </Text>

//           <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
//             <Text style={styles.buttonText}>Select File</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff'
//   },
//   button: {
//     width: 250,
//     height: 60,
//     backgroundColor: '#3740ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 4,
//     marginBottom: 12
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontSize: 15,
//     color: '#fff'
//   }
// });