import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity, FlatList,
    StyleSheet, Dimensions, TextInput
} from 'react-native';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import LoginIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';


export default class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPass: true
        }
    }
    render() {


        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source={require('../../assets/logot.png')} style={styles.logoImg} />
                </View>
                <View style={styles.bottomView}>
                    <View style={{ ...styles.inputView, marginBottom: 20 }}>
                        <LoginIcon name="mail" style={styles.iconStyle} />
                        <TextInput placeholder='Email' style={styles.txtInput} />
                    </View>
                    <View style={styles.inputView}>
                        <LoginIcon name="lock" style={styles.iconStyle} />
                        <TextInput placeholder='Password' style={styles.txtInput} secureTextEntry={this.state.showPass} />
                        <TouchableOpacity style={styles.LockIconViewStyle}
                            onPress={
                                () => {
                                    this.setState({ showPass: !this.state.showPass })
                                }
                            }
                        >

                            {
                                this.state.showPass ? <Icon name="eye-off" style={styles.LockIconStyle} />
                                    :
                                    <Icon name="eye" style={styles.LockIconStyle} />
                            }

                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style = {styles.btnForget}>
                        <Text style = {styles.btnForgetTxt}>
                            Forget Password?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnLogIn}>
                        <Text style={styles.btnTxt}>Login</Text>
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
        backgroundColor: '#FFF',
        width: '100%',
        height: '45%',
        justifyContent: 'center',
        alignItems: "center",
        borderBottomLeftRadius: widthToDp(100),
    },
    bottomView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '55%'
    },

    inputView: {
        backgroundColor: '#FFF',
        height: heightToDp(6),
        width: '80%',
        borderRadius: heightToDp(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInput: {
        width: '75%',
        height: '100%',

    },
    iconStyle: {
        color: BackGroundColor,
        fontSize: 20,
        marginRight: 5,
        marginLeft: -20

    },
    LockIconViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -22,
        marginLeft: 4
    },
    LockIconStyle: {
        color: BackGroundColor,
        fontSize: 20,
    },

    btnLogIn: {
        backgroundColor: '#053881',
        width: widthToDp(80),
        height: heightToDp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: widthToDp(5),
        marginTop: 20,
        elevation: 1
    },
    btnTxt: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF'
    },
    btnForget:{
        margin:10,
    },
    btnForgetTxt:{
        color:'#FFF',
        fontWeight:'bold',
        padding:3,
    }
});

