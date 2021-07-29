import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Ant from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import {
    Text, View, StyleSheet, Image, Animated
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { transform } from '@babel/core';

export  class TabButton1 extends Component {
    constructor(props) {
        super(props);

        this.scaleBtn = new Animated.Value(0);
        this.state = {
            toggle: true,
        }
    }

    componentDidMount() {
        Animated.timing(
            this.scaleBtn,
            {
                toValue: 1,
                useNativeDriver: false,
                // delay:2000,
                duration: 2000
            }
        ).start();
    }

    

    render() {
        return (
            <View
                style={{

                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 60,
                    height: 60,

                    backgroundColor: '#FFF',
                }} >

                <Animated.View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 55,
                        height: 55,
                        borderRadius: 30,
                        backgroundColor: '#2fbbf0',
                        position: 'absolute',
                        transform: [{ scale: this.scaleBtn }],
                    }}
                />


                <Ionic name='chatbubble-ellipses' size={35} color='grey' />

            </View>
        );
    }
}



export  class TabButton2 extends Component {
    constructor(props) {
        super(props);

        this.scaleBtn = new Animated.Value(1);
        this.state = {
            toggle: true,
        }
    }

    componentDidMount() {
        Animated.timing(
            this.scaleBtn,
            {
                toValue: 0,
                useNativeDriver: false,
                // delay:2000,
                duration: 2000
            }
        ).start();
    }

    

    render() {
        return (
            <View
                style={{

                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 60,
                    height: 60,

                    backgroundColor: '#FFF',
                }} >

                <Animated.View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 55,
                        height: 55,
                        borderRadius: 30,
                        backgroundColor: '#2fbbf0',
                        position: 'absolute',
                        transform: [{ scale: this.scaleBtn }],
                    }}
                />


                <Ionic name='chatbubble-ellipses' size={35} color='grey' />

            </View>
        );
    }
}
