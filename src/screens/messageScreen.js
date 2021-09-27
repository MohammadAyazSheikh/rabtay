import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image ,FlatList} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackGroundColor } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";

const RenderMessages = () => {

    return (
        <TouchableOpacity style={styles.messageView}>
            <View style={styles.imageView}>
                <Image source={require('../../assets/p4.jpg')} style={styles.imageStyle} />
            </View>
            <View style={styles.chatView}>
                <View style={styles.headerView}>
                    <Text style={styles.txtName}>Sami Hussain</Text>
                    <Text style={styles.txtTime}>just now</Text>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.txtMessage}>aur bhai kahan ghaib hai?</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

class Message extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.searchBarView}>
                    <Icon name='search' size={widthToDp(10)} color = {'#5e748d'} />
                    <TextInput style={styles.txtInput} placeholder='Search' placeholderTextColor = '#5e748d' />
                </View> */}
                <RenderMessages />
            </View>
        )
    }
}

export default Message;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,

    },
    searchBarView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#c4e4f0',
        width: '90%',
        height: heightToDp(7),
        borderRadius: 10
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
        elevation: 5

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
    }

})