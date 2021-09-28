import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity, Animated,
    StyleSheet, ActivityIndicator, TextInput
} from 'react-native';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import LoginIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { Login } from '../redux/actions/loginActions';
import * as Animatable from 'react-native-animatable';

const required = (val) => val ? true : false;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => (
    {
        Login: (email, pass) =>
            dispatch(Login(email, pass))

    }
)

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.logoAnim = new Animated.Value(heightToDp(43));

        this.inputAnim = new Animated.Value(1);
        this.inputColor = this.inputAnim.interpolate({
            inputRange: [1, 1.15],
            outputRange: ['white', 'red'],
        });
        this.inputAnim2 = new Animated.Value(1);
        this.inputColor2 = this.inputAnim2.interpolate({
            inputRange: [1, 1.15],
            outputRange: ['white', 'red'],
        });
        this.state = {
            showPass: true,
            errEmail: null,
            errPass: null,
            email: '',
            pass: '',
        }
        this.animateTextField = this.animateTextField.bind(this);
        this.animateEmptyField = this.animateEmptyField.bind(this);
        this.buttonLogin = React.createRef();
    }

    animateTextField(textFieldErr, animatedVal) {
        if (textFieldErr) {
            Animated.sequence([
                Animated.timing(
                    animatedVal,
                    {
                        toValue: 1.04,
                        useNativeDriver: false,
                        duration: 400
                    }
                ),
                Animated.timing(
                    animatedVal,
                    {
                        toValue: 1,
                        useNativeDriver: false,
                        duration: 400
                    }
                ),
            ]).start();
        }
    }

    animateEmptyField(animatedVal) {
        Animated.sequence([
            Animated.spring(
                animatedVal,
                {
                    toValue: 1.03,
                    useNativeDriver: false,
                    stiffness: 100
                }
            ),
            Animated.spring(
                animatedVal,
                {
                    toValue: 1,
                    useNativeDriver: false,
                    stiffness: 100
                }
            ),
        ]).start();
    }

    componentDidMount() {

        setTimeout(() => {
            Animated.timing(
                this.logoAnim,
                {
                    toValue: heightToDp(25),
                    useNativeDriver: false,
                    duration: 400
                }
            ).start();
        }, 300)

    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[
                    styles.logoView,
                    { height: this.logoAnim }
                ]}>
                    {/* <Image source={require('../../assets/logot.png')} style={styles.logoImg} /> */}
                    <Text style={
                        {
                            fontSize: widthToDp(20),
                            color: BackGroundColor,
                            fontFamily: 'Pacifico-Regular',
                            textShadowOffset: { width: 1.5, height: 1 },
                            textShadowRadius: 1,
                            textShadowColor: 'black',
                        }
                    }>
                        Rabtay
                    </Text>
                </Animated.View>
                <View style={styles.bottomView}>

                    {/* =====Email==== */}
                    < Animated.View
                        style={
                            [
                                { ...styles.inputView, marginBottom: 20 },
                                {
                                    transform: [{ scale: this.inputAnim }],
                                    backgroundColor: this.inputColor,
                                }
                            ]
                        }

                    >
                        <LoginIcon name="mail" style={styles.iconStyle} />
                        <TextInput placeholder='Email' placeholderTextColor='grey'
                            keyboardType='email-address'
                            style={styles.txtInput} textContentType='emailAddress'
                            onChangeText={(val) => {
                                validEmail(val) ? this.setState({ errEmail: null }) : this.setState({ errEmail: 'invalid email' })
                                this.setState({ email: val })
                            }}

                            onBlur={() => {
                                this.state.email ? false : this.setState({ errEmail: 'required' });
                                this.animateTextField(this.state.errEmail, this.inputAnim);
                            }}
                        />

                    </Animated.View>
                    <Text style={styles.errStyle}>{this.state.errEmail}</Text>

                    {/* ====Password==== */}
                    <Animated.View
                        style={[
                            styles.inputView,
                            {
                                transform: [{ scale: this.inputAnim2 }],
                                backgroundColor: this.inputColor2
                            }
                        ]
                        } >
                        <LoginIcon name="lock" style={styles.iconStyle} />
                        <TextInput placeholder='Password' placeholderTextColor='grey'
                            style={styles.txtInput} secureTextEntry={this.state.showPass}
                            onChangeText={(val) => {
                                if (val.length > 12) {
                                    this.setState({ errPass: 'must be less than 12 characters' })
                                }
                                else if (val.length < 6) {
                                    this.setState({ errPass: 'must be greater than 6 characters' })
                                }
                                else {
                                    this.setState({ errPass: null })
                                }
                                this.setState({ pass: val })
                            }}

                            onBlur={() => {
                                this.state.pass ? false : this.setState({ errPass: 'required' });
                                this.animateTextField(this.state.errPass, this.inputAnim2);
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

                    </Animated.View>
                    <Text style={{ ...styles.errStyle, marginTop: 0, marginBottom: 0 }}>{this.state.errPass}</Text>
                    <TouchableOpacity style={styles.btnForget}>
                        <Text style={styles.btnForgetTxt}>
                            Forget Password?
                        </Text>
                    </TouchableOpacity>
                    <Animatable.View ref={this.buttonLogin}   >
                        <TouchableOpacity
                            style={styles.btnLogIn}
                            onPress={() => {

                                if (!this.state.email)
                                    this.animateEmptyField(this.inputAnim);

                                if (!this.state.pass)
                                    this.animateEmptyField(this.inputAnim2);


                                if (this.state.email !== '' && !this.state.pass !== ''
                                    && this.state.errPass == null && this.state.errEmail == null) {
                                    this.props.Login(this.state.email, this.state.pass)
                                }

                                this.buttonLogin.current.bounce(800);
                            }}
                        >
                            {/* <Text style={styles.btnTxt}>Login</Text> */}
                            {
                                this.props.user.isLoading ? <ActivityIndicator size='large' color='white' /> :
                                    <Text style={styles.btnTxt}>Login</Text>
                            }
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

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
        elevation: 10
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
        alignItems: 'center',
        elevation: 5
    },
    txtInput: {
        width: '75%',
        height: '100%',
        color: BackGroundColor

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

