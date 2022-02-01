import React, {
    Component,
    createRef
} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    TouchableOpacity, Image,
    PermissionsAndroid, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import {
    TwilioVideoLocalView, // to get local view 
    TwilioVideoParticipantView, //to get participant view
    TwilioVideo
} from 'react-native-twilio-video-webrtc';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
// make sure you install vector icons and its dependencies
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const mapStateToProps = state => {
    return {
        user: state?.user?.user?.user,
        token: state?.user?.user?.token,
        videoCallToken: state?.videoCallToken.videoCallToken,
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        // getVideoChatToken: (token, username) => {
        //     dispatch(GetVideoChatToken(token, username));
        // },
    }
};


export async function GetAllPermissions() {
    // it will ask the permission for user 
    try {
        // if (Platform.OS === "android") {
        const userResponse = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);
        return userResponse;
        // }
    } catch (err) {
        console.log(err);
    }
    return null;
}
class VideoCall extends Component {

    constructor(props) {
        super(props);
        this.twilioVideo = createRef();
        this.circleAnim = createRef();
        this.state = {
            isAudioEnabled: true,
            isVideoEnabled: true,
            isButtonDisplay: true,
            status: 'disconnected',
            isUserConnect: false,
            participants: new Map(),
            videoTracks: new Map(),
            isLoading: true,
        }
    }



    componentDidMount() {
        // on start we are asking the permisions
        GetAllPermissions();
        // this.circleAnim?.current?.play();
        // this.circleAnim?.current?.play(1, 320);
        console.log(`call screen =  ${JSON.stringify(this.props.videoCallToken)}`);
        console.log(`\n\n ${this.props.route.params.roomName}\n\n`);


        setTimeout(() => {
            this._onConnectButtonPress();
            this.setState({ isLoading: false });
        }, 1000);
    }
    _onConnectButtonPress = () => {
        console.log("in on connect button preess");
        this.twilioVideo.current.connect({ roomName: this.props.route.params.roomName, accessToken: this.props.videoCallToken })
        this.setState({ status: 'connecting' })
        console.log(this.state.status);

    }
    _onEndButtonPress = () => {
        this.twilioVideo.current.disconnect();
        this.props.navigation.navigate('Home');
    }
    _onMuteButtonPress = () => {
        // on cliking the mic button we are setting it to mute or viceversa
        this.twilioVideo.current.setLocalAudioEnabled(!this.state.isAudioEnabled)
            .then(isEnabled => this.setState({ isAudioEnabled: isEnabled }))
    }
    _onFlipButtonPress = () => {
        // switches between fronst camera and Rare camera
        this.twilioVideo.current.flipCamera()
    }
    _onRoomDidConnect = () => {
        console.log("room did connected");
        this.setState({ status: 'connected' })
        // console.log("over");
    }
    _onRoomDidDisconnect = ({ roomName, error }) => {
        console.log("ERROR: ", JSON.stringify(error))
        console.log("disconnected")

        this.setState({ status: 'disconnected' });
        this.props.navigation.navigate('Home');
    }
    _onRoomDidFailToConnect = (error) => {
        alert(JSON.stringify(error));
        console.log("ERROR: ", JSON.stringify(error));
        console.log("failed to connect");
        this.setState({ status: 'disconnected' });
        this.props.navigation.navigate('Home');
    }
    _onParticipantAddedVideoTrack = ({ participant, track }) => {
        // call everytime a participant joins the same room
        this.setState({ isUserConnect: true });
        console.log("onParticipantAddedVideoTrack: ", participant, track)
        this.setState({
            videoTracks: new Map([
                ...this.state.videoTracks,
                [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
            ]),
        });

        console.log("this.state.videoTracks", this.state.videoTracks);
    }
    _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        // gets called when a participant disconnects.
        this.setState({ isUserConnect: false });
        console.log("onParticipantRemovedVideoTrack: ", participant, track)
        const videoTracks = this.state.videoTracks
        videoTracks.delete(track.trackSid)
        this.setState({ videoTracks: { ...videoTracks } });
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View style={styles.container} >

                {

                    !(this.state.status === 'connected' || this.state.status === 'connecting') ?
                        <ActivityIndicator size={70} color={BackGroundColor} />
                        :
                        <View style={styles.callContainer}>

                            {
                                !this.state.status === 'connected' ?
                                    <ActivityIndicator size={70} color={BackGroundColor} />
                                    :
                                    <View style={styles.remoteGrid}>
                                        <TouchableOpacity style={styles.remoteVideo} onPress={() => { this.setState({ isButtonDisplay: !this.state.isButtonDisplay }) }} >
                                            {
                                                Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                                                    return (
                                                        <TwilioVideoParticipantView
                                                            style={styles.remoteVideo}
                                                            key={trackSid}
                                                            trackIdentifier={trackIdentifier}
                                                        />
                                                    )
                                                })
                                            }
                                        </TouchableOpacity>

                                        <TwilioVideoLocalView
                                            enabled={true}
                                            style={this.state.isButtonDisplay ? styles.localVideoOnButtonEnabled : styles.localVideoOnButtonDisabled}
                                        />

                                    </View>
                            }
                            <View
                                style={{
                                    display: this.state.isButtonDisplay ? "flex" : "none",
                                    position: "absolute",
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    height: 100,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    zIndex: this.state.isButtonDisplay ? 2 : 0,
                                }} >
                                <TouchableOpacity
                                    style={styles.BtnStyle}
                                    onPress={this._onMuteButtonPress}>
                                    < MIcon name={this.state.isAudioEnabled ? "mic" : "mic-off"} size={24} color='#fff' />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.BtnStyle, { backgroundColor: '#F15946' }]}
                                    onPress={() => {
                                        this._onEndButtonPress();
                                    }}>
                                    {/* <Text style={{fontSize: 12}}>End</Text> */}
                                    < MIcon name="call-end" size={28} color='#fff' />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.BtnStyle}
                                    onPress={this._onFlipButtonPress}>
                                    {/* <Text style={{fontSize: 12}}>Flip</Text> */}
                                    < MCIcon name="rotate-3d" size={28} color='#fff' />
                                </TouchableOpacity>
                            </View>

                        </View>
                }
                <TwilioVideo
                    ref={this.twilioVideo}
                    onRoomDidConnect={this._onRoomDidConnect}
                    onRoomDidDisconnect={this._onRoomDidDisconnect}
                    onRoomDidFailToConnect={this._onRoomDidFailToConnect}
                    onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
                    onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCall);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    callContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        minHeight: "100%"
    },

    localVideoOnButtonEnabled: {
        bottom: ("40%"),
        width: "35%",
        left: "64%",
        height: "25%",
        zIndex: 2,
    },
    localVideoOnButtonDisabled: {
        bottom: ("30%"),
        width: "35%",
        left: "64%",
        height: "25%",
        zIndex: 2,
    },
    remoteGrid: {
        flex: 1,
        flexDirection: "column",
    },
    remoteVideo: {
        width: wp("100%"),
        height: hp("100%"),
        zIndex: 1,
    },


    profileImageView: {
        width: widthToDp(42),
        height: widthToDp(42),
        borderRadius: widthToDp(21),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '30%',
        left: '30%'
    },
    animationStyles: {
        transform: [{ scale: 1.65 }]
    },
    profileImageStyle: {
        width: '90%',
        height: '90%',
        borderRadius: widthToDp(21),
        borderColor: BackGroundColor,
        borderWidth: 1
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        ...StyleSheet.absoluteFill
    },

    BtnStyle: {
        width: widthToDp(18),
        height: widthToDp(18),
        borderRadius: widthToDp(22),
        backgroundColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    }

});