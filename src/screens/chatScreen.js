import React, { Component } from "react";
import {
    Text, View, StyleSheet, TouchableOpacity, Image,
    Animated, TextInput, Platform, ScrollView, FlatList
} from 'react-native';
import { BackGroundColor, blueGradeint2, blackGradient1 } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";
import Iconic from "react-native-vector-icons/Ionicons";
import FA from "react-native-vector-icons/FontAwesome";
import PlaceHolder from "../components/placeHolderComponent";
import { data } from "../utilities/chatData";
import LinearGradient from 'react-native-linear-gradient';


const RenderMessage = ({ sender, reciever, image, message, isImage, index }) => {
    let i;
    if (index == data.length - 1)
        i = index;
    else
        i = index + 1
    return (
        reciever ?
            isImage ?
                <Image source={image} style={[styles.imgStyleMessage, { alignSelf: 'flex-end' }]} />
                :
                <LinearGradient colors={[BackGroundColor, blueGradeint2]} style={
                    [
                        styles.messageRecievedStyle,
                        { marginBottom: data[i].sender ? 10 : 2 }
                    ]
                }>
                    <Text style={[styles.txtSender]}>{message}</Text>
                </LinearGradient >

            :

            < View >
                {

                    isImage ?
                        <Image source={image} style={[styles.imgStyleMessage]} />
                        :
                        <LinearGradient colors={[blackGradient1, '#6E8894']} style={[styles.messageRecievedStyle, styles.messageSentStyle,]}>
                            <Text style={[styles.txtSender]}>{message}</Text>
                        </LinearGradient>
                }

                {/* putting image after sender last in a row message */}
                {
                    !data[i].sender || data[data.length - 1].sender && index == data.length - 1 ?
                        <Image source={image} style={[styles.imgStyle, { marginBottom: 10 }]} />
                        :
                        <View />

                }
            </View >


    );
}

class Chat extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <View style={styles.backBtnView}>
                        <TouchableOpacity style={{ padding: 5 }}
                            onPress={() => { this.props.navigation.navigate('Messages') }}
                        >
                            <Iconic name='arrow-back' color='#FFF' size={35} style={styles.iconStyles} ></Iconic>
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
                            <Iconic name='call' color='#FFF' size={30} style={styles.iconStyles}></Iconic>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 5 }}>
                            <Iconic name='videocam' color='#FFF' size={30} style={styles.iconStyles}></Iconic>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 5, }}>
                            <FA name='exclamation-circle' color='#FFF' size={30} style={styles.iconStyles}></FA>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyView}>
                    <View style={styles.chatView}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingHorizontal: 5 }}
                            renderItem={({ item, index }) =>
                                <RenderMessage
                                    sender={item.sender}
                                    reciever={item.reciever}
                                    image={item.img}
                                    message={item.message}
                                    index={index}
                                    isImage={item.isImage}
                                />
                            }
                        />
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomBtnView}>

                        </View>
                        <View style={styles.txtInputView}>

                        </View>
                    </View>
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
        textShadowColor: '#000',
        textShadowRadius: 2,
        textShadowOffset: {
            width: 0,
            height: 1
        }
    },
    txtActive: {
        color: 'grey',
        textShadowColor: '#000',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 0,
            height: 0.5
        }
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
        elevation: 5,
        width: '100%',
        height: heightToDp(90),
        borderTopLeftRadius: heightToDp(90) / 18,
        borderTopRightRadius: heightToDp(90) / 18,
    },
    iconStyles: {
        textShadowColor: '#000',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 0,
            height: 0.5
        }
    },

    chatView: {
        backgroundColor: '#FFF',
        width: widthToDp(100),
        height: '90%',
    },

    messageRecievedStyle: {
        maxWidth: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: BackGroundColor,
        marginVertical: 2,
        alignSelf: 'flex-end',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 10
    },
    messageSentStyle: {
        backgroundColor: '#1F2421',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    txtSender: {
        fontSize: 14,// widthToDp(3.5)
        color: '#FFF',
        textShadowColor: '#000',
        textShadowRadius: 0.5,
        textShadowOffset: {
            width: 0,
            height: 0.5
        }
    },
    imgStyleMessage: {
        width: widthToDp(60),
        height: widthToDp(60),
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: '#FFF',
    },
    bottomView: {
        backgroundColor: 'grey',
        // width: widthToDp(100),
        flex:1
    },

    bottomBtnView: {
        backgroundColor: '#FFF',
        height: '100%',
        width: '45%'
    },
    txtInputView: {
        backgroundColor: 'green',
        height: '100%',
        width: '65%'
    }



})