import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as ActionTypes from '../actionTypes';
import { loginFailed } from './loginActions';

export const logoutSuccess = () => (
    {
        type: ActionTypes.LOGOUT_SUCCES,
    }
)

export const logoutFailed = (errMess) => (
    {
        type: ActionTypes.LOGOUT_FAILED,
        payload: errMess
    }
)

export const logoutLoading = () => ({
    type: ActionTypes.LOGOUT_FAILED,
});


export const Logout = () => (dispatch) => {

    dispatch(logoutLoading());

    auth().signOut().
        then(() => {
            alert('Sign out!');
            dispatch(logoutSuccess());
        })
        .catch((err) => {
            alert(err);
            dispatch(logoutFailed(err));
        });

}