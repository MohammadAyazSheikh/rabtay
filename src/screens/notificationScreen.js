import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import { post } from '../utilities/data';
import SingleNotification from '../components/notificationComponent';
import Icon from 'react-native-vector-icons/Fontisto';
import { widthToDp } from '../utilities/responsiveUtils';
import { BackGroundColor } from '../utilities/colors';
import { GetNotifications } from '../redux/actions/notificationsActions';



const mapStateToProps = state => {
    return {
        // user: state?.user?.user?.user,
        token: state?.user?.user?.token,
        notific: state.notifications.notific
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        GetNotifications: (token) => {
            dispatch(GetNotifications(token));
        }
    }
};



const RenderIcon = () => (
    <>
        <View>
            <View style={styles.Circle} />
            <Icon name='bell-alt' size={widthToDp(40)} color='grey' />
        </View>
        <Text style={styles.txtNotification}>Nothing here!!!</Text>
    </>
)

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    componentDidMount() {
        this.props.GetNotifications(this.props.token);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    // post.length > 0 ?
                    this.props?.notific?.length > 0 ?
                        <FlatList
                            data={this.props.notific}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) =>
                                <SingleNotification
                                    uName={`${item.from.fname} ${item.from.lname}`}
                                    image={item.from.profileImage?.path}
                                    type={item.type}
                                />
                            }
                            contentContainerStyle={{ paddingBottom: 120, }}
                        />
                        :
                        <RenderIcon />
                }
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Circle: {
        width: widthToDp(35),
        height: widthToDp(35),
        borderRadius: widthToDp(50),
        backgroundColor: BackGroundColor,
        position: 'absolute',
        bottom: '20%'
    },
    txtNotification: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 100
    }
});




