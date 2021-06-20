import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity, FlatList,
    StyleSheet, Dimensions,
} from 'react-native';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';


export default class Registration extends Component {
    constructor(props) {
        super(props);
    }
    render() {


        return (
            <View style={styles.container}>

                <View style={styles.logoView}>
                    <Image source={require('../../assets/logot.png')} style={styles.logoImg} />
                </View>
                <View style={styles.logInView}>
                    <TouchableOpacity style={styles.btnLogIn}>
                        <Text style={styles.btnTxt}>
                            LogIn
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnForget}>
                        <Text style={styles.btnForgetTxt}>
                            forgot password?
                        </Text>
                    </TouchableOpacity>
                    <Text style={{color:'white', margin:10, fontWeight:'bold'}}>
                        OR
                    </Text>
                    <TouchableOpacity style={styles.btnLogIn}>
                        <Text style={styles.btnTxt}>
                            SignUp
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#2fbbf0'
    },
    logoImg: {
        width: widthToDp(70),
        height: widthToDp(70),
    },
    logoView: {
        width: '100%',
        height: '45%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: "center",
        borderBottomLeftRadius: widthToDp(100),
    },
    logInView: {
        width: '100%',
        height: '60%',
        backgroundColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLogIn: {
        backgroundColor: '#FFF',
        width: widthToDp(80),
        height: widthToDp(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: widthToDp(5),
        elevation: 1
    },
    btnTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: BackGroundColor
    },
    bottomView: {
        flexDirection: 'row'
    },
    btnForget: {
        padding: 5,
        elevation: 1
    },
    btnForgetTxt: {
        color: 'white'
    }

});

