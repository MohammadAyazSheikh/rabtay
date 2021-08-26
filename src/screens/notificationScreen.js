import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import { post } from '../utilities/data';
import SingleNotification from '../components/notificationComponent';



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
                <FlatList
                    data={post}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) =>
                        <SingleNotification
                            uName={item.uName}
                            image={item.img}
                        />
                    }
                    contentContainerStyle = {{  paddingBottom: 120,}}
                />
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
});




