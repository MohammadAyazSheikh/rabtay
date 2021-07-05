import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as ActionTypes from '../actionTypes';

export const signupSuccess = (user) => (
    {
        type: ActionTypes.SIGNUP_SUCCES,
        payload: user
    }
)

export const signupFailed = (errMess) => (
    {
        type: ActionTypes.SIGNUP_FAILED,
        payload: errMess
    }
)

export const signupLoading = () => ({
    type: ActionTypes.SIGNUP_LOADING,
});


export const Register = (fname, lname, email, pass, dob, gender) => (dispatch) => {

    dispatch(signupLoading());

    auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((response) => {


            console.log(response);

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
                    // navigation.navigate('Home', { user: data })
                    signupSuccess(data)
                    alert('signedin');
                })
                .catch((error) => {
                    alert(error);
                    signupFailed(error);
                });
        })
        .catch((error) => {
            signupFailed(error);
            alert(error)
        });
}