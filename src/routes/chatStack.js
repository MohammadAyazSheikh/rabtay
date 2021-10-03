import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '../screens/chatScreen';
import Message from '../screens/messageScreen';

const stack = createStackNavigator();






function ChatStack(props) {
    return (

        <stack.Navigator initialRouteName="AllMessages"
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
            <stack.Screen name="AllMessages" component={Message}
                options={{
                    headerShown: false
                }}
            />
            <stack.Screen name="Chat" component={Chat}
                options={{
                    headerShown: false
                }}
            />
        </stack.Navigator>


    );
}

export default ChatStack;

