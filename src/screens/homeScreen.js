import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { BackGroundColor } from '../utilities/colors';
import HomeHeader from '../components/homeHeaderComponents';
import Post from '../components/postComponent';
import { post } from '../utilities/data';
import { widthToDp, hieghtToDp, heightToDp } from '../utilities/responsiveUtils';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


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
                    ListHeaderComponent={<HomeHeader user={this.props.user} />}
                    data={post}
                    keyExtractor={(item) => item.id}
                    // showsVerticalScrollIndicator={false}
                    // numColumns={2}
                    // scrollEventThrottle={32}
                    contentContainerStyle={{
                        // justifyContent: 'center',
                        // padding: 5,
                        paddingBottom: 120,
                        backgroundColor:'#FFF'

                    }}

                    renderItem={
                        ({ item, index }) => {


                            return (
                                <Post
                                    uName = {item.uName}
                                    time={item.time}
                                    image={item.img}
                                    description={item.desc}
                                />
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
        justifyContent: 'center',
        alignItems: 'center'
    },
})