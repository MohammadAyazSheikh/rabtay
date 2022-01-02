import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';


export const GetUserSuccess = (user) => (
    {
        type: ActionTypes.GET_SINGLE_USER_SUCCESS,
        payload: user
    }
)

export const GetUserFailed = (err) => (
    {
        type: ActionTypes.GET_SINGLE_USER_FAILED,
        payload: err
    }
)


export const GetUserLoading = (err) => (
    {
        type: ActionTypes.GET_SINGLE_USER_LOADIND,
    }
)

export const GetUser = (token, userId) => (dispatch) => {

    dispatch(GetUserLoading());

    // alert();
    return fetch(`${baseUrl}users/singleuser`,
        {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
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

                dispatch(GetUserSuccess(data));

                console.log(`\n\n\n\n\n\n\n Single User Response\n\n ${JSON.stringify(data)}\n\n\n\n\n\n`)


            }
        )
        .catch(
            error => {
                console.log('get single user failed error', error.message);
                alert('Your get single user req could not be posted\nError: ' + error.message);
                dispatch(GetUserFailed(error.message))
            }
        );




}