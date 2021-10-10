import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Ant from 'react-native-vector-icons/AntDesign';
import {
    Text, View, StyleSheet, Image, Animated
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';


export default class CenterButton extends Component {
    constructor(props) {
        super(props);
        this.btn1Val = new Animated.ValueXY({ x: 5, y: 10 });
        this.btn2Val = new Animated.ValueXY({ x: 5, y: 10 });
        this.scaleBtn = new Animated.Value(0);
        this.state = {
            showBtn: true,
            imageUri: null
        }
    }
    selectPicture = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
        };

        ImagePicker.launchCamera(options, async res => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                let source = res;
                this.setState({ imageUri: source.assets[0].uri })
                console.log(this.state.imageUri);
            }
        });
    };
    animateBtn = (x_, y_, stiff, scale_) => {
        Animated.parallel([
            Animated.spring(
                this.btn1Val,
                {
                    toValue: { x: x_, y: y_ },
                    useNativeDriver: false,
                    stiffness: stiff
                }
            ),
            Animated.spring(
                this.btn2Val,
                {
                    toValue: { x: x_, y: y_ },
                    useNativeDriver: false,
                    stiffness: stiff
                }
            ),
            Animated.timing(
                this.scaleBtn,
                {
                    toValue: scale_,
                    useNativeDriver: false,

                }
            ),
        ]).start();
    }

    render() {
        const { children, onPress } = this.props
        return (
            <View
                style={{
                    top: -30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: '#FFF',
                    overflow: "visible",
                    // elevation:100
                }} >

                <Animated.View style={
                    {
                        width: 55,
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 35,
                        backgroundColor: '#FFF',
                        position: 'absolute',
                        bottom: this.btn1Val.x,
                        right: this.btn1Val.y,
                        transform: [{ scale: this.scaleBtn }],

                    }
                }>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: '#2fbbf0',
                        }}
                        onPress={this.selectPicture.bind(this)}
                    >
                        <Material name='camera-iris' size={30} color='#FFF' />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={
                    {
                        width: 55,
                        height: 55,
                        borderRadius: 35,
                        backgroundColor: '#FFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: this.btn2Val.x,
                        left: this.btn2Val.y,
                        transform: [{ scale: this.scaleBtn }],
                    }
                }>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: '#2fbbf0'
                        }}
                        onPress={() => { this.props.navigation.navigate('NewPost') }}
                    >
                        <Ant name='picture' size={30} color='#FFF' />
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity
                    onPress={

                        () => {
                            this.setState({ showBtn: !this.state.showBtn });
                            if (this.state.showBtn)
                                this.animateBtn(75, 75, 95, 1);
                            else
                                this.animateBtn(5, 10, 95, 0);
                        }
                    }
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 35,
                        backgroundColor: '#2fbbf0',
                        elevation: 5,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // elevation:100
                        // position: 'absolute',

                    }}
                >
                    {/* {children} */}
                    <Icon name='plus' size={30} color='#FFF' />
                </TouchableOpacity>
            </View>
        );
    }
}
