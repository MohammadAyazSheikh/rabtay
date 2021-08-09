import firestore from '@react-native-firebase/firestore';
import * as ActionTypes from '../actionTypes';


export const dpUploadSuccess = (dpUrl) => (
    {
        type: ActionTypes.DP_UPLAOD_SUCCES,
        payload: dpUrl
    }
)


export const dpUploadFailed = (errMess) => (
    {
        type: ActionTypes.DP_UPLAOD_FAILED,
        payload: errMess
    }
)

export const dpUploadLoading = () => ({
    type: ActionTypes.DP_UPLAOD_LOADING,
});


export const updateDp = (user) => (
    {
        type: ActionTypes.DP_UPDATE,
        payload: user
    }
)



export const UploadDP = (url, uid) => (dispatch) => {

    dispatch(dpUploadLoading);

    const usersRef = firestore().collection('users');

    usersRef
        .doc(uid)
        .set(
            {
                dpUrl: url
            },
            { merge: true }
        )
        .then((res) => {
            console.log("***Dp Upload******\n" + res)
            alert('profile picture updated..!')
        })
        .catch((error) => {
            alert('failed to upload..!\nerror:' + error);
            dispatch(dpUploadFailed(error));
        });

    usersRef
        .doc(uid)
        .get()
        .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
                alert("User does not exist anymore.")
                return;
            }
            const user = firestoreDocument.data()

            dispatch(updateDp(user))
            dispatch(dpUploadSuccess(url));
        })
        .catch(error => {
            dispatch(loginFailed(error));
            alert(error);
            dispatch(dpUploadFailed(error));
        });
}