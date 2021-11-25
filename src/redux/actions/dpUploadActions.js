import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';
import uuid from 'react-native-uuid';

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



export const UploadDP = (url, token) => (dispatch) => {

    dispatch(dpUploadLoading);


    const imgID = uuid.v4();

    const data = new FormData();

    data.append('imageFile', { uri: url, name: `${imgID}.jpg`, type: 'image/jpg' });

    fetch(`${baseUrl}upload`,
        {
            method: 'POST',
            body: data,
            headers: {
                // 'Content-Type': 'multipart/form-data;',
                "Authorization": token
            },
            credentials: "same-origin"
        }
    )
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); //erro if user not found etc
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);  //error if we face problem to connect server
                throw errmess;
            })
        .then((response) => response.json())
        .then(
            data => {

                // dispatch(dpUploadSuccess(url));
                dispatch(updateDp(data))
             console.log(`\n\n\n\n====dp update data\n${JSON.stringify(data)}======\n\n\n\n`)
            }
        )
        .catch(
            error => {
                console.log('post Picture consolog Error', error.message);
                alert('Could not upload image\nError: ' + error.message);
                dispatch(dpUploadFailed(error.message));
            }
        );

}


