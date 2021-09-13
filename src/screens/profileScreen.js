import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Modal, Pressable } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { UploadDP } from '../redux/actions/dpUploadActions';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import { post } from '../utilities/data';
import Icon from 'react-native-vector-icons/AntDesign';

var data = post.concat(post);
// import { utils } from '@react-native-firebase/app';


const PopUpPic = ({ isOpen, close, image }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: '#000', position: 'absolute', opacity: 0.8 }
            ]} />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={image} style={styles.modaleImg} />
                    <Pressable
                        style={{ padding: 3, borderRadius: 20, backgroundColor: '#FFF', position: 'absolute', left: 20, top: 20 }}
                        onPress={() => close()}
                    >
                        <Icon name='closecircle' size={25} color={BackGroundColor} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}


const mapStateToProps = state => {
    return {
        user: state.user.user,
        dp: state.dpUpload
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        UploadDp: (url, uid) => {
            dispatch(UploadDP(url, uid));
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
        }
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

                let imgID = uuid.v4();
                const reference = storage().ref(`users/${this.props.user.id}/images/${imgID}.jpg`);

                console.log('Uploading...!');

                let task = reference.putFile(this.state.imageUri);

                task.then(async () => {
                    console.log('Image uploaded to the bucket!');

                    const urlCloud = await storage().ref(`users/${this.props.user.id}/images/${imgID}.jpg`).getDownloadURL();
                    this.props.UploadDp(urlCloud, this.props.user.id);
                    this.setState({ cloudUrl: urlCloud })
                }).catch((e) => {
                    console.log('uploading image error => ', e);
                });

                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });



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
                                            this.props.user.dpUrl ?
                                                <Image
                                                    source={{ uri: this.props.user.dpUrl }}
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
                                        <Text style={styles.txtName}  > Ayaz Sheikh</Text>
                                        <Text style={styles.txtUserName}>@AyazSheikh101</Text>
                                        <Text style={styles.txtDesc}>
                                            falana dhimkana aur kuch nahi baus aise hi farigh admi
                                            falana dhimkana aur kuch nhi
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
                                <Animated.View style={{
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
                                }} />
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
                {/* <View style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: '#000', position: 'absolute', opacity: this.state.isOpen ? 0.8 : 0 }
                ]} /> */}
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


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        // margin: 20,
        // width:'95%',
        // height:'55%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    modaleImg: {
        width: widthToDp(90),
        height: heightToDp(60),
        borderRadius: 10,
        resizeMode: 'cover',
        backgroundColor: 'red',
    }

})

