import React, { Component } from "react";
import {
    Text, View, StyleSheet, TouchableOpacity, Image,
    Animated, TextInput, Keyboard, Platform, ScrollView, StatusBar
} from 'react-native';
import { BackGroundColor } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";
import Iconic from "react-native-vector-icons/Ionicons";
import FA from "react-native-vector-icons/FontAwesome";
import PlaceHolder from "../components/placeHolderComponent";



class Chat extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar />
                <View style={styles.headerView}>
                    <View style={styles.backBtnView}>
                        <TouchableOpacity style={{ padding: 5 }}
                        onPress = {()=>{this.props.navigation.navigate('Messages')}}
                        >
                            <Iconic name='arrow-back' color='#FFF' size={35}></Iconic>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerView}>
                        <View style={styles.imgView}>
                            <Image source={require('../../assets/p4.jpg')} style={styles.imgStyle} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.txtName}>Ali Ahmed</Text>
                            <Text style={styles.txtActive}>Active Now</Text>
                        </View>
                    </View>
                    <View style={styles.leftButtonView}>
                        <TouchableOpacity style={{ padding: 5 }}>
                            <Iconic name='call' color='#FFF' size={30}></Iconic>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 5 }}>
                            <Iconic name='videocam' color='#FFF' size={30}></Iconic>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 5,}}>
                            <FA name='exclamation-circle' color='#FFF' size={30}></FA>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyView}>

                </View>
            </View>

        )
    }
}

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackGroundColor
    },
    headerView: {
        backgroundColor: BackGroundColor,
        width: '100%',
        height: heightToDp(10),
        flexDirection: 'row'
    },
    backBtnView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerView: {
        flex: 3.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imgView: {
        width: widthToDp(13),
        height: widthToDp(13),
        borderRadius: widthToDp(13),
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: widthToDp(13),
        height: widthToDp(13),
        borderRadius: widthToDp(13),
        borderWidth: 1,
        borderColor: '#FFF',
    },
    textView: {
        paddingLeft: 5
    },
    txtName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    txtActive: {
        color: 'grey'
    },
    leftButtonView: {
        // backgroundColor: 'yellow',
        flex: 3.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    bodyView: {
        backgroundColor: '#FFF',
        elevation:5,
        width: '100%',
        height: heightToDp(90),
        borderTopLeftRadius: heightToDp(90) / 18,
        borderTopRightRadius: heightToDp(90) / 18, 
    },


})