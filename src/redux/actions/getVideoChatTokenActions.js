import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';



export const GetVideoChatTokenSucces = (data) => (
    {
        type: ActionTypes.GET_VIDEO_CALL_TOKEN_SUCCES,
        payload: data
    }
);


export const GetVideoChatTokenFailed = (data) => (
    {
        type: ActionTypes.GET_VIDEO_CALL_TOKEN_FAILED,
        payload: data
    }
);


export const GetVideoChatTokenLoading = () => (
    {
        type: ActionTypes.GET_VIDEO_CALL_TOKEN_LOADIND,
    }
);


export const GetVideoChatToken = (token, username) => (dispatch) => {


    console.log('\n\nget video token action\n\n');

    dispatch(GetVideoChatTokenLoading());

    // alert();
    return fetch(`${baseUrl}users/getToken`,
        {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
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

                dispatch(GetVideoChatTokenSucces(data));
                console.log(`\n\nvideo token = ${JSON.stringify(data)}`);
            }
        )
        .catch(
            error => {
                alert('Your get Video Toekn req could not be posted\nError: ' + error.message);
                dispatch(GetVideoChatTokenFailed(error.message))
            }
        );

}