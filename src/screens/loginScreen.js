import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity, FlatList,
    StyleSheet, Dimensions, TextInput
} from 'react-native';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import LoginIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { min } from 'react-native-reanimated';

const required = (val) => val ? true : false;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPass: true,
            req: false,
            max: null,
            min: null,
            validEmail: false,
            errEmail: '',
            errPass: '',
            email: '',
            pass: '',
        }
        this.setError = this.setError.bind(this);
    }

    setError(err_) {
        this.setState({ err: err_ })
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
                        <TextInput placeholder='Email' style={styles.txtInput}
                            onChangeText={(val) => {
                                validEmail(val) ? this.setState({ errEmail: '' }) : this.setState({ errEmail: 'invalid email' })
                                this.setState({ email: val })
                            }}

                            onBlur={() => {
                                this.state.email ? false : this.setState({ errEmail: 'required' })
                            }}
                        />

                    </View>
                    <Text style={styles.errStyle}>{this.state.errEmail}</Text>
                    <View style={styles.inputView}>
                        <LoginIcon name="lock" style={styles.iconStyle} />
                        <TextInput placeholder='Password' style={styles.txtInput} secureTextEntry={this.state.showPass}
                            onChangeText={(val) => {
                                if (val.length >12) {
                                    this.setState({errPass:'must be less than 12 characters'})
                                }
                                else if (val.length <4) {
                                    this.setState({errPass:'must be greater than 4 characters'})
                                }
                                else{
                                    this.setState({errPass:''}) 
                                }
                                this.setState({ pass: val })
                            }}

                            onBlur={() => {
                                this.state.pass ? false : this.setState({ errPass: 'required' })
                            }}
                        />
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
                    <Text style={{ ...styles.errStyle, marginTop: 0, marginBottom: 0 }}>{this.state.errPass}</Text>
                    <TouchableOpacity style={styles.btnForget}>
                        <Text style={styles.btnForgetTxt}>
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
    btnForget: {
        // margin: 10,
    },
    btnForgetTxt: {
        color: '#FFF',
        fontWeight: 'bold',
        padding: 3,
    },
    errStyle: {
        color: 'red',
        fontSize: 14,
        marginBottom: 12,
        marginTop: -15
    }
});

