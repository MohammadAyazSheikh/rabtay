import React, { useState, Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
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

    animateBtn = (x_, y_, stiff,scale_) => {
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
                        width: 50,
                        height: 50,
                        borderRadius: 35,
                        backgroundColor: '#2fbbf0',
                        position: 'absolute',
                        bottom: this.btn1Val.x,
                        right: this.btn1Val.y,
                        transform: [{ scale: this.scaleBtn }],
                    }
                }>
                </Animated.View>
                <Animated.View style={
                    {
                        width: 50,
                        height: 50,
                        borderRadius: 35,
                        backgroundColor: '#2fbbf0',
                        position: 'absolute',
                        bottom: this.btn2Val.x,
                        left: this.btn2Val.y,
                        transform: [{ scale: this.scaleBtn }],
                    }
                }>
                </Animated.View>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ showBtn: !this.state.showBtn });
                        if (this.state.showBtn)
                            this.animateBtn(80, 80, 95,1);
                        else
                            this.animateBtn(5, 10, 95,0);
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