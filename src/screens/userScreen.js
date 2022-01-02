import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated, StatusBar } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { GetUser } from '../redux/actions/getSingleUserAction';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connectServer, socket } from '../lib/socket';
import { baseUrl } from '../utilities/config';
import { ActivityIndicator } from 'react-native-paper';
// import { utils } from '@react-native-firebase/app';



const mapStateToProps = state => {
    return {
        user: state?.user?.user?.user,
        singleUser: state?.singleUser,
        token: state?.user?.user?.token,
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        getSingleUser: (token, uid) => {
            dispatch(GetUser(token, uid));
        }
    }
};




class User extends Component {
    constructor(props) {
        super(props);

        this.scrollY = new Animated.Value(0);
        const inputRange = [

            0,
            290
        ]

        this.blur = this.scrollY.interpolate(
            {
                inputRange,
                outputRange: [0, 1]
            }
        )
        this.state = {
            user: this.props.route.params,
            imageUri: null,
            cloudUrl: null,
            isFriend: !true,
        }

        this.RnderHeader = this.RnderHeader.bind(this);
    }


    RnderHeader = () => {
        const { fname, lname, about, profileImage, isFriend, isReqSent, username, _id } = this.props?.singleUser.user;
        const _fname = fname || 'wating';
        const _lname = lname || 'wating';
        const _about = about || 'wating';
        const _profileImage = profileImage || {};
        const _username = username || 'wating';
        const _id_ = _id || this.props.singleUser.user._id;

        let btnText = isFriend ? "Unfollow" : "Follow";
        btnText = isReqSent ? "Unsend" : btnText;

        return (
            <>
                <View style={styles.Header}>

                    <View style={styles.infoView}>
                        <View style={styles.imageView}>
                            {
                                _profileImage?.path ?
                                    <Image
                                        source={{ uri: baseUrl + _profileImage?.path }}
                                        style={styles.imgStyle}
                                    />

                                    :
                                    <Image
                                        source={require('../../assets/profile.jpg')}
                                        style={styles.imgStyle}
                                    />
                            }
                        </View>
                        <View style={styles.aboutView}>
                            <Text style={styles.txtName}  > {_fname + ' ' + _lname}</Text>
                            <Text style={styles.txtUserName}>{_username}</Text>
                            <Text style={styles.txtDesc}>
                                {_about.substr(0, 59) || "nothing to say"}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.statsView}>
                        <TouchableOpacity style={styles.statNumView}>
                            <Text style={styles.txtStatsVal}>
                                123
                            </Text>
                            <Text style={styles.txtStatsName}>
                                Posts
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.statNumView}>
                            <Text style={styles.txtStatsVal}>
                                160
                            </Text>
                            <Text style={styles.txtStatsName}>
                                Following
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.statNumView}>
                            <Text style={styles.txtStatsVal}>
                                2.1M
                            </Text>
                            <Text style={styles.txtStatsName}>
                                Followers
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnFollow}

                        onPress={() => {
                            // console.log(id)
                            let senderName = this.props.user.fname + " " + this.props.user.lname;
                            let payload = {
                                to: _id,
                                from: this.props.user?._id,
                                description: `wants to be your friend`,
                                type: 'follow'
                            }


                            if (isFriend == false && isReqSent == false) {
                                socket.emit('notification',
                                    {
                                        payload,
                                        senderName: senderName
                                    }

                                );

                                // this.props.getSingleUser(this.props.token, this.props.route.params.id)
                            }

                        }}
                    >
                        <Text style={styles.txtFollow}>{btnText}</Text>
                        {
                            this.props.singleUser.isLoading ?
                                <ActivityIndicator size={20} color='#FFF' />
                                :
                                <View />
                        }

                    </TouchableOpacity>
                    {/* <Animated.View style={{
                        height: heightToDp(40),
                        width: widthToDp(100),
                        backgroundColor: '#FFF',
                        position: 'absolute',
                        borderRadius: 10,
                        left: 0,
                        top: 0,
                        elevation: 100,
                        opacity: this.blur
                    }} /> */}

                </View>
            </>
        )
    }


    componentDidMount() {
        this.props.getSingleUser(this.props.token, this.props.route.params.id);
        this.setState({ user: this.props.singleUser });
    }

    render() {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]


        return (

            <View style={styles.container}>

                {
                    this.props?.singleUser?.user?.isFriend ?
                        <Animated.FlatList
                            ListHeaderComponent=
                            {
                                this.RnderHeader
                            }
                            data={arr}
                            keyExtractor={(item) => item}
                            // showsVerticalScrollIndicator={false}
                            numColumns={2}
                            scrollEventThrottle={32}
                            contentContainerStyle={{
                                // justifyContent: 'center',
                                // padding: 5,
                                paddingBottom: 120

                            }}
                            // pagingEnabled
                            onScroll={
                                Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                                    { useNativeDriver: false }
                                )
                                // (e) =>{
                                //     console.log( e.nativeEvent.contentOffset.y)
                                // }
                            }
                            renderItem={
                                ({ item, index }) => {


                                    return (
                                        <View key={index} style={styles.imgPostView}>
                                            <Image style={styles.imgPostStyle}
                                                source={require('../../assets/p6.jpg')} />
                                        </View>
                                    );
                                }
                            }
                        />
                        :
                        <>
                            <this.RnderHeader />
                            <View style={styles.notFriendView}>
                                <View style={styles.lockIconView}>
                                    <EvilIcons size={60} name='lock' color='#000' />
                                </View>
                                <Text style={styles.txtLockIcon}>
                                    Follow Sami Shah to see his photos and videos.
                                </Text>
                            </View>
                        </>
                }
            </View>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(User);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F5',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    Header: {
        height: heightToDp(45),
        width: widthToDp(100),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,

    },
    infoView: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageView: {
        backgroundColor: '#FFF',
        elevation: 5,
        width: 130,
        height: 130,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: 120,
        height: 120,
        borderRadius: 100
    },


    aboutView: {
        width: '60%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },

    txtName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    txtUserName: {
        fontSize: 16,
        color: '#4E4E4E',
    },
    txtDesc: {
        fontSize: 14,
        color: '#4E4E4E',
        marginTop: 5
    },
    statsView: {
        backgroundColor: '#FFF',
        height: '27%',
        width: '85%',
        elevation: 5,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    statNumView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    txtStatsVal: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    txtStatsName: {
        color: '#7A8FA6'
    },
    postContainer: {
        marginTop: 20,
        width: widthToDp(100),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 5
    },
    imgPostView: {
        width: widthToDp(45),
        height: widthToDp(45),
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,

        elevation: 2
    },
    imgPostStyle: {
        width: widthToDp(45),
        height: widthToDp(45),
        resizeMode: 'contain'
    },
    notFriendView: {
        justifyContent: 'flex-start',
        paddingTop: 50,
        alignItems: 'center',
        flex: 1
    },

    lockIconView: {
        width: widthToDp(30),
        height: widthToDp(30),
        borderRadius: widthToDp(40),
        borderWidth: 3,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    txtLockIcon: {
        color: '#4E4E4E',
    },
    btnFollow: {
        flexDirection: 'row',
        marginTop: 10,
        // marginBottom:5,
        width: widthToDp(85),
        height: heightToDp(6),
        borderRadius: widthToDp(2),
        backgroundColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    txtFollow: {
        marginRight: 5,
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

