import { baseUrl } from '../../utilities/config';
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


    const data = new FormData();
  

    return fetch(`${baseUrl}upload`,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data;',
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
        .then((res) => res.json())
        .then(
            data => {

                dispatch(dpUploadSuccess(url));
                alert(data);;
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



// const uploadImage = async (fileUrl) => {
//     //Check if any file is selected or not

//     //If file selected then create FormData

//     const data = new FormData();
//     data.append('name', 'Image Upload');
//     data.append('file_attachment', fileUrl);
//     let res = await fetch(
//         baseUrl + 'upload',
//         {
//             method: 'post',
//             body: data,
//             headers: {
//                 'Content-Type': 'multipart/form-data; ',
//             },
//         }
//     );
//     let responseJson = await res.json();
//     alert(responseJson);
//     if (responseJson.status == 1) {
//         alert('Upload Successful');
//     }

// };
