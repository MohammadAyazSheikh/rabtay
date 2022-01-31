import React, { Component } from "react";
import {
    View, StyleSheet,
    Animated, TextInput, ScrollView
} from 'react-native';
import { BackGroundColor } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";
import { data } from "../utilities/messageData";
import Icon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import PlaceHolder from "../components/placeHolderComponent";
import { connect } from 'react-redux';
import { GetMessages } from '../redux/actions/getMessagesActions';
import { GetContacts } from "../redux/actions/getContactsActions";
import RenderFriends from "../components/singleFriendComponent";



const mapStateToProps = state => {
    return {
        token: state?.user?.user?.token,
        contacts: state?.contacts?.contacts,
        isLaoding: state?.contacts?.isLoading,
        messages: state.messages.messages,
        onVideoCall: state?.onVideoCall.onVideoCall
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: (token) => {
            dispatch(GetContacts(token));
        }
    }
};

const arr = [1, 2, 3];

class NewMessage extends Component {

    constructor(props) {
        super(props);

        this.scrollY = new Animated.Value(0);
        this._scrollY = this.scrollY.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolateLeft: 'clamp' });
        this.headerTranslate = Animated.diffClamp(this._scrollY, 0, heightToDp(1)).interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1],
        });

        this.screenFocus = this.screenFocus.bind(this);


        this.state = {
            // isLoading: this.props.contacts.isLaoding,
            // contacts: this.props.contacts.contacts,

            refresh: false
        }
    }
    screenFocus() {
        this.setState({ contacts: this.props.contacts.contacts })
    }
    componentDidMount() {
        this.props.getContacts(this.props.token);
        this.UnsubFocusScreen = this.props.navigation.addListener('focus', this.screenFocus);
        // console.log(JSON.stringify(this.props.messages));
        // alert(JSON.stringify(this.props.messages.length))
    }

    componentWillUnmount() {
        this.UnsubFocusScreen();
    }

    componentDidUpdate() {
        if (this.props.onVideoCall) {
            this.props.navigation.navigate("IncomingCall");
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    // this.state.isLoading
                    this.props?.isLoading ?
                        <ScrollView
                            contentContainerStyle={{ paddingTop: heightToDp(8), paddingHorizontal: 10 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                arr.map((item) => {
                                    return (
                                        <PlaceHolder opacity={0.8} key={item} />
                                    );
                                })
                            }
                        </ScrollView>

                        :
                        <Animated.FlatList
                            data={this.props?.contacts}
                            keyExtractor={(item) => item.contacts.contactId._id}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                paddingTop: heightToDp(8),
                                paddingBottom: heightToDp(16),
                                width: widthToDp(100)
                            }}
                            showsVerticalScrollIndicator={true}
                            onScroll={
                                Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                                    { useNativeDriver: true }
                                )
                            }
                            renderItem={({ index, item }) => {

                                //checking if chat alread exist
                                const msg = this.props?.messages?.filter(
                                    msg => {
                                        return msg?.contactId === item?.contacts?.contactId?._id;
                                    });

                                let initializeChat = msg?.length > 0 ? false : true;

                                return (<RenderFriends
                                    uName={item.contacts.contactId.fname + ' ' + item.contacts.contactId.lname}
                                    time={moment(item.lastSeen).fromNow()}
                                    image={item.contacts.contactId?.profileImage?.path}
                                    isActive={item.isActive}
                                    lastSeen={item.lastSeen}
                                    contactId={item?.contacts?.contactId?._id}
                                    contact={item?.contacts?.contactId}
                                    chatId={msg?.length > 0 ? msg[0]?.chatId : null}
                                    fromNewMsgScrn={true}
                                    initializeChat={initializeChat}
                                    {...this.props}
                                />);
                            }
                            }
                        />

                }
                <Animated.View style={[styles.searchBarView, { transform: [{ translateY: this.headerTranslate }] }]}>
                    <Icon name='search' size={widthToDp(10)} color={'#5e748d'} />
                    <TextInput style={styles.txtInput} placeholder='Search'
                        placeholderTextColor='#5e748d'
                        onChangeText={
                            (value) => {
                                this.setState({ isLoading: true });
                                setTimeout(() => {
                                    this.setState({ isLoading: false });
                                }, 1500);

                                let str = value.replace(/\s+/g, '').toLocaleLowerCase();
                                let filterdUser = data.filter((item) => item.uName.replace(/\s+/g, '').toLocaleLowerCase().includes(str));
                                this.setState({ messages: filterdUser });
                            }
                        }
                    />
                </Animated.View>
            </View>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
    },
    searchBarView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#c4e4f0',
        width: '95%',
        height: heightToDp(7),
        borderRadius: 10,
        position: 'absolute',
        alignSelf: 'center',
        top: '1%'
    },
    txtInput: {
        // backgroundColor:'grey',
        borderRadius: 10,
        width: '90%',
        textAlign: 'left',
        fontSize: 16,
        color: BackGroundColor
    },
    messageView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '100%',
        height: heightToDp(14),
        elevation: 5,
        marginVertical: 5
    },
    imageView: {
        width: heightToDp(13),
        height: heightToDp(13),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    imageStyle: {
        width: '95%',
        height: '95%',
        borderRadius: 100,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: BackGroundColor,
    },
    activeStyles: {
        width: 15,
        height: 15,
        borderRadius: 8,
        backgroundColor: 'lightgreen',
        position: 'absolute',
        bottom: 5,
        right: 15,
        elevation: 5,
    },
    chatView: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        paddingRight: 3
    },
    txtName: {
        fontSize: widthToDp(5),
        fontWeight: 'bold',
        color: '#000'
    },
    txtTime: {
        fontSize: widthToDp(3),
        color: 'grey'
    },
    footerView: {
        // backgroundColor: 'green',
        justifyContent: 'flex-start',
        width: '100%',
        height: '50%'
    },
    txtMessage: {
        fontSize: widthToDp(4),
        color: 'grey'
    }

})