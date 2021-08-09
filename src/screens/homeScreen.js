import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { BackGroundColor } from '../utilities/colors';
import HomeHeader from '../components/homeHeaderComponents';

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}



class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        const arr = [1, 2, 3, 4, 5, 6, 6, 7, , 8, 9, 10, 11, 12, 13, 14, 15]
        return (
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={<HomeHeader user = {this.props.user}/>}
                    data={arr}
                    keyExtractor={(item) => item}
                    // showsVerticalScrollIndicator={false}
                    // numColumns={2}
                    // scrollEventThrottle={32}
                    // contentContainerStyle={{
                    //     // justifyContent: 'center',
                    //     // padding: 5,
                    //     // paddingBottom: 120

                    // }}

                    renderItem={
                        ({ item, index }) => {


                            return (
                                <View key={index} style={styles.imgPostView}>
                                    <Image style={styles.imgPostStyle}
                                        source={require('../../assets/p6.jpg')} />
                                </View>
                            );
                        }
                    }
                />
            </View>
        )
    }
}

export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
        width: '100%',
        height: '14%',
        flexDirection: 'row',
    },
    txtHeading: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    imgProfView: {
        backgroundColor: BackGroundColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: 48,
        height: 48,
        borderRadius: 100
    },
})