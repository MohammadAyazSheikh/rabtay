import React, { Component, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { widthToDp, hieghtToDp, heightToDp } from '../utilities/responsiveUtils';


function PlaceHolder({ opacity }) {

    const boxAnim = useRef(new Animated.Value(1)).current;

    const startAnim = () => {

        return Animated.loop(
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

        return boxAnim.removeAllListeners();
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