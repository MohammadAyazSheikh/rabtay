import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { BackGroundColor } from '../utilities/colors';
import { widthToDp, hieghtToDp, heightToDp } from '../utilities/responsiveUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let desc = 'start dummuy text dummuy text dummuy text dummuy text dummuy  dummuy texttext dummuy text dummuy text dummuy text dummuy text dummuy text'
        return (
            <View style={styles.postView}>
                <TouchableOpacity style={styles.postHeaderView}>
                    <View style={styles.imgProfView}>
                        <Image
                            source={require('../../assets/profile.jpg')}
                            style={styles.imgStyle}
                        />
                    </View>
                    <View style={styles.aboutView}>
                        <Text style={styles.txtName}> {this.props.uName} </Text>
                        <Text style={styles.txtTime}> {this.props.time} </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.postContent}>
                    <View style={styles.postDescView}>
                        {

                            this.props.description.length > 100 ?
                                <Text style={styles.txtDesc}>
                                    {
                                        this.props.description.substr(0, 99)
                                    }
                                    <View >
                                        <TouchableOpacity style={{ marginBottom: -4, }}>
                                            <Text style={{ ...styles.txtDesc, color: 'grey' }}> read more... </Text>
                                        </TouchableOpacity>
                                    </View>

                                </Text> :
                                <Text style={styles.txtDesc}> {this.props.description}</Text>
                        }
                    </View>
                    <View style={styles.postMedia}>

                        {
                            this.props.videoUrl ?
                                < Video
                                    resizeMode={'contain'}
                                    // onFullScreen={true}
                                    source={{ uri: this.props.videoUrl }}
                                    style={styles.mediaPlayer}
                                    volume={10}
                                    controls
                                    paused = {true}
                                />

                                :
                                <Image
                                    source={this.props.image}
                                    style={styles.imgPost}
                                />
                        }

                    </View>
                    <View style={styles.postReactions}>
                        <View style={styles.reactionSingleView}>
                            <TouchableOpacity>
                                <AntDesign name='heart' size={25} color='#7A8FA6' />
                            </TouchableOpacity>
                            <Text style={styles.txtReactions}>323</Text>
                        </View>
                        <View style={styles.reactionSingleView}>
                            <TouchableOpacity>
                                <FontAwesome5 name='comment' size={25} color='#7A8FA6' />
                            </TouchableOpacity>
                            <Text style={styles.txtReactions}>43</Text>
                        </View>
                        <View style={styles.reactionSingleView}>
                            <TouchableOpacity>
                                <FontAwesome5 name='share' size={25} color='#7A8FA6' />
                            </TouchableOpacity>
                            <Text style={styles.txtReactions}>87</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default Post;

const styles = StyleSheet.create({

    postView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: widthToDp(100),
        // height: heightToDp(45),
        // padding: widthToDp(3),
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginBottom: 5
    },
    postHeaderView: {
        backgroundColor: '#FFF',
        width: '100%',
        height: heightToDp(11),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    imgProfView: {
        backgroundColor: BackGroundColor,
        width: widthToDp(20),
        height: widthToDp(20),
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imgStyle: {
        width: widthToDp(19),
        height: widthToDp(19),
        borderRadius: 100,
    },
    aboutView: {
        marginLeft: 5
    },
    txtName: {
        fontSize: 20,
        color: '#000'
    },
    txtTime: {
        fontSize: 12,
        color: '#4E4E4E'
    },
    postContent: {
        backgroundColor: '#FFF',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    postDescView: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtDesc: {
        fontSize: 13
    },
    postMedia: {
        backgroundColor: '#F0F1F5',
        width: '100%',
        height: widthToDp(100),
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imgPost: {
        width: '100%',
        height: widthToDp(100),
        resizeMode: 'contain'
    },
    postReactions: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-evenly',
    },
    reactionSingleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtReactions: {
        fontSize: 13,
        marginLeft: 5,
        color: '#7A8FA6'
    },

    mediaPlayer: {
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // bottom: 0,
            // right: 0,
            // backgroundColor: 'black',
            // justifyContent: 'center',
            // flex:1,
            width:'100%',
            height:'100%',
           
            // resizeMode:'cover'
          },

})