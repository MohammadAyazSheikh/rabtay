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
import IconFeather from 'react-native-vector-icons/Feather';
import More from '../components/profileMoreModalComponent';

const PopUpPic = ({ isOpen, close, image }) => {
    // const [modalVisible, setModalVisible] = useState(false);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        // onRequestClose={() => {
        //     Alert.alert("Modal has been closed.");
        //     setModalVisible(!modalVisible);
        // }}
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
export default PopUpPic;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
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
    },
});