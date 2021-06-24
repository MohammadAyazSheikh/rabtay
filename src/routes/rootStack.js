import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/splashScreen';
import Registration from '../screens/registrationScreen';
import LogIn  from '../screens/loginScreen';
const rootStack = createStackNavigator();



export default function RootStack() {
    return (
        <NavigationContainer>
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
               
               
                {/* <rootStack.Screen name="Home" component={Home}
                    options={{
                        title: 'Getting Start',
                        headerTitleStyle: {
                            alignSelf: 'center',
                        },
                    }} /> */}

            </rootStack.Navigator>
        </NavigationContainer>
    );
}

