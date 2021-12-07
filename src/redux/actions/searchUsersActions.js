import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';


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
    type: ActionTypes.SEARCH_USER_LOADING,
});


export const SearchUsers = (searchText) => (dispatch) => {

    dispatch(searchUsersLoading());




    return fetch(`${baseUrl}users`,
        {
            method: "POST",
            body: JSON.stringify({ username: searchText }),
            headers: {
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

                dispatch(searchUsersSuccess(data.users));

                console.log(`\n\n\n\n\n\n\n Serach Response\n\n ${JSON.stringify( data.users)}\n\n\n\n\n\n`)


            }
        )
        .catch(
            error => {
                console.log('post search user failed error', error.message);
                alert('Your user searched req could not be posted\nError: ' + error.message);
                dispatch(searchUsersFailed(error.message))
            }
        );




}