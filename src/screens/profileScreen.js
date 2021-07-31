import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.Header}>
                    <View style={styles.infoView}>
                        <View style={styles.imageView}>
                            <Image
                                source={require('../../assets/profile.jpg')}
                                style={styles.imgStyle}
                            />
                            <View style={styles.btnImgView}>
                                <TouchableOpacity style={{
                                    width: '100%', height: '100%', paddingLeft: 5, paddingRight: 5,
                                    justifyContent: "center", alignItems: 'center',
                                }}>
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

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor: '#F0F1F5',
        paddingBottom:130
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
        padding:5
    },
    imgPostView: {
        width: widthToDp(45),
        height: widthToDp(45),
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        elevation:2
    },
    imgPostStyle: {
        width: widthToDp(45),
        height: widthToDp(45),
        resizeMode: 'contain'
    }
})

