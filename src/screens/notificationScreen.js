import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import SingleNotification from '../components/notificationComponent';
import Icon from 'react-native-vector-icons/Fontisto';
import { widthToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import moment from "moment";
import { GetNotifications } from '../redux/actions/notificationsActions';
import { socket } from '../lib/socket';
import { ActivityIndicator } from 'react-native-paper';




const mapStateToProps = state => {
    return {
        user: state?.user?.user?.user,
        token: state?.user?.user?.token,
        notific: state.notifications.notific,
        isLoading: state.notifications.isLoading,
        onVideoCall: state?.onVideoCall.onVideoCall
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        GetNotifications: (token) => {
            dispatch(GetNotifications(token));
        }
    }
};



const RenderIcon = () => (
    <>
        <View>
            <View style={styles.Circle} />
            <Icon name='bell-alt' size={widthToDp(40)} color='grey' />
        </View>
        <Text style={styles.txtNotification}>Nothing here!!!</Text>
    </>
)

class Notification extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.GetNotifications(this.props.token);
        socket.emit('notification',
            {
                markUnread: true,
                id: this.props.user._id
            }
        );
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
                    !this.props.isLoading ?
                        // post.length > 0 ?
                        this.props?.notific?.length > 0 ?
                            <FlatList
                                data={this.props.notific}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }) =>
                                    <SingleNotification
                                        uName={`${item.from.fname} ${item.from.lname}`}
                                        image={item.from.profileImage?.path}
                                        type={item.type}
                                        fromId={item.from._id}
                                        time={moment(item.createdAt).fromNow()}
                                        description={item.description}
                                        type={item.type}
                                    />
                                }
                                contentContainerStyle={{ paddingBottom: 120, }}
                            />
                            :
                            <RenderIcon />
                        :
                        <ActivityIndicator color='skyblue' size={50} />
                }
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Circle: {
        width: widthToDp(35),
        height: widthToDp(35),
        borderRadius: widthToDp(50),
        backgroundColor: BackGroundColor,
        position: 'absolute',
        bottom: '20%'
    },
    txtNotification: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 100
    }
});




