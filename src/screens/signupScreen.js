import React, { Component } from 'react';
import {
    Text, View, Image, Animated, TouchableOpacity,
    StyleSheet, ScrollView, TextInput
} from 'react-native';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker'

const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.logoAnim = new Animated.Value(heightToDp(43));

        this.fnameAnim = new Animated.Value(1);
        this.fnameColor = this.fnameAnim.interpolate({
            inputRange: [1, 1.15],
            outputRange: ['white', 'red'],
        });

        this.lnameAnim = new Animated.Value(1);
        this.lnameColor = this.lnameAnim.interpolate({
            inputRange: [1, 1.15],
            outputRange: ['white', 'red'],
        });

        this.emailAnim = new Animated.Value(1);
        this.emailColor = this.emailAnim.interpolate({
            inputRange: [1, 1.15],
            outputRange: ['white', 'red'],
        });

        this.passAnim = new Animated.Value(1);
        this.passColor = this.passAnim.interpolate({
            inputRange: [1, 1.15],
            outputRange: ['white', 'red'],
        });

        this.state = {
            Fname: '',
            FnameErr: '',
            Lname: '',
            LnameErr: "",
            Dob: new Date(),
            email: '',
            emailErr: '',
            pass: '',
            passErr: '',
        }
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

    render() {


        return (
            <View style={styles.container}>
                <Animated.View style={[
                    styles.logoView,
                    { height: this.logoAnim }
                ]}>
                    <Image source={require('../../assets/logot.png')} style={styles.logoImg} />
                </Animated.View>
                <View style={styles.bottomView}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle} >
                        {/* ------------------First Name----------- */}
                        < Animated.View
                            style={
                                [
                                    { ...styles.inputView, marginBottom: 20 },
                                    {
                                        transform: [{ scale: this.fnameAnim }],
                                        backgroundColor: this.fnameColor,
                                    }
                                ]
                            }

                        >
                            <AntDesign name="user" style={styles.iconStyle} />
                            <TextInput placeholder='First Name' style={styles.txtInput}

                                onChangeText={(val) => {
                                    this.setState({ Fname: val });
                                    if (this.state.Fname)
                                        this.setState({ FnameErr: '' });
                                }}
                                onBlur={() => {

                                    if (!this.state.Fname) {
                                        this.animateEmptyField(this.fnameAnim);
                                        this.setState({ FnameErr: 'required' })
                                    }
                                    else {
                                        this.setState({ FnameErr: '' });
                                    }
                                }}
                            />
                        </Animated.View>
                        <Text style={styles.errStyle}>{this.state.FnameErr}</Text>

                        {/* ------------------Last Name----------- */}
                        < Animated.View
                            style={
                                [
                                    { ...styles.inputView, marginBottom: 20 },
                                    {
                                        transform: [{ scale: this.lnameAnim }],
                                        backgroundColor: this.lnameColor,
                                    }
                                ]
                            }

                        >
                            <AntDesign name="user" style={styles.iconStyle} />
                            <TextInput placeholder='Last Name' style={styles.txtInput}

                                onChangeText={(val) => {
                                    this.setState({ Lname: val })
                                    if (this.state.Lname)
                                        this.setState({ LnameErr: '' });
                                }}
                                onBlur={() => {

                                    if (!this.state.Lname) {
                                        this.animateEmptyField(this.lnameAnim);
                                        this.setState({ LnameErr: 'required' })
                                    }
                                    else {
                                        this.setState({ LnameErr: '' });
                                    }
                                }}
                            />
                        </Animated.View>
                        <Text style={styles.errStyle}>{this.state.LnameErr}</Text>

                        {/* Date of Birth */}

                        < View style={styles.dateView}  >
                            <DatePicker
                                date={this.state.Dob}
                                onDateChange={(val) => { this.setState({ Dob: val }); console.log(val) }}
                                style={styles.dateStyle}
                                textColor={BackGroundColor}
                                mode='date'
                            />
                        </View>

                        {/* ----Email------- */}
                        < Animated.View
                            style={
                                [
                                    { ...styles.inputView, marginBottom: 20 },
                                    {
                                        transform: [{ scale: this.emailAnim }],
                                        backgroundColor: this.emailColor,
                                    }
                                ]
                            }

                        >
                            <AntDesign name="mail" style={styles.iconStyle} />
                            <TextInput placeholder='Email' style={styles.txtInput}
                                onChangeText={(val) => {
                                    validEmail(val) ? this.setState({ emailErr: '' }) : this.setState({ emailErr: 'invalid email' })
                                    this.setState({ email: val })
                                }}

                                onBlur={() => {
                                    this.state.email ? false : this.setState({ errEmail: 'required' });
                                    this.animateTextField(this.state.emailErr, this.emailAnim);
                                    if (!this.state.email) {
                                        this.setState({ emailErr: 'required' })
                                        this.animateEmptyField(this.emailAnim);
                                    }

                                }}
                            />
                        </Animated.View>
                        <Text style={styles.errStyle}>{this.state.emailErr}</Text>


                        {/* ----Password------- */}
                        < Animated.View
                            style={
                                [
                                    { ...styles.inputView, marginBottom: 20 },
                                    {
                                        transform: [{ scale: this.passAnim }],
                                        backgroundColor: this.passColor,
                                    }
                                ]
                            }

                        >
                            <AntDesign name="lock" style={styles.iconStyle} />
                            <TextInput placeholder='Password' style={styles.txtInput}
                                onChangeText={(val) => {



                                    if (val.length > 12) {
                                        this.setState({ passErr: 'must be less than 12 characters' })
                                    }
                                    else if (val.length < 4) {
                                        this.setState({ passErr: 'must be greater than 4 characters' })
                                    }
                                    else {
                                        this.setState({ passErr: '' })
                                    }
                                    this.setState({ pass: val })
                                }}

                                onBlur={() => {
                                    // this.state.pass ? false : this.setState({ passErr: 'required' });
                                    this.animateTextField(this.state.passErr, this.passAnim);
                                    if (!this.state.pass) {
                                        this.setState({ passErr: 'required' })
                                        this.animateEmptyField(this.passAnim);
                                    }

                                }}
                            />
                        </Animated.View>
                        <Text style={styles.errStyle}>{this.state.passErr}</Text>
                        {/*------- Button---- */}
                        <TouchableOpacity
                            style={styles.btnLogIn}
                            onPress={() => {

                                if (!this.state.email)
                                    this.animateEmptyField(this.emailAnim);

                                if (!this.state.pass)
                                    this.animateEmptyField(this.passAnim);

                                if (!this.state.Fname)
                                    this.animateEmptyField(this.fnameAnim);

                                if (!this.state.Lname)
                                    this.animateEmptyField(this.lnameAnim);

                            }}
                        >
                            <Text style={styles.btnTxt}>Signup</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
        flex: 1,
        // backgroundColor: 'red'
    },
    scrollViewStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: widthToDp(100),
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

    },
    iconStyle: {
        color: BackGroundColor,
        fontSize: 20,
        marginRight: 5,
        marginLeft: -20

    },
    errStyle: {
        color: 'red',
        fontSize: 14,
        marginBottom: 12,
        marginTop: -15
    },
    dateView: {
        width: '80%',
        marginBottom: 30,
        borderRadius: widthToDp(5),
        backgroundColor: '#FFF',
        height: widthToDp(30),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    dateStyle: {
        backgroundColor: '#FFF',
        width: widthToDp(70),
        height: widthToDp(25),

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

});

