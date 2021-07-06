import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as ActionTypes from '../actionTypes';

export const loginSuccess = (user) => (
    {
        type: ActionTypes.AUTH_SUCCES,
        payload: user
    }
)

export const loginFailed = (errMess) => (
    {
        type: ActionTypes.AUTH_FAILED,
        payload: errMess
    }
)

export const loginLoading = () => ({
    type: ActionTypes.AUTH_LOADING,
});


export const Login = (email, pass) => (dispatch) => {

    dispatch(loginLoading());

    auth()
        .signInWithEmailAndPassword(email, pass)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    alert('logedin')
                    dispatch(loginSuccess(user))
                    // navigation.navigate('Home', { user })
                })
                .catch(error => {
                    dispatch(loginFailed(error));
                    alert(error)
                });
        })
        .catch(error => {
            dispatch(loginFailed(error));
            alert(error)
        })
}