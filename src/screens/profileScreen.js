import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import * as ImagePicker from 'react-native-image-picker';
import { UploadDP } from '../redux/actions/dpUploadActions';
import { Logout } from '../redux/actions/logoutActions';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import { post } from '../utilities/data';
import IconFeather from 'react-native-vector-icons/Feather';
import More from '../components/profileMoreModalComponent';
import PopUpPic from '../components/profileImagePopupModal';
import { baseUrl } from '../utilities/config';



var data = post.concat(post);



const mapStateToProps = state => {
    return {
        user: state?.user?.user?.user,
        token: state?.user?.user?.token,
        dp: state?.dpUpload
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        UploadDp: (url, uid) => {
            dispatch(UploadDP(url, uid));
        },
        Logout: () => {
            dispatch(Logout());
        }
    }
};




class Profile extends Component {
    constructor(props) {
        super(props);
        this.scrollY = new Animated.Value(0);
        const inputRange = [

            0,
            300
        ]

        this.blur = this.scrollY.interpolate(
            {
                inputRange,
                outputRange: [0, 0.5],
            },
        )

        this.state = {
            imageUri: null,
            cloudUrl: null,
            isOpen: false,
            popUpImage: null,
            isMorePanelOpen: false
        } 
    }

    componentDidMount() {
        // this.socket = io(baseUrl);
        // this.socket.emit('active', { userId: this.props.user._id })
    }


    selectPicture = () => {
        let options = {
            // title: 'Select Image',
            // customButtons: [
            //     {
            //         name: 'customOptionKey',
            //         title: 'Choose file from Custom Option'
            //     },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
        };

        ImagePicker.launchImageLibrary(options, async res => {
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
                // alert(this.state.uri)

                console.log('Uploading...!');
                this.props.UploadDp(source.assets[0].uri, this.props.token);

            }
        });
    };



    render() {
        return (
            <View style={styles.container}>
                <Animated.FlatList
                    ListHeaderComponent=
                    {
                        <>
                            <View style={styles.Header}>

                                <View style={styles.infoView}>
                                    <View style={styles.imageView}>
                                        {
                                            !this.props.user?.profileImage?.path == '' ?
                                                <Image
                                                    source={{ uri: baseUrl + this.props.user.profileImage.path }}
                                                    style={styles.imgStyle}
                                                />

                                                :
                                                <Image
                                                    source={require('../../assets/profile.jpg')}
                                                    style={styles.imgStyle}
                                                />
                                        }

                                        <View style={styles.btnImgView}>
                                            <TouchableOpacity style={{
                                                width: '100%', height: '100%', paddingLeft: 5, paddingRight: 5,
                                                justifyContent: "center", alignItems: 'center',
                                            }}
                                                onPress={
                                                    this.selectPicture
                                                }
                                            >
                                                <Text style={styles.btnTxtImg}>
                                                    Change Picture
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.aboutView}>

                                        <View style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={styles.txtName}  > {`${this.props.user?.fname} ${this.props.user?.lname}`}</Text>
                                            <TouchableOpacity style={styles.btnMoreStyle}
                                                onPress={() => { this.setState({ isMorePanelOpen: true }) }}
                                            >
                                                <IconFeather size={25} color={BackGroundColor} name='more-vertical' />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.txtUserName}>{this.props.user?.username}</Text>
                                        <Text style={styles.txtDesc}>
                                            {
                                                this.props.user?.about ||
                                                ' In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate' +
                                                'the visual form of a document.'
                                            }
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
                                {/* <Animated.View style={{
                                    height: heightToDp(40),
                                    width: widthToDp(100),
                                    backgroundColor: '#000',
                                    position: 'absolute',
                                    borderRadius: 10,
                                    left: 0,
                                    top: 0,
                                    elevation: 100,
                                    opacity: this.blur,
                                    // backgroundColor: `rgba(0,0,0, ${this.blur})`
                                }} /> */}
                            </View>
                        </>
                    }
                    data={data}
                    keyExtractor={(item) => uuid.v4()}
                    // showsVerticalScrollIndicator={false}
                    numColumns={2}
                    scrollEventThrottle={32}
                    contentContainerStyle={{
                        paddingBottom: 120,
                        alignItems: 'center',
                    }}
                    // pagingEnabled
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                            { useNativeDriver: true }
                        )
                        // (e) =>{
                        //     console.log( e.nativeEvent.contentOffset.y)
                        // }
                    }
                    renderItem={
                        ({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onLongPress={() => {
                                        this.setState({ popUpImage: item.img })
                                        this.setState({ isOpen: true })
                                    }}
                                    style={styles.imgPostView}>
                                    <Image style={styles.imgPostStyle}
                                        source={item.img} />
                                </TouchableOpacity>
                            );
                        }
                    }
                />

                <PopUpPic
                    isOpen={this.state.isOpen}
                    close={() => { this.setState({ isOpen: false }) }}
                    image={this.state.popUpImage}
                />
                <More
                    isOpen={this.state.isMorePanelOpen}
                    close={() => { this.setState({ isMorePanelOpen: false }) }}
                    Logout={() => { this.props.Logout() }}
                />
            </View>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F5',
        justifyContent: 'center',
        alignItems: 'center'
        // paddingBottom: 120
    },
    Header: {
        height: heightToDp(40),
        width: widthToDp(100),

        justifyContent: 'center',
        alignItems: 'center'
    },
    infoView: {
        height: '65%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    btnImgView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackGroundColor,
        width: 100,
        height: 30,
        borderRadius: 12,
        position: 'absolute',
        bottom: -15,
        elevation: 5,
    },
    btnTxtImg: {
        color: '#FFF',
        fontSize: 13
    },

    aboutView: {
        width: '60%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
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
        height: '30%',
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
    btnMoreStyle: {
        padding: 2,
        borderRadius: 20,
    },

})

