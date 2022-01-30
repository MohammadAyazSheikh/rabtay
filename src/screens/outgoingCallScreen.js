import React, {
    Component,
    createRef
} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity, Image,
    PermissionsAndroid, TouchableHighlight
} from 'react-native';
import LottieView from 'lottie-react-native';
import {
    TwilioVideoLocalView, // to get local view 
    TwilioVideoParticipantView, //to get participant view
    TwilioVideo
} from 'react-native-twilio-video-webrtc';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
// make sure you install vector icons and its dependencies
import MIcon from 'react-native-vector-icons/MaterialIcons';
import normalize from 'react-native-normalize';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
export default class Example extends Component {



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
            roomName: 'test',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzg1NmMxMzcwYWZjMzg1NzZhOWE2NmZmNDZiYjAwOTMxLTE2NDM1MzExNTciLCJncmFudHMiOnsiaWRlbnRpdHkiOiJheWF6IiwidmlkZW8iOnt9fSwiaWF0IjoxNjQzNTMxMTU3LCJleHAiOjE2NDM1MzQ3NTcsImlzcyI6IlNLODU2YzEzNzBhZmMzODU3NmE5YTY2ZmY0NmJiMDA5MzEiLCJzdWIiOiJBQ2NmYzE0MTczMWNkMjBkOTQyNzIzYTc2ZWQ1NWFiZWU2In0.SXdAiVoeVFL76cOfYtikDDhTn5JM9776MSXH4bzWQCs',
        }
    }



    componentDidMount() {
        // on start we are asking the permisions
        GetAllPermissions();
        // this.circleAnim?.current?.play();
        // this.circleAnim?.current?.play(1, 320);

    }
    _onConnectButtonPress = () => {
        console.log("in on connect button preess");
        this.twilioVideo.current.connect({ roomName: this.state.roomName, accessToken: this.state.token })
        this.setState({ status: 'connecting' })
        console.log(this.state.status);

    }
    _onEndButtonPress = () => {
        this.twilioVideo.current.disconnect()
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

        this.setState({ status: 'disconnected' })
    }
    _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", JSON.stringify(error));
        console.log("failed to connect");
        this.setState({ status: 'disconnected' })
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
        this.setState({ videoTracks: { ...videoTracks } })
    }
    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.status === 'disconnected' &&
                    <View>
                        <Text style={styles.welcome}>
                            React Native Twilio Video
                </Text>
                        <View style={styles.spacing}>
                            <Text style={styles.inputLabel}>Room Name</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="Room Name"
                                defaultValue={this.state.roomName}
                                onChangeText={(text) => this.setState({ roomName: text })}
                            />
                        </View>
                        <View style={styles.spacing}>
                            <Text style={styles.inputLabel}>Token</Text>
                            <TextInput style={styles.inputBox}
                                placeholder="Token"
                                defaultValue={this.state.token}
                                onChangeText={(text) => this.setState({ token: text })}
                            />
                        </View>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._onConnectButtonPress}>
                            <Text style={styles.Buttontext}>Connect</Text>
                        </TouchableHighlight>
                    </View>
                }
                {
                    (this.state.status === 'connected' || this.state.status === 'connecting') &&
                    <View style={styles.callContainer}>
                        {
                            this.state.status === 'connected' &&
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
                                    {
                                        !this.state.isUserConnect &&
                                        <Image source={require('../../assets/p6.jpg')}
                                            style={styles.backgroundImage} blurRadius={20} />
                                    }
                                    {
                                        !this.state.isUserConnect &&
                                        <View style={styles.profileImageView}>
                                            <LottieView
                                                style={styles.animationStyles}
                                                resizeMode='cover'
                                                loop
                                                autoPlay
                                                // ref={this.circleAnim}
                                                source={require('../utilities/animations/circleAnim.json')}
                                            />
                                            <Image source={require('../../assets/p6.jpg')}
                                                style={styles.profileImageStyle} />
                                        </View>
                                    }
                                </TouchableOpacity>

                                <TwilioVideoLocalView
                                    enabled={true}
                                    style={this.state.isButtonDisplay ? styles.localVideoOnButtonEnabled : styles.localVideoOnButtonDisabled}
                                />

                            </View>
                        }
                        <View
                            style={
                                {
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
                                }
                            } >
                            <TouchableOpacity
                                style={
                                    {
                                        display: this.state.isButtonDisplay ? "flex" : "none",
                                        width: 60,
                                        height: 60,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderRadius: 100 / 2,
                                        backgroundColor: 'grey',
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }
                                }
                                onPress={this._onMuteButtonPress}>
                                < MIcon name={this.state.isAudioEnabled ? "mic" : "mic-off"} size={24} color='#fff' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    {
                                        display: this.state.isButtonDisplay ? "flex" : "none",
                                        width: 60,
                                        height: 60,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderRadius: 100 / 2,
                                        backgroundColor: 'grey',
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }
                                }
                                onPress={this._onEndButtonPress}>
                                {/* <Text style={{fontSize: 12}}>End</Text> */}
                                < MIcon name="call-end" size={28} color='#fff' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    {
                                        display: this.state.isButtonDisplay ? "flex" : "none",
                                        width: 60,
                                        height: 60,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderRadius: 100 / 2,
                                        backgroundColor: 'grey',
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }
                                }
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 40
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginRight: 70,
        marginLeft: 70,
        marginTop: 50,
        textAlign: 'center',
        backgroundColor: 'white'
    },
    button: {
        marginTop: 100
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
    optionsContainer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        zIndex: 2,
    },
    optionButton: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: "center"
    },
    spacing: {
        padding: 10
    },
    inputLabel: {
        fontSize: 18
    },
    buttonContainer: {
        height: normalize(45),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: wp('90%'),
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#1E3378",
        width: wp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 10
    },
    Buttontext: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18
    },
    inputBox: {
        borderBottomColor: '#cccccc',
        fontSize: 16,
        width: wp("95%"),
        borderBottomWidth: 1
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

});