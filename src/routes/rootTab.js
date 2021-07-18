import React, { useState, Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Material2 from 'react-native-vector-icons/MaterialIcons';
import Ant from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import {
    Text, View, StyleSheet, TouchableOpacity, Image, Animated
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


class CenterButton extends Component {
    constructor(props) {
        super(props);
        this.btn1Val = new Animated.ValueXY({ x: 5, y: 10 });
        this.btn2Val = new Animated.ValueXY({ x: 5, y: 10 });
        this.scaleBtn = new Animated.Value(1);
        this.state = {
            showBtn: true,
        }
    }

    animateBtn = (x_, y_, stiff, scale_) => {
        Animated.parallel([
            Animated.spring(
                this.btn1Val,
                {
                    toValue: { x: x_, y: y_ },
                    useNativeDriver: false,
                    stiffness: stiff
                }
            ),
            Animated.spring(
                this.btn2Val,
                {
                    toValue: { x: x_, y: y_ },
                    useNativeDriver: false,
                    stiffness: stiff
                }
            ),
            Animated.timing(
                this.scaleBtn,
                {
                    toValue: scale_,
                    useNativeDriver: false,

                }
            ),
        ]).start();
    }

    render() {
        const { children, onPress } = this.props
        return (
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
                <Animated.View style={
                    {
                        width: 55,
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 35,
                        backgroundColor: '#FFF',
                        position: 'absolute',
                        bottom: this.btn1Val.x,
                        right: this.btn1Val.y,
                        transform: [{ scale: this.scaleBtn }],
                    }
                }>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: '#2fbbf0'
                            
                        }}>
                        <Material name='camera-iris' size={30} color='#FFF' />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={
                    {
                        width: 55,
                        height: 55,
                        borderRadius: 35,
                        backgroundColor: '#FFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: this.btn2Val.x,
                        left: this.btn2Val.y,
                        transform: [{ scale: this.scaleBtn }],
                    }
                }>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: '#2fbbf0'
                        }}>
                        <Ant name='picture' size={30} color='#FFF' />
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity
                    onPress={

                        () => {
                            this.setState({ showBtn: !this.state.showBtn });
                            if (this.state.showBtn)
                                this.animateBtn(75, 75, 95, 1);
                            else
                                this.animateBtn(5, 10, 95, 0);
                        }
                    }
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
                    {/* {children} */}
                    <Icon name='plus' size={30} color='#FFF' />
                </TouchableOpacity>
            </View>
        );
    }
}



const rootTab = createBottomTabNavigator();


export function root_Tab() {
    return (
        <rootTab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {


                        if (route.name === 'Message') {
                            let size_ = 30;
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
            <rootTab.Screen name="Home" component={Screen} />
            <rootTab.Screen name="Message" component={Screen} options={{ tabBarBadge: 3 }} />
            <rootTab.Screen name="Add" component={Screen}
                options={{

                    tabBarButton: (props) => (
                        <CenterButton {...props} />
                    ),
                }}
            />
            <rootTab.Screen name="Profile" component={Screen} />
            <rootTab.Screen name="Notification" component={Screen} />
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