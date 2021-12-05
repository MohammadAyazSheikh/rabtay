import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, Image, FlatList,
    StyleSheet, StatusBar, TextInput, Animated, ScrollView
} from 'react-native';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlaceHolder from '../components/placeHolderComponent';
import { connect } from 'react-redux';
import { SearchUsers } from '../redux/actions/searchUsersActions';
import { baseUrl } from '../utilities/config';


const User = (props) => {
    return (
        <TouchableOpacity
            style={styles.singleItemView}
            onPress={() => {
                props.navigation.navigate('User', {
                    name: props.name,
                    desc: props.desc,
                    image: props.image ? baseUrl + props.image : null
                })
            }}
        >
            {
                props.image ?
                    <Image source={{ uri: baseUrl + props.image }} style={styles.imageStyle} />
                    :
                    <Image source={require('../../assets/profile.jpg')} style={styles.imageStyle} />
            }

            <View style={styles.infoView}>
                <Text style={styles.txtName}>{props.name}</Text>
                <Text style={styles.txtDesc}>{props.desc.substr(0, 100)}</Text>
            </View>
        </TouchableOpacity>
    )
}
const arr = [1, 2, 3, 4, 5, 6];


const mapStateToProps = state => {
    return {
        users: state.searchedUsers
    }
}

const mapDispatchToProps = dispatch => (
    {
        searchUsers: (searchText) =>
            dispatch(SearchUsers(searchText))
    }
)


class Search extends Component {
    constructor(props) {
        super(props);
        this.textInputAnim = new Animated.Value(0);

        this.scrollY = new Animated.Value(0);
        this._scrollY = this.scrollY.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolateLeft: 'clamp' });
        this.headerTranslate = Animated.diffClamp(this._scrollY, 1, heightToDp(10)).interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1],
        });


        this.animateTextInput = this.animateTextInput.bind(this)

        this.state = {
            Users: null,
            isLoading: false
        }
    }

    animateTextInput() {
        Animated.timing(
            this.textInputAnim,
            {
                toValue: 1,
                useNativeDriver: true,
            }
        ).start();
    }
    componentDidMount() {
        this.animateTextInput();
    }


    render() {
        return (
            <View style={styles.container}>
                {/* *************************************List************************* */}

                <View style={[styles.itemsView]}>
                    {
                        this.props.users.isLoading ?
                            //+++++++ Loading Component ++++++
                            <ScrollView
                                contentContainerStyle={{ paddingTop: heightToDp(10), paddingHorizontal: 10 }}
                                showsVerticalScrollIndicator={false}
                            >
                                {
                                    arr.map((item) => {
                                        return (
                                            <PlaceHolder opacity={0.8} key={item} />
                                        );
                                    })
                                }
                            </ScrollView>
                            // <Text>Searching... </Text>
                            :
                            <Animated.FlatList

                                onScroll={
                                    Animated.event(
                                        [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                                        { useNativeDriver: true }
                                    )
                                }
                                contentContainerStyle={{ paddingLeft: 2, paddingRight: 2, paddingTop: heightToDp(10) }}
                                data={this.props.users.users}
                                keyExtractor={(item) => item._id}
                                renderItem={({ index, item }) => <User
                                    {...this.props} name={`${item.fname}  ${item.lname}`}
                                    desc={item.about || 'nothing special about me :-|'}
                                    image={item.profileImage?.path}
                                    uname={item.username}
                                    id = {item._id}
                                />}
                            />
                        // <Text>Data... </Text>
                    }
                </View>

                {/********************************* Header ******************************/}

                <Animated.View style={[styles.header, {
                    transform: [{ translateY: this.headerTranslate }],
                    position: 'absolute'
                }]}>
                    <TouchableOpacity style={styles.btnSearch}
                        onPress={
                            () => { this.props.navigation.navigate('Home') }
                        }
                    >
                        <Ionicons name='arrow-back' size={40} />
                    </TouchableOpacity>
                    <Animated.View style={{
                        ...styles.inputView,
                        transform: [{ scaleX: this.textInputAnim }]
                    }}>
                        <TextInput
                            style={styles.txtInput}
                            placeholder='Password'
                            placeholderTextColor='grey'
                            onChangeText={(value) => {

                                // let str = value.replace(/\s+/g, '').toLocaleLowerCase();
                                // let filterdUser = post.filter((item) => item.uName.replace(/\s+/g, '').toLocaleLowerCase().includes(str));
                                // this.setState({ Users: filterdUser });
                                this.props.searchUsers(value);


                                // this.setState({ Users: filterdUser });
                            }}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: widthToDp(100),
        height: heightToDp(10),
    },
    inputView: {
        width: '80%',
        height: '70%',
    },
    txtInput: {
        width: '100%',
        height: '100%',
        borderColor: BackGroundColor,
        borderWidth: 2,
        borderRadius: 25,
        color: BackGroundColor,
        paddingLeft: 5,
        fontSize: 15
        // textAlign:'center'
    },
    btnSearch: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemsView: {
        // flex: 3,
        width: widthToDp(100),
        height: heightToDp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    singleItemView: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        elevation: 5,
        height: heightToDp(15),
        width: widthToDp(95),
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 5,
        marginTop: 5,
        marginBottom: 5,
    },

    imageStyle: {
        width: widthToDp(26),
        height: widthToDp(26),
        borderRadius: widthToDp(20),
        borderColor: BackGroundColor,
        borderWidth: 2,
    },
    infoView: {
        paddingLeft: 10,
        width: widthToDp(67),
    },
    txtName: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    txtDesc: {
        color: 'grey',
        fontSize: 12
    }
});

