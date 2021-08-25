import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { color } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { BackGroundColor } from '../utilities/colors';
import { heightToDp, widthToDp } from '../utilities/responsiveUtils';




const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}



class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {


        return (
            <View style={styles.container}>
                <View style={styles.NotificationView}>
                    <View style={styles.infoView}>
                        <View style={styles.imageView}>
                            <Image source={require('../../assets/p5.jpg')} style={styles.imageStyle} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.txtName}>Ali Rehman
                                <Text style={styles.txtDesc}> sends you follow request</Text>
                            </Text>
                            <Text style={styles.txtTime}>2 hourse ago</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, null)(Notification);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NotificationView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',

        elevation: 10,
        width: widthToDp(100),
        height: heightToDp(14),
    },

    infoView: {
        width: '100%',
        height: '100%',
        backgroundColor:'#FFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
    },
    imageView: {
        width: widthToDp(26),
        height: widthToDp(26),
        borderRadius: widthToDp(25),
        borderWidth: 2,
        borderColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackGroundColor
    },
    imageStyle: {
        width: widthToDp(25),
        height: widthToDp(25),
        borderRadius: widthToDp(25),
        resizeMode: 'cover'
    },
    textView: {
        paddingLeft: 10,
        flex: 1,
    },
    txtName: {
        fontSize: 15,
        fontWeight: 'bold',
        color:'#000'
    },
    txtDesc: {
        fontSize: 14,
        fontWeight: 'normal'
    },
    txtTime:{
        color:'grey'
    }

})