import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, Animated,
    StyleSheet, StatusBar, FlatList, Image
} from 'react-native';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import Register from '../components/registrationComponent';
import { data } from '../utilities/splashData';

const bgs = [BackGroundColor, '#FFF', BackGroundColor, '#FFF', BackGroundColor];
const bgsRevers = ['#FFF', BackGroundColor, '#FFF', BackGroundColor, '#FFF'];

const Indicator = ({ scrollX }) => {
    return (
        <View style={styles.indicatorView}>
            {
                data.map((item, index) => {

                    const inputRange = [(index - 1) * widthToDp(100), index * widthToDp(100), (index + 1) * widthToDp(100)];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [1, 1.7, 1],
                        extrapolate: 'clamp'
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp'
                    });

                    const skew = scrollX.interpolate({
                        inputRange,
                        outputRange: ['0deg', '180deg', '0deg'],
                        extrapolate: 'clamp'
                    });

                    const backgroundColor = scrollX.interpolate({
                        inputRange: bgsRevers.map((_, i) => i * widthToDp(100)),
                        outputRange: bgsRevers,
                    });



                    return (<Animated.View key={item.id} style={[styles.indicator, { transform: [{ scale },{skewX:skew}], opacity, backgroundColor,borderRadius:10 }]} />);
                })
            }
        </View>
    )
}



const BackColor = ({ scrollX }) => {

    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_, i) => i * widthToDp(100)),
        outputRange: bgs,
    });

    return (
        <Animated.View
            style={
                [
                    StyleSheet.absoluteFillObject,
                    { backgroundColor }
                ]
            }
        />
    )
}

const BackCircle = ({ scrollX }) => {

    const backgroundColor = scrollX.interpolate({
        inputRange: bgsRevers.map((_, i) => i * widthToDp(100)),
        outputRange: bgsRevers.map((bg) => bg),
    });


    const YOLO = Animated.modulo(
        Animated.divide(
            Animated.modulo(scrollX, widthToDp(100)), //width se bahir na jae
            new Animated.Value(widthToDp(100))
        ),
        1);

    const scale = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1]
    });

    return (
        <Animated.View
            style={
                {
                    width: widthToDp(70),
                    height: widthToDp(70),
                    borderRadius: widthToDp(50),
                    backgroundColor,
                    position: 'absolute',
                    top: '19.5%',
                    transform: [{ scale }]
                }
            }
        />
    )
}

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.scrollX = new Animated.Value(0);
    }
    render() {
        return (
            <View style={styles.container}>
                <BackColor scrollX={this.scrollX} />
                <BackCircle scrollX={this.scrollX} />
                <Animated.FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    scrollEventThrottle={32}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
                            { useNativeDriver: false }
                        )}
                    renderItem={
                        ({ index, item }) => {

                            const textColor = this.scrollX.interpolate({
                                inputRange: bgsRevers.map((_, i) => i * widthToDp(100)),
                                outputRange: bgsRevers,
                            });
                            const backColor = this.scrollX.interpolate({
                                inputRange: bgs.map((_, i) => i * widthToDp(100)),
                                outputRange: bgs,
                            });
                            return item.isScreen ?
                                <View style={{ width: widthToDp(100) }}>
                                    <Register {...this.props} backColor = {backColor} />
                                </View>
                                :
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: widthToDp(100) }}>

                                    <View style={{ flex: 0.6, justifyContent: 'center', alignContent: 'center' }}>
                                        <Image source={item.image} style={{ width: widthToDp(50), height: widthToDp(50) }} resizeMode='contain' />
                                    </View>
                                    <View style={{ flex: 0.3 }}>
                                        <Animated.Text style={[styles.txtDesc,{color:textColor}]}>{item.desc}</Animated.Text>
                                    </View>
                                </View>
                        }
                    }
                />
                <Indicator scrollX={this.scrollX} />
            </View>

        );
    }
}

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        bottom: 60
    },
    indicator: {
        backgroundColor: '#FFF',
        width: widthToDp(3),
        height: widthToDp(3),
        borderRadius: 10,
        marginHorizontal: 10
    },
    txtDesc: {
        fontSize: widthToDp(7),
        fontWeight: 'bold',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: 'black',
    }
});

