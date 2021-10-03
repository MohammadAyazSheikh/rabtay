import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Message from '../screens/messageScreen';
import Friends from '../screens/friendScreen';
import { BackGroundColor } from '../utilities/colors';
import { heightToDp, widthToDp } from '../utilities/responsiveUtils';
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
                    width: '90%',
                    alignSelf: 'center',
                    paddingVertical: 3,
                    position:'absolute' // to hide background view
                },
                tabBarPressColor: 'skyblue',
                tabBarIndicatorStyle: {
                    backgroundColor: BackGroundColor,
                    height: '100%',
                    width: '50%',
                    borderRadius: 10
                },
            //  tabBarItemStyle:{backgroundColor:'red'}
        
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
                component={Friends}
                options={{ tabBarLabel: 'Friends' }}
            />
            
        </Tab.Navigator>
    );
}





