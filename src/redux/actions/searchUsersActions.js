import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as ActionTypes from '../actionTypes';


export const searchUsersSuccess = (users) => (
    {
        type: ActionTypes.SEARCH_USER_SUCCES,
        payload: users
    }
)

export const searchUsersFailed = (errMess) => (
    {
        type: ActionTypes.SEARCH_USER_FAILED,
        payload: errMess
    }
)

export const searchUsersLoading = () => ({
    type: ActionTypes.SEARCH_USER_FAILED,
});


export const SearchUsers = () => (dispatch) => {

    dispatch(searchUsersLoading());

    const usersCollection = firestore().collection('users');
    usersCollection
        // .where('fname','==', 'ilyas')
        .get()
        .then(
            res => {

                let users = [];

                res.forEach(data => {
                    users.push(
                        {
                            uname: data.data().fname + data.data().lname,
                            users: data.data()
                        }
                    );
                })

                dispatch(searchUsersSuccess(users));
                console.log(users)
            })
        .catch((err) => {
            dispatch(searchUsersFailed(err));
            alert(err);
        });

}