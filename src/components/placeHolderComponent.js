import React, { Component, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { BackGroundColor } from '../utilities/colors';
import { widthToDp, hieghtToDp, heightToDp } from '../utilities/responsiveUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

function PlaceHolder({opacity}) {

    const boxAnim = useRef(new Animated.Value(1)).current;

    const startAnim = () => {

        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    boxAnim,
                    {
                        toValue: opacity,
                        duration: 700,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    boxAnim,
                    {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: true
                    }
                )
            ])
        ).start();
    }
    useEffect(() => {
        startAnim();
    }, [])
    return (
        <Animated.View style={[styles.box, { opacity: boxAnim }]}>
            <View style={styles.Circle} />
            <View style={styles.lineView}>
                <View style={[styles.line, { width: '70%' }]} />
                <View style={[styles.line, { width: '95%' }]} />
                <View style={[styles.line, { width: '55%' }]} />
            </View>
        </Animated.View>
    );

}

export default PlaceHolder;

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        elevation: 10,
        height: heightToDp(15),
        width: widthToDp(95),
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    Circle: {
        width: widthToDp(26),
        height: widthToDp(26),
        borderRadius: widthToDp(20),
        backgroundColor: 'lightgrey'
    },
    lineView: {
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        paddingLeft: 10,
        justifyContent: 'space-evenly',
    },
    line: {
        backgroundColor: 'lightgrey',
        width: '90%',
        height: '15%',
        borderRadius: 2
    }

})