import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';


export const getContactsSuccess = (contacts) => (
    {
        type: ActionTypes.GET_CONTACTS_SUCCESS,
        payload: contacts
    }
);

export const getContactsFailed = (err) => (
    {
        type: ActionTypes.GET_CONTACTS_FAILED,
        payload: err
    }
);

export const getContactsLoading = () => (
    {
        type: ActionTypes.GET_CONTACTS_LOADIND
    }
)



export const GetContacts = (token) => (dispatch) => {

    dispatch(getContactsLoading());

    fetch(`${baseUrl}users/getcontact`,
        {
            method: 'GET',
            headers: {
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
                // alert(data);
                dispatch(getContactsSuccess(data));

                // console.log(`\n\n\n\n====get contacts data\n${JSON.stringify(data)}======\n\n\n\n`)
            }
        )
        .catch(
            error => {
                console.log('Get contacts consolog Error', error.message);
                alert("Could'nt get contacts \nError: " + error.message);
                dispatch(getContactsFailed(error.message));
            }
        );

}




export const DltContact = (token, userId) => (dispatch) => {

    dispatch(getContactsLoading());

    fetch(`${baseUrl}users/dltcontact`,
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
        .then((response) => response.json())
        .then(
            data => {
                dispatch(getContactsSuccess(data));

                console.log(`\n\n\n\n====get contacts data\n${JSON.stringify(data)}======\n\n\n\n`)
            }
        )
        .catch(
            error => {
                console.log('Get contacts consolog Error', error.message);
                alert("Could'nt get contacts \nError: " + error.message);
                dispatch(getContactsFailed(error.message));
            }
        );

}






