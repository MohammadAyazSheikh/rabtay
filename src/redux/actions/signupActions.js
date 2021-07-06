import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as ActionTypes from '../actionTypes';

export const signupSuccess = (user) => (
    {
        type: ActionTypes.AUTH_SUCCES,
        payload: user
    }
)

export const signupFailed = (errMess) => (
    {
        type: ActionTypes.AUTH_FAILED,
        payload: errMess
    }
)

export const signupLoading = () => ({
    type: ActionTypes.AUTH_LOADING,
});


export const Register = (fname, lname, email, pass, dob, gender) => (dispatch) => {

    dispatch(signupLoading());

    auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((response) => {


            // console.log(response);

            const uid = response.user.uid;

            const data = {
                id: uid,
                email: email,
                fname: fname,
                lname: lname,
                dob: new Date(dob),
                gender: gender,
            };

            const usersRef = firestore().collection('users')

            usersRef
                .doc(uid)
                .set(data)
                .then((response) => {
                    dispatch(signupSuccess(data));
                    alert('signedin');
                })
                .catch((error) => {
                    alert(error);
                    dispatch(signupFailed(error));
                });
        })
        .catch((error) => {
            dispatch(signupFailed(error));
            alert(error)
        });
}