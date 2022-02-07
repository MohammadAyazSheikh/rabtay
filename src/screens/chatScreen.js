import React, { Component, createRef } from "react";
import {
    Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator,
    Animated, TextInput, Platform, Keyboard, FlatList, KeyboardAvoidingView
} from 'react-native';
import { BackGroundColor, blueGradeint2, blackGradient1 } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";
import Iconic from "react-native-vector-icons/Ionicons";
import FA from "react-native-vector-icons/FontAwesome";
// import { data } from "../utilities/chatData";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { GetSingleUserMessages } from '../redux/actions/getSingleUserMessagesActions';
import { PostMessages, postMessagesSuccess } from '../redux/actions/postMessageActions';
import { GetVideoChatToken } from '../redux/actions/getVideoChatTokenActions';
import { OnVideoCallReset } from '../redux/actions/onVideoCallActions';
import { baseUrl } from '../utilities/config';
import moment, { fn } from "moment";
import { socket } from '../lib/socket';

const RenderMessage = ({ sender, reciever, image, message, isImage, index, lastIndex,
    contactImgFlag, profileImage, msgStatus }) => {


    return (
        sender ?
            < View >
                {


                    isImage ?
                        <Image source={image} style={[styles.imgStyleMessage, { alignSelf: 'flex-end' }]} />
                        :
                        <LinearGradient colors={['#085672', '#C6EDFB']} style={
                            [
                                styles.messageRecievedStyle,
                                // { marginBottom: data[i].sender ? 10 : 2 }
                            ]
                        }
                            start={{ x: 1, y: 0 }}
                            end={{ x: -1, y: 0 }}

                        >
                            <Text style={[styles.txtSender]}>{message}</Text>
                        </LinearGradient >
                }
                {
                    index === lastIndex ?
                        < Text style={[{ alignSelf: 'flex-end' }]}> {msgStatus}</Text>
                        :
                        <View />
                }

            </ View >
            :

            < View >
                {

                    isImage ?
                        <Image source={image} style={[styles.imgStyleMessage]} />
                        :
                        <LinearGradient colors={['#2FBBF0', '#042B39']} style={[styles.messageRecievedStyle, styles.messageSentStyle]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: -1, y: 0 }}
                        >
                            <Text style={[styles.txtSender]}>{message}</Text>
                        </LinearGradient>
                }
                {/* putting image after sender last in a row message */}
                {
                    contactImgFlag ?
                        profileImage ?
                            <Image source={{ uri: baseUrl + profileImage }} style={[styles.imgStyle, { marginBottom: 10, borderColor: BackGroundColor }]} />
                            :
                            <Image source={require('../../assets/images/profile3.jpeg')} style={[styles.imgStyle, { marginBottom: 10 }]} />
                        :
                        <View />

                }

            </View >


    );
}


const mapStateToProps = state => {
    return {
        user: state?.user?.user?.user,
        token: state?.user?.user?.token,
        messages: state?.singeUserMessages?.messages?.messages,
        isLoading: state?.singeUserMessages?.isLoading,
        isTyping: state?.singeUserMessages?.messages?.isTyping,
        msgState: state?.singeUserMessages,
        onVideoCall: state?.onVideoCall?.onVideoCall
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: (token, chatId) => {
            dispatch(GetSingleUserMessages(token, chatId));
        },
        PostMessages: (token, chatId, text, to, type, initializeChat) => {
            dispatch(PostMessages(token, chatId, text, to, type, initializeChat));
        },
        PostMessagesSuccess: (data) => {
            dispatch(postMessagesSuccess(data));
        },
        getVideoChatToken: (token, username) => {
            dispatch(GetVideoChatToken(token, username));
        },
        onVideoCallReset: () => {
            dispatch(OnVideoCallReset());
        },
    }
};


class Chat extends Component {

    constructor(props) {
        super(props);
        this.keyboardHeight = new Animated.Value(10);
        this.scaleInputAnim = new Animated.Value(widthToDp(60));
        this.scaleYInputAnim = new Animated.Value(0);
        this.FlatListRef = createRef();
        this.onChatStatus = this.onChatStatus.bind(this);
        this.setMsgStatus = this.setMsgStatus.bind(this);
        this.onTyping = this.onTyping.bind(this);
        this.state = {
            inputHieght: 30,
            newLines: 0,
            text: '',
            msgStatus: 'sent',
            isTyping: false,
            isCallLoading: false
        }
    }

    setMsgStatus() {
        const lastIndex = this.props?.messages?.length - 1;
        let lastMsg = {};
        if (lastIndex)
            lastMsg = this.props?.messages[lastIndex];

        if (lastMsg?.from === this.props?.user?._id) {
            let msgStatus_;
            if (lastMsg.isSent) {
                msgStatus_ = 'Sent';
            }
            else if (lastMsg.isDelivered) {
                msgStatus_ = 'Delivered';
            }
            else if (lastMsg.isSeen) {
                msgStatus_ = 'Seen';
            }

            this.setState({ msgStatus: msgStatus_ })
        }
    }



