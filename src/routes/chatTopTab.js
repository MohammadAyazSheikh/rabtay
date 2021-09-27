import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Message from '../screens/messageScreen';
import { BackGroundColor } from '../utilities/colors';
import { widthToDp } from '../utilities/responsiveUtils';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createMaterialTopTabNavigator();

export default function ChatTab() {
    return (
        <Tab.Navigator
            initialRouteName="Messages"
            screenOptions={{
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: {
                    fontSize: widthToDp(4),
                    fontWeight: 'bold',
                },
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    top: 10,
                    borderRadius: 15,
                    width:'90%',
                    alignSelf:'center',
                    paddingVertical:3
                },

                tabBarIndicatorStyle: {
                    backgroundColor: BackGroundColor,
                    height: '100%',
                    width:'50%',
                    borderRadius:10 
                },

                // tabBarIcon:() => <Icon name = 'bell' size = {15}/>
            }}
        >
            <Tab.Screen
                name="Messages"
                component={Message}
                options={{ tabBarLabel: 'Messages' }}
            />
            <Tab.Screen
                name="Friends"
                component={Message}
                options={{ tabBarLabel: 'Friends' }}
            />
        </Tab.Navigator>
    );
}





