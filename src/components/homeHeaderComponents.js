import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar,Animated } from 'react-native'
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BackGroundColor } from '../utilities/colors';
const HomeHeader = (props) => {
    return (
        <>
            {/* <StatusBar backgroundColor = '#FFF' /> */}
            <Animated.View style={[styles.header,{transform:[{translateY:props.headerTranslate}]}]}>
                <Text style={styles.txtHeading}>Rabtay</Text>
                <TouchableOpacity style={styles.imgProfView}
                    onPress={() => {
                        props.navigation.navigate('Search');
                    }}
                >
                    <AntDesign name='search1' size={40} />
                </TouchableOpacity>

            </Animated.View>
        </>
    )
}
export default HomeHeader;


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        // backgroundColor: '#F0F1F5',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
        width: widthToDp(100),
        height: heightToDp(14),
        position:'absolute'

    },
    txtHeading: {
        fontSize: 50,
        fontFamily: 'Pacifico-Regular',
        textShadowOffset: { width: 1.5, height: 1 },
        textShadowRadius: 1,
        textShadowColor: 'black',
        color:BackGroundColor,
        
    },
    imgProfView: {
        // borderColor: BackGroundColor,
        // borderWidth:2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    imgStyle: {
        width: 48,
        height: 48,
        borderRadius: 100
    },
})