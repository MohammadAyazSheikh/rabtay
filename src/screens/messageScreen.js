import React, { Component } from "react";
import {
    Text, View, StyleSheet, TouchableOpacity, Image,
    Animated, TextInput, ScrollView, 
} from 'react-native';
import { BackGroundColor } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";
import { data } from "../utilities/messageData";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
import PlaceHolder from "../components/placeHolderComponent";
import { connect } from 'react-redux';
import { GetMessages } from '../redux/actions/getMessagesActions';
import { GetContacts } from "../redux/actions/getContactsActions";
import { baseUrl } from '../utilities/config';
import moment from "moment";

//isActive, uName,  time, image,
// props.navigation.navigate('Search');
const RenderMessages = ({ navigation, message, contacts, contactId }) => {
    let user;

    let uName;
    let isActive;
    let lastSeen;
    let image;

    user = contacts?.filter(
        contact => {
            return contact?.contacts?.contactId?._id == contactId;
        });
    if (user) {
        uName = user[0]?.contacts?.contactId?.fname + " " + user[0]?.contacts?.contactId?.lname;
        isActive = user[0]?.isActive;
        lastSeen = user[0]?.lastSeen;
        image = user[0]?.contacts?.contactId?.profileImage?.path;
    }

    console.log(`\n\n\n\n\n\n\n\*********************************\nuser = ${contactId}\ncontactId = ${JSON.stringify(uName)}\n=========================`)

    return (
        <TouchableOpacity
            style={styles.messageView}
            onPress={() => {
                navigation.navigate('Chat');
            }}
        >
            <View style={styles.imageView}>
                {
                    image ?
                        <Image source={{ uri: baseUrl + image }} style={styles.imageStyle} />
                        :
                        <Image source={require('../../assets/images/profile3.jpeg')} style={styles.imageStyle} />
                }

                {isActive ?
                    <View style={styles.activeStyles} /> : <View />
                }
            </View>
            <View style={styles.chatView}>
                <View style={styles.headerView}>
                    <Text style={styles.txtName}>{uName}</Text>
                    <Text style={styles.txtTime}>{moment(lastSeen).fromNow()}</Text>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.txtMessage}>{message.length > 60 ? message.slice(0, 60) + ' ....' : message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
const arr = [1, 2, 3]

const mapStateToProps = state => {
    return {
        user: state?.user?.user?.user,
        token: state?.user?.user?.token,
        contacts: state?.contacts?.contacts,
        messages: state.messages.messages,
        isLoading: state.messages.isLoading
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: (token) => {
            dispatch(GetMessages(token));
        },
        getContacts: (token) => {
            dispatch(GetContacts(token));
        }
    }
};



class Message extends Component {

    constructor(props) {
        super(props);

        this.scrollY = new Animated.Value(0);
        this._scrollY = this.scrollY.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolateLeft: 'clamp' });
        this.headerTranslate = Animated.diffClamp(this._scrollY, 0, heightToDp(20)).interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1],
        });

        this._scrollY_ = this.scrollY.interpolate({ inputRange: [0, 15], outputRange: [1, 0], extrapolateLeft: 'clamp' });
        this.addButtonAnim = Animated.diffClamp(this._scrollY_, 0, 1).interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1],
        });
        this.state = {
            isLoading: false,
            messages: data
        }
    }


    componentDidMount() {
        this.props.getMessages(this.props.token);
        // this.props.getContacts(this.props.token);

    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.isLoading ?
                        <ScrollView
                            contentContainerStyle={{ paddingTop: heightToDp(17), paddingHorizontal: 10 }}
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
                            data={this.props.messages}
                            keyExtractor={(item) => item.chatId}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                paddingTop: heightToDp(17),
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

                                return (
                                    <RenderMessages
                                        // uName={"ilyas"}
                                        // time={'12-5-2012'}
                                        // image={null}
                                        // isActive={true}
                                        message={item.message.text}
                                        contactId={item.contactId}
                                        contacts={this.props.contacts}
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

                <Animated.View style={[styles.addBtnView, { transform: [{ scale: this.addButtonAnim }, { rotate: '180deg' }] }]}>
                    <TouchableOpacity style={styles.addBtn}>
                        <Icon2 name='new-message' size={25} color='#FFF' />
                    </TouchableOpacity>
                </Animated.View>


            </View>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);

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
        width: '90%',
        height: heightToDp(7),
        borderRadius: 10,
        position: 'absolute',
        alignSelf: 'center',
        top: '10%'
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
        // backgroundColor: 'red',
        flex: 1,
        height: '100%',
        paddingHorizontal: 5,
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
    },
    addBtnView: {
        position: 'absolute',
        backgroundColor: BackGroundColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        elevation: 5,
        right: 20,
        bottom: '20%'
    },
    addBtn: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

