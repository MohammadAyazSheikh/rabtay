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
                    {/* <Image source={require('../../assets/logot.png')} style={styles.logoImg} /> */}
                    <Text style={
                        {
                            fontSize: widthToDp(20),
                            color: BackGroundColor,//'#053881',
                            fontFamily: 'Pacifico-Regular',
                            textShadowOffset: {width: 1.5, height: 1},
                            textShadowRadius:1,
                            textShadowColor: 'black',
                        }
                    }>
                        Rabtay
                    </Text>
                </View>
                <View style={styles.logInView}>
                    <TouchableOpacity style={styles.btnLogIn}
                        onPress={() => {
                            this.props.navigation.navigate('LogIn');
                        }}
                    >
                        <Text style={styles.btnTxt}>
                            LogIn
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', margin: 10, fontWeight: 'bold' }}>
                        OR
                    </Text>
                    <TouchableOpacity style={styles.btnLogIn}
                        onPress={() => {
                            this.props.navigation.navigate('SignUp');
                        }}
                    >
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
        backgroundColor: BackGroundColor
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
        borderBottomLeftRadius: widthToDp(70),
        elevation:10
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
    }
});