    onChatStatus(data) {
        console.log(`\n\n\chat status listener msg from server\n\n ${JSON.stringify(data)}`);
        this.setState({ msgStatus: data.status });
    }

    onTyping(data) {
        this.setState({ isTyping: data.isTyping });
    }

    componentDidMount() {

        this.FlatListRef.current.scrollToEnd({ animating: true });

        //setting msg status
        setTimeout(this.setMsgStatus, 1000);


        //listening on new msg status
        socket.on("chatStatus", this.onChatStatus);

        //listening on typing status status
        socket.on('typing', this.onTyping);

        //marking all msg seen
        socket.emit('chatStatus', {
            contactId: this.props.route.params.contact?._id,
            chatId: this.props.route.params.chatId
        });

        this.props.getMessages(this.props.token, this.props.route.params.chatId);
        this.props.onVideoCallReset();

        const show = Platform.OS == 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const hide = Platform.OS == 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

        this.keyboardWillShowSub = Keyboard.addListener(show, this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener(hide, this.keyboardWillHide);

    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
        this.scaleYInputAnim.removeAllListeners();

        //removing handlers
        socket.off("chatStatus", this.onChatStatus);
        socket.off('typing', this.onTyping);
    }

    componentDidUpdate() {
        if (this.props.onVideoCall) {
            this.props.navigation.navigate("IncomingCall");
        }
    }

    keyboardWillShow = (event) => {
        // toValue:   event.endCoordinates.height/100*60, 
        this.AnimateScaleYInput(event.duration, this.state.inputHieght);
        this.animatedInput(200, widthToDp(98));

    };

    keyboardWillHide = (event) => {                         //10
        this.AnimateScaleYInput(event.duration, this.state.newLines == 0 ? 10 : this.state.inputHieght);
        this.animatedInput(200, widthToDp(60));

    };

    animatedInput(duration, toValue) {
        Animated.timing(this.scaleInputAnim, {
            duration,
            toValue,
            useNativeDriver: false
        }).start();
    }

    AnimateScaleYInput(duration, toValue) {
        console.log('cauth')
        Animated.timing(this.keyboardHeight, {
            duration,
            toValue,
            useNativeDriver: false
        }).start();
    }



    render() {
        const fname = this.props.route.params.contact.fname;
        const lname = this.props.route.params.contact.lname;
        const username = this.props.route.params.contact.username;
        const uname = fname + " " + lname;
        const profileImage = this.props.route.params.contact?.profileImage?.path;
        const contactId = this.props.route.params.contact?._id;
        const isActive = this.props.route.params.isActive;
        const lastSeen = this.props.route.params.lastSeen;
        const chatId = this.props.route.params.chatId;

        return (

            <KeyboardAvoidingView style={styles.container} behavior='padding'>
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
                            {
                                profileImage ?
                                    <Image source={{ uri: baseUrl + profileImage }} style={styles.imgStyle} /> :
                                    <Image source={require('../../assets/images/profile3.jpeg')} style={styles.imgStyle} />
                            }

                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.txtName}>{uname.length > 8 || fname.length > 10 ? `${fname.substr(0,10)}...` : uname}</Text>
                            {
                                this.state.isTyping ?
                                    <Text style={styles.txtActive}>typing...</Text>
                                    :
                                    <Text style={styles.txtActive}>{isActive ? "Active Now" : moment(lastSeen).fromNow()}</Text>
                            }

                        </View>
                    </View>
                    <View style={styles.leftButtonView}>
                        <TouchableOpacity style={{ padding: 5 }}
                            onPress={() => {

                                const roomName = username + '_' + this.props.user.username;

                                this.props.getVideoChatToken(this.props.token, this.props.user.username);
                                this.props.onVideoCallReset();
                                this.setState({ isCallLoading: true });
                                setTimeout(() => {
                                    this.setState({ isCallLoading: false });
                                    this.props.navigation.navigate('OutgoingCall', {
                                        roomName: roomName,
                                        image: profileImage,
                                        uname: `${fname} ${lname}`,
                                        contactId: contactId
                                    });

                                    socket.emit('videoCall', {
                                        contactId: this.props.route.params.contact?._id,
                                        roomName: roomName,
                                        userId: this.props.user._id,
                                        startCall: true
                                    });
                                }, 2000);

                            }}
                        >
                            {
                                this.state.isCallLoading ?
                                    <ActivityIndicator size={30} color='#FFF' />
                                    :
                                    <Iconic name='call' color='#FFF' size={30} style={styles.iconStyles}></Iconic>
                            }

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
                            ref={this.FlatListRef}
                            data={this.props.messages}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={{ paddingHorizontal: 5 }}
                            renderItem={({ item, index }) => {

                                let len = this.props.messages.length;
                                let lastIndex = len - 1;
                                let nextIndex = index === lastIndex ?
                                    lastIndex : index + 1;
                                let msgStatus;

                                if (index === lastIndex && item.from === this.props.user._id) {
                                    if (item.isSent) {
                                        msgStatus = 'Sent';
                                    }
                                    else if (item.isDelivered) {
                                        msgStatus = 'Delivered';
                                    }
                                    else if (item.isSeen) {
                                        msgStatus = 'Seen';
                                    }
                                }

                                return <RenderMessage

                                    sender={item.from === this.props.user._id}
                                    reciever={item.to === this.props.user._id}
                                    image={item.image}
                                    message={item.text}
                                    index={index}
                                    isImage={item.type === "image"}
                                    profileImage={profileImage}
                                    lastIndex={lastIndex}
                                    msgStatus={this.state.msgStatus}

                                    contactImgFlag={
                                        //if next message is mine
                                        this.props.messages[nextIndex].from === this.props.user._id
                                        ||
                                        // or if last message is of friend
                                        this.props.messages[lastIndex].to === this.props.user._id
                                        &&
                                        index == lastIndex
                                    }

                                />
                            }
                            }
                        />
                        <Text style={[styles.txtActive, { color: 'skyblue' }]} >{this.props.isTyping ? 'Typing...' : ''}</Text>
                    </View>
                    <Animated.View style={[styles.bottomView, { paddingBottom: this.keyboardHeight }]}>
                        <View style={styles.bottomBtnView}>
                            <TouchableOpacity style={{ padding: 5 }}>
                                <Iconic name='camera' color={BackGroundColor} size={30} style={styles.iconStyles} />
                            </TouchableOpacity >
                            <TouchableOpacity style={{ padding: 5 }}>
                                <FA name='picture-o' color={BackGroundColor} size={25} style={styles.iconStyles} />
                            </TouchableOpacity >
                            <TouchableOpacity style={{ padding: 5 }}>
                                <Iconic name='mic' color={BackGroundColor} size={30} style={styles.iconStyles} />
                            </TouchableOpacity >
                        </View>
                        <Animated.View style={[styles.txtInputView, { width: this.scaleInputAnim }]}>
                            <TextInput
                                value={this.state.text}
                                placeholder='write somthing'
                                style={styles.txtInput}
                                placeholderTextColor='#FFF'
                                keyboardType='default'
                                multiline
                                onChangeText={
                                    (val) => {

                                        // console.log(newLines.length)

                                        let text = val || ' ';
                                        let newLines = text.match(/\n/g) || '';

                                        this.setState({ newLines });
                                        this.setState({ text: val });
                                        if (newLines.length < 4 && val.substr(val.length - 1, 2).includes('\n') && this.state.inputHieght < 75) {
                                            this.setState({ inputHieght: newLines.length * 25 }, () => {
                                                this.AnimateScaleYInput(200, this.state.inputHieght);
                                            })
                                        }

                                        if (newLines.length < 4 && val.substr(val.length - 1, 2).includes('\n') && this.state.inputHieght >= 75) {
                                            this.setState({ inputHieght: newLines.length * 25 }, () => {
                                                this.AnimateScaleYInput(200, this.state.inputHieght);
                                            })
                                        }

                                    }

                                }
                                onBlur={() => {
                                    socket.emit('typing', {
                                        contactId: this.props.route.params.contact?._id,
                                        isTyping: false
                                    });
                                }}
                                onFocus={() => {
                                    socket.emit('typing', {
                                        contactId: this.props.route.params.contact?._id,
                                        isTyping: true
                                    });
                                }}
                            />
                            < TouchableOpacity style={{ padding: 5 }}
                                disabled={this.state.text === '' ? true : false}
                                onPress={() => {
                                    this.props.PostMessages(this.props.token, chatId, this.state.text, contactId, 'text', false);
                                    this.setState({ text: '' });
                                    this.setMsgStatus();
                                    this.FlatListRef.current.scrollToEnd({ animating: true });
                                }}
                            >
                                <Iconic name='send' color={BackGroundColor} size={25} style={styles.iconStyles} />
                            </TouchableOpacity >
                        </Animated.View>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView >

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

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
        color: '#FFF',
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
    },
    bottomView: {
        backgroundColor: '#FFF',
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        paddingVertical: 5,
        bottom: 0
    },

    bottomBtnView: {
        // backgroundColor: '#FFF',
        height: '100%',
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    txtInputView: {
        backgroundColor: '#FFF',
        // height: '100%',
        maxHeight: 110,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        right: 0,
    },
    txtInput: {

        flex: 1,
        // height: '100%',
        borderRadius: 30,
        paddingHorizontal: 10,
        backgroundColor: BackGroundColor,
        elevation: 2,
        color: '#FFF',
    }
});