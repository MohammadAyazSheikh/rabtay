import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Image, TouchableOpacity, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { BackGroundColor } from "../utilities/colors";
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';


const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}



class CreateMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUri: null
        };
    }




    selectPicture = () => {
        let options = {
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
            }
        });
    };




    render() {
        const { uName, contactId, chatId, initializeChat } = this.props.route.params;
        return (
            <View style={styles.container} >
                <View style={styles.HeaderView}>
                    <TouchableOpacity style={styles.btnSearch}
                        onPress={() => { this.props.navigation.navigate('Home') }}    >
                        <Ionicons name='arrow-back' size={40} style={styles.iconSyle} />
                    </TouchableOpacity>
                    <Text style={styles.txtHeader}>Create New Message</Text>
                    <TouchableOpacity style={styles.btnPost}
                        onPress={() => { this.props.navigation.navigate('Home') }}    >
                        <Text style={styles.txtBtnPost}>Send</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>


                    <View style={styles.bodyView}>
                        <View style={styles.bodyHeader}>
                            <Image style={styles.imgStyle} source={require('../../assets/p5.jpg')} />
                            <Text style={styles.txtName}>{uName}</Text>
                        </View>
                        <TextInput style={styles.txtInput}
                            placeholder='Say it all..!'
                            placeholderTextColor='grey'
                            multiline
                        />
                    </View>
                    {
                        this.state.imageUri ?
                            <View style={styles.imgPostStyleView}>
                                <Image source={{ uri: this.state.imageUri }} style={styles.imgPostSyle} />
                                <TouchableOpacity style={styles.btnDltImage}
                                    onPress={() => { this.setState({ imageUri: null }) }}
                                >
                                    <Entypo name='cross' size={25} color='#FFF' />
                                </TouchableOpacity>
                            </View> :
                            <View />
                    }

                </ScrollView>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.btnBottom}
                        onPress={this.selectPicture.bind(this)}
                    >
                        <Image source={require('../../assets/images/gallery5.png')} style={styles.imgBtnBottom} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnBottom} >
                        <Image source={require('../../assets/images/map1.png')} style={styles.imgBtnBottom} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnBottom} >
                        <Image source={require('../../assets/images/smile2.png')} style={styles.imgBtnBottom} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, null)(CreateMessage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 10
    },
    HeaderView: {
        backgroundColor: BackGroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    btnSearch: {
        padding: 2,
    },
    btnPost: {
        backgroundColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        elevation: 10,
        borderRadius: 10
    },
    txtBtnPost: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BackGroundColor
    },
    iconSyle: {
        textShadowColor: 'grey',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 0,
            height: 1
        }
    },
    txtHeader: {
        color: '#FFF',
        fontSize: 23,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 0,
            height: 0.5
        }
    },
    bodyView: {
        // backgroundColor: 'green',
        width: widthToDp(100),
        alignItems: 'center',
        marginTop: 10
    },
    bodyHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imgStyle: {
        width: widthToDp(18),
        height: widthToDp(18),
        borderRadius: widthToDp(20) / 2,
        borderColor: BackGroundColor,
        borderWidth: 1,
        resizeMode: 'cover',
        marginHorizontal: 10
    },
    txtName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    txtInput: {
        width: '100%',
        // backgroundColor:'red',
        fontSize: 20,
        paddingHorizontal: 10,
        color: '#000'
    },
    bottomView: {
        width: widthToDp(100),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnBottom: {
        marginHorizontal: 15
    },
    imgBtnBottom: {
        width: widthToDp(10),
        height: widthToDp(10),
        resizeMode: 'contain'
    },
    imgPostStyleView: {
        width: widthToDp(100),
        height: widthToDp(100),
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgPostSyle: {
        margin: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    btnDltImage: {
        position: 'absolute',
        right: 10,
        top: 10,
        borderRadius: 25,
        padding: 3,
        backgroundColor: 'black',
        opacity: 0.7,

    }
})