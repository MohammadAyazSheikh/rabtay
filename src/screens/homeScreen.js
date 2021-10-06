import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { connect } from 'react-redux';
import HomeHeader from '../components/homeHeaderComponents';
import Post from '../components/postComponent';
import { post } from '../utilities/data';
import { BackGroundColor } from "../utilities/colors";
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';


const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}



class Home extends Component {
    constructor(props) {
        super(props);

        this.scrollY = new Animated.Value(0);
        this._scrollY = this.scrollY.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolateLeft: 'clamp' });
        this.headerTranslate = Animated.diffClamp(this._scrollY, 15, heightToDp(14)).interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1],
        });
        this.state = {

        };
    }


    render() {
        const arr = [1, 2, 3, 4, 5, 6, 6, 7, , 8, 9, 10, 11, 12, 13, 14, 15]

        return (
            <View style={styles.container}>
                <Animated.FlatList
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                            { useNativeDriver: true }
                        )
                    }
                    // ListHeaderComponent={<HomeHeader {...this.props} user={this.props.user} />}
                    data={post}
                    keyExtractor={(item) => item.id}

                    contentContainerStyle={{
                        paddingTop: heightToDp(14),
                        paddingBottom: 120,
                        backgroundColor: '#FFF'
                    }}

                    renderItem={
                        ({ item, index }) => {


                            return (
                                <Post
                                    uName={item.uName}
                                    time={item.time}
                                    image={item.img}
                                    description={item.desc}
                                    videoUrl={item.videoUrl}
                                />
                            );
                        }
                    }
                />

                <HomeHeader {...this.props} user={this.props.user} headerTranslate={this.headerTranslate} />
            </View>
        )
    }
}

export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
})