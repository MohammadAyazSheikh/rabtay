import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { widthToDp } from '../utilities/responsiveUtils';
import Icon from 'react-native-vector-icons/AntDesign';
import { socket } from '../lib/socket';

const More = ({ isOpen, close, Logout }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <Pressable style={styles.centeredView}
                onPress={close}
            >
                <View style={styles.modalMoreView}>
                    <Pressable
                        style={[styles.subBtnMore, { borderBottomColor: '#FFF', borderBottomWidth: 0.3 }]}
                    >
                        <Text style={styles.txtMore}>Settings</Text>
                        <Icon name='setting' size={25} color='#FFF' />
                    </Pressable>
                    <Pressable
                        style={styles.subBtnMore}
                        onPress={() => {
                            Logout();
                            socket.disconnect();
                        }}
                    >
                        <Text style={styles.txtMore}>Logout</Text>
                        <Icon name='logout' size={25} color='#FFF' />
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
}

export default More;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalMoreView: {
        backgroundColor: BackGroundColor,
        width: widthToDp(40),
        height: widthToDp(25),
        borderRadius: 20,
        opacity: 0.9,
        position: 'absolute',
        top: '8%',
        right: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subBtnMore: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    txtMore: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});