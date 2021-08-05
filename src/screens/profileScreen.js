import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, imagep } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { UploadDP } from '../redux/actions/dpUploadActions';
import { connect } from 'react-redux';
import { utils } from '@react-native-firebase/app';



const mapStateToProps = state => {
    return {
        user: state.user.user,
        dp: state.dpUpload
    }
}

// const mapDispatchToProps = dispatch => (
//     {
//         UploadDp: (url, uid) => (dispatch(UploadDP(url, uid)))
//     }
// )


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

        this.state = {
            imageUri: null,
            cloudUrl: null
        }

        // this.selectPicture = this.selectPicture.bind(this)
    }

    // componentDidUpdate() {
    //     console.log("****DP***", this.props.dp)
    //     console.log("****Props***", this.props)
    // }

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

                const reference = storage().ref(`users/${this.props.user.id}/images/test.jpg`);

                console.log('Uploading...!');

                let task = reference.putFile(this.state.imageUri);

                task.then(async () => {
                    console.log('Image uploaded to the bucket!');

                    const urlCloud = await storage().ref(`users/${this.props.user.id}/images/test.jpg`).getDownloadURL();
                    this.props.UploadDp(urlCloud, this.props.user.id);
                    this.setState({ cloudUrl: urlCloud })
                }).catch((e) => {
                    status = 'Something went wrong';
                    console.log('uploading image error => ', e);
                    this.setState({ isLoading: false, status: 'Something went wrong' });
                });

                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });



            }
        });
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
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
                </View>



                <View style={styles.postContainer}>
                    <View style={styles.imgPostView}>
                        <Image style={styles.imgPostStyle}
                            source={require('../../assets/p6.jpg')} />
                    </View>
                    <View style={styles.imgPostView}>
                        <Image style={styles.imgPostStyle}
                            source={require('../../assets/p2.jpeg')} />
                    </View>
                    <View style={styles.imgPostView}>
                        <Image style={styles.imgPostStyle}
                            source={require('../../assets/p5.jpg')} />
                    </View>
                    <View style={styles.imgPostView}>
                        <Image style={styles.imgPostStyle}
                            source={require('../../assets/p4.jpg')} />
                    </View>
                    <View style={styles.imgPostView}>
                        <Image style={styles.imgPostStyle}
                            source={require('../../assets/p3.jpg')} />
                    </View>
                </View>


            </ScrollView>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor: '#F0F1F5',
        paddingBottom: 130
    },
    Header: {
        height: heightToDp(40),
        width: widthToDp(100),
        flex: 2,
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
    }
})

