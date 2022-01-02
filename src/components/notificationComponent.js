import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { heightToDp, widthToDp } from '../utilities/responsiveUtils';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { baseUrl } from '../utilities/config';
import { connect } from 'react-redux';
import { FollowUser } from '../redux/actions/followUserActions';
import { GetNotifications, DltNotification } from '../redux/actions/notificationsActions';
import { GetContacts } from '../redux/actions/getContactsActions';
import { notificationsBadgeSucces } from '../redux/actions/notificBadgeActions';
import { socket } from '../lib/socket';



const swipeFromRightOpen = () => {
    // alert('Swipe from right');
};
const rightSwipeActions = (fromId, token, follow, GetNotifications, clearNotificBadge, notificLen, DltNotification, getContacts, user, type) => {
    return (
        <View style={[styles.BtnSwipeView, type === "accept" ? { width: '30%' } : { width: '55%' }]}   >
            <TouchableOpacity style={[styles.btnSwipe, { backgroundColor: 'tomato' }, type === "accept" ? { width: '100%' } : { width: '50%' }]}
                onPress={() => {
                    DltNotification(token, fromId, 'follow', false);
                    clearNotificBadge(notificLen);
                }}
            >
                <Icon name={type === 'follow' ? "user-unfollow" : "trash"} size={25} color='#FFF' />
                <Text style={[styles.txtBtn,]}>
                    {type === 'follow' ? "Ignore" : "Delete"}
                </Text>
            </TouchableOpacity>
            {
                type === "follow" ?
                    <TouchableOpacity style={[styles.btnSwipe, { backgroundColor: BackGroundColor }]}
                        onPress={() => {
                            follow(token, fromId);
                            GetNotifications(token);
                            clearNotificBadge(notificLen);
                            getContacts(token);

                            let senderName = user.fname + " " + user.lname;
                            let payload = {
                                to: fromId,
                                from: user._id,
                                description: `accepted you request`,
                                type: 'accept'
                            }

                            socket.emit('notification',
                                {
                                    payload,
                                    senderName: senderName
                                }

                            );
                        }}
                    >
                        <Icon name='user-follow' size={25} color='#FFF' />
                        <Text style={styles.txtBtn}>
                            Follow
                        </Text>
                    </TouchableOpacity>
                    :
                    <View />
            }
        </View>
    );
};


const mapStateToProps = state => {
    return {
        token: state?.user?.user?.token,
        user: state?.user?.user?.user,
        notific: state.notifications.notific,
    }
}




const mapDispatchToProps = (dispatch) => {
    return {

        followUser: (token, contactId) => {
            dispatch(FollowUser(token, contactId));
        },
        GetNotifications: (token) => {
            dispatch(GetNotifications(token));
        },
        clearNotificBadge: (data) => {
            dispatch(notificationsBadgeSucces(data));
        },
        DltNotification: (token, userId, type, isCreator) => {
            dispatch(DltNotification(token, userId, type, isCreator));
        },
        GetContacts: (token) => {
            dispatch(GetContacts(token));
        },
    }
};

class SingleNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.mainView}>
                <Swipeable
                    renderRightActions={() => rightSwipeActions(this.props.fromId, this.props.token,
                        this.props.followUser, this.props.GetNotifications, this.props.clearNotificBadge,
                        this.props.notific.length, this.props.DltNotification, this.props.GetContacts,
                        this.props.user, this.props.type)}
                    onSwipeableRightOpen={swipeFromRightOpen}

                >
                    <View style={styles.NotificationView}>
                        <View style={styles.infoView}>
                            <View style={styles.imageView}>
                                {
                                    this.props.image ?
                                        <Image source={{ uri: baseUrl + this.props.image }} style={styles.imageStyle} /> :
                                        <Image source={require('../../assets/profile.jpg')} style={styles.imageStyle} />
                                }

                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.txtName}>{this.props.uName}
                                    <Text style={styles.txtDesc}> {this.props.description}</Text>
                                </Text>
                                <Text style={styles.txtTime}>{this.props.time}</Text>
                            </View>
                        </View>
                    </View>
                </Swipeable>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleNotification);

const styles = StyleSheet.create({

    mainView: {
        elevation: 10,
        width: widthToDp(100),
        height: heightToDp(14),
        marginVertical: 5,
    },
    NotificationView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        width: widthToDp(100),
        height: heightToDp(14),
    },

    infoView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
    },
    imageView: {
        width: widthToDp(26),
        height: widthToDp(26),
        borderRadius: widthToDp(25),
        borderWidth: 2,
        borderColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackGroundColor
    },
    imageStyle: {
        width: widthToDp(25),
        height: widthToDp(25),
        borderRadius: widthToDp(25),
        resizeMode: 'cover'
    },
    textView: {
        paddingLeft: 10,
        flex: 1,
    },
    txtName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    txtDesc: {
        fontSize: 14,
        fontWeight: 'normal'
    },
    txtTime: {
        color: 'grey'
    },
    BtnSwipeView: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        width: '55%',
        height: '100%',
        flexDirection: 'row',
    },
    btnSwipe: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%'
    },
    txtBtn: {
        color: '#FFF',
        fontWeight: 'bold'
    }

});


