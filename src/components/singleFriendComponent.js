import React, { Component } from "react";
import {
    Text, View, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { BackGroundColor } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";
import { baseUrl } from '../utilities/config';
import { connect } from 'react-redux';
import { GetContacts } from "../redux/actions/getContactsActions";



// const RenderFriends = ({ isActive, uName, time, image, _contacts }) => {


class RenderFriends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isActive, uName, time, image, _contacts } = this.props;
        return (
            <TouchableOpacity style={styles.messageView}>
                <View style={styles.imageView}>
                    {image ?
                        <Image source={{ uri: baseUrl + image }} style={styles.imageStyle} />
                        :
                        <Image source={require('../../assets/images/profile3.jpeg')} style={styles.imageStyle} />
                    }
                    {isActive ?
                        <View style={styles.activeStyles} /> : <View />
                    }
                </View>
                <View style={styles.chatView}>
                    <View style={styles.headerView}>
                        <Text style={styles.txtName}>{uName}</Text>
                        {
                            isActive ?
                                <Text style={styles.txtTime}>active now</Text>
                                :
                                <Text style={styles.txtTime}>{time}</Text>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}







export default RenderFriends;

const styles = StyleSheet.create({


    messageView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '100%',
        height: heightToDp(14),
        elevation: 5,
        marginVertical: 5
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
    activeStyles: {
        width: 15,
        height: 15,
        borderRadius: 8,
        backgroundColor: 'lightgreen',
        position: 'absolute',
        bottom: 5,
        right: 15,
        elevation: 5,
    },
    chatView: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 5,
        justifyContent: 'center',
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
    }
})