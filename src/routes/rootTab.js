import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Text, View, StyleSheet, TouchableOpacity, Image
} from 'react-native';

const Screen = () => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', flex: 1 }}>
            <Text>
                Screen
            </Text>
        </View>
    )
}


const CenterButton = ({ children, onPress }) => (
    <View
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#FFF',
        }} >
        <TouchableOpacity
            onPress={() => {
                alert('open camera?')
            }}
            style={{
                width: 60,
                height: 60,
                borderRadius: 35,
                backgroundColor: '#2fbbf0',
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 10
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',

            }}
        >
            {children}
        </TouchableOpacity>

        {/* <View style={
            {
                width: 40,
                height: 40,
                borderRadius: 35,
                backgroundColor: 'red',
                position:'absolute',
                top:-100
            }
        }>

        </View> */}
    </View>

)

const rootTab = createBottomTabNavigator();


export function root_Tab() {
    return (
        <rootTab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Message') {
                            iconName = 'align-center'
                        } else if (route.name === 'Profile') {
                            iconName = 'user-circle'
                            //iconName = focused ? 'at' : 'facebook';
                        }
                        else if (route.name === 'Notification') {
                            iconName = 'bell'
                        }
                        else if (route.name === 'Home') {
                            iconName = 'bell'
                        }
                        return <Icon name={iconName} size={size} color={color} />;
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
            <rootTab.Screen name="Home" component={Screen} options={{ tabBarBadge: 3 }} />
            <rootTab.Screen name="Message" component={Screen} options={{ tabBarBadge: 3 }} />
            <rootTab.Screen name="Add" component={Screen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        // <Image
                        //     source={require('../../assets/add-button.png')}
                        //     resizeMode='contain'

                        //     style={{
                        //         width: 50,
                        //         height: 50,
                        //         tintColor: '#FFF'
                        //     }}
                        // />
                        <Icon name='plus' size={30} color='#FFF' />
                    ),
                    tabBarButton: (props) => (
                        <CenterButton {...props} />
                    ),
                }}
            />
            <rootTab.Screen name="Profile" component={Screen} />
            <rootTab.Screen name="Notification" component={Screen} options={{ tabBarBadge: 6 }} />
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
    // opacity: 0.9
}