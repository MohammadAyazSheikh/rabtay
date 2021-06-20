
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import React, { useEffect } from 'react';
import {
    StyleSheet, View, Text, Image
} from 'react-native';


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
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#053881' }}
        >

            <Image
                style={{
                    width: widthToDp(90),
                    height: widthToDp(90)
                }}

                source={require('../../assets/logos.png')} />
        </View>


    );
};


export default Splash;



