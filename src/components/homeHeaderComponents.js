import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { BackGroundColor } from '../utilities/colors';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';

const HomeHeader = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.txtHeading}>Rabtay</Text>
            <TouchableOpacity style={styles.imgProfView}>
                {
                    props.user.dpUrl ?
                        <Image
                            source={{ uri: props.user.dpUrl }}
                            style={styles.imgStyle}
                        />

                        :
                        <Image
                            source={require('../../assets/profile.jpg')}
                            style={styles.imgStyle}
                        />
                }
            </TouchableOpacity>

        </View>
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

    },
    txtHeading: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    imgProfView: {
        backgroundColor: BackGroundColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: 48,
        height: 48,
        borderRadius: 100
    },
})