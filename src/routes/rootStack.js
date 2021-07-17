import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/splashScreen';
import Registration from '../screens/registrationScreen';
import LogIn from '../screens/loginScreen';
import Signup from '../screens/signupScreen';
import { root_Tab } from './rootTab';
import { connect } from 'react-redux';
import {
    Text, View
} from 'react-native';
const rootStack = createStackNavigator();

const Home = () => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>
                Home
            </Text>
        </View>
    )
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}


function RootStack(props) {
    return (
        <NavigationContainer>
            {
                props.user.user ?
                    (
                        <rootStack.Navigator initialRouteName="Home"
                            screenOptions={{
                                style: {
                                    textAlign: 'center'
                                },
                                headerStyle: {
                                    backgroundColor: '#A4A7A0',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    alignSelf: 'center',
                                    marginRight: 50
                                },
                            }}
                        >
                            <rootStack.Screen name="Home" component={root_Tab}
                                options={{
                                    headerShown: false
                                }}
                            />
                        </rootStack.Navigator>
                    )
                    :
                    (
                        <rootStack.Navigator initialRouteName="Splash"
                            screenOptions={{
                                style: {
                                    textAlign: 'center'
                                },
                                headerStyle: {
                                    backgroundColor: '#A4A7A0',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    alignSelf: 'center',
                                    marginRight: 50
                                },
                            }}
                        >
                            <rootStack.Screen name="Splash" component={Splash}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <rootStack.Screen name="Registration" component={Registration}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <rootStack.Screen name="LogIn" component={LogIn}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <rootStack.Screen name="SignUp" component={Signup}
                                options={{
                                    headerShown: false
                                }}
                            />

                            {/* <rootStack.Screen name="Home" component={Home}
                            options={{
                                title: 'Getting Start',
                                headerTitleStyle: {
                                    alignSelf: 'center',
                                },
                            }} /> */}

                        </rootStack.Navigator>
                    )
            }

        </NavigationContainer>
    );
}

export default connect(mapStateToProps, null)(RootStack)

