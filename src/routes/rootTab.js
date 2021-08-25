import React, { useState, Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material2 from 'react-native-vector-icons/MaterialIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import {
    Text, View, StyleSheet, Image, Animated
} from 'react-native';

import CenterButton from '../components/tabCenterButton';
import Profile from '../screens/profileScreen';
import Home from '../screens/homeScreen';
import UserScreen from '../screens/userScreen';
import Notification from '../screens/notificationScreen';



const Screen = () => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', flex: 1 }}>
            <Text>
                Screen
            </Text>
        </View>
    )
}





const rootTab = createBottomTabNavigator();


export function root_Tab() {
    return (

        <rootTab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {


                        if (route.name === 'Message') {
                            let size_ = 40;
                            focused ? size_ = 35 : size_ = 30;
                            return <Ionic name='chatbubble-ellipses' size={size_} color={color} />;

                        } else if (route.name === 'Profile') {
                            let size_ = 30;
                            focused ? size_ = 35 : size_ = 30;
                            return <Icon name='user' size={size_} color={color} />;
                        }
                        else if (route.name === 'Notification') {
                            let size_ = 30;
                            focused ? size_ = 35 : size_ = 30;
                            return <Material2 name='notifications-on' size={size_} color={color} />;
                        }
                        else if (route.name === 'Home') {
                            let size_ = 30;
                            focused ? size_ = 35 : size_ = 30;
                            return <Ionic name='home' size={size_} color={color} />;
                        }

                    },
                })
            }

            tabBarOptions={{
                activeTintColor: '#2fbbf0',
                inactiveTintColor: '#7A8FA6',
                showLabel: false,
                showIcon: true,
                // labelStyle: {
                //   fontSize: 15,
                // },
                style: {
                    ...styles
                }
            }}
        >
            <rootTab.Screen name="Home" component={Home} />
            <rootTab.Screen name="Message" component={Screen} options={{ tabBarBadge: 3 }} />
            <rootTab.Screen name="Add" component={Screen}
                options={{

                    tabBarButton: (props) => (
                        <CenterButton {...props} />
                    ),
                }}
            />
            <rootTab.Screen name="Profile" component={Profile} />
            <rootTab.Screen name="Notification" component={Notification} />
        </rootTab.Navigator>


    );
}


const styles = {

    backgroundColor: '#FFF',
    position: 'absolute',
    borderRadius: 20,
    bottom: 10,
    right: 20,
    left: 20,
    height: 80,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    opacity: 0.96
}