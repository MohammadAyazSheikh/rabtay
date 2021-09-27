import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackGroundColor } from "../utilities/colors";
import { heightToDp, widthToDp } from "../utilities/responsiveUtils";
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
            </View>
        )
    }
}

export default Message;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        alignItems: 'center',
        paddingTop: 10,

    },
    searchBarView: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5,
        alignItems:'center',
        backgroundColor: '#c4e4f0',
        width: '90%',
        height:heightToDp(7),
        borderRadius:10
    },
    txtInput:{
        // backgroundColor:'grey',
        borderRadius:10,
        width:'90%',
        textAlign:'left',
        fontSize:16,
        color:BackGroundColor
    }
})