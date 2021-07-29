import { symlink } from 'fs';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                            {/* <View style = {styles.decView}> */}
                            <Text style = {styles.txtDesc}>
                                falana dhimkana aur kuch nahi baus aise hi farigh admi
                                falana dhimkana aur kuch nhi
                            </Text>
                            {/* </View> */}
                        </View>
                    </View>
                    <View style={styles.statsView}>

                    </View>

                </View>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F0F1F5'
    },
    Header: {
        height: '40%',
        width: '100%',
        // backgroundColor: 'grey',
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
        paddingLeft:10
    },

    txtName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    txtUserName: {
        fontSize: 16,
        color:'#4E4E4E',
    },
    txtDesc:{
        fontSize: 14,
        color:'#4E4E4E',
        marginTop:5
    },
    statsView: {
        backgroundColor: 'red',
        height: '35%',
        width: '100%',
    }
})
