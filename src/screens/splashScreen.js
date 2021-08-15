
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import React, { useEffect } from 'react';
import {
    StyleSheet, View, Text, Image,
} from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import * as Animatable from 'react-native-animatable';

function Splash(props) {

    useEffect(
        () => {
            setTimeout(() => {
                props.navigation.navigate('Registration');
            }, 3000)
        },
        []
    );
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BackGroundColor }}
        >
            <Animatable.View
                // animation="bounceIn"
                animation="bounce"
                delay={0}
                useNativeDriver={true}
            >
                <Text style={
                    {
                        fontSize: widthToDp(20),
                        color: '#FFF',
                        fontFamily: 'Pacifico-Regular',
                        fontFamily: 'Pacifico-Regular',
                        textShadowOffset: { width: 1.5, height: 1 },
                        textShadowRadius: 1,
                        textShadowColor: 'black',
                    }}
                >
                    Rabtay
                </Text>
            </Animatable.View>
        </View>


    );
};


export default Splash;



