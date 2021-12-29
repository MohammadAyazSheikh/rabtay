import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';


const getNotificationsSucces = (data) => (
    {
        type: ActionTypes.GET_NOTIFICATIONS_SUCCES,
        payload: data
    }
);

const getNotificationsFailed = (data) => (
    {
        type: ActionTypes.GET_NOTIFICATIONS_FAILED,
        payload: data
    }
);


const getNotificationsLoading = (data) => (
    {
        type: ActionTypes.GET_NOTIFICATIONS_LOADIND,
        payload: data
    }
);



export const GetNotifications = (token) => (dispatch) => {

    dispatch(getNotificationsLoading());




    fetch(`${baseUrl}users/notifications`,
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
                dispatch(getNotificationsSucces(data));
                console.log(`\n\n\n\n====getNotification data\n${JSON.stringify(data)}======\n\n\n\n`)
            }
        )
        .catch(
            error => {
                console.log('getNotic Error', error.message);
                alert('Could not getNotic\nError: ' + error.message);
                dispatch(getNotificationsFailed(error.message));
            }
        );

}


//-----------------------------------------Dlt Notification-------------------------------------
export const DltNotification = (token, senderId) => (dispatch) => {

    dispatch(getNotificationsLoading());




    fetch(`${baseUrl}users/notifications`,
        {
            method: 'DELETE',
            body: JSON.stringify({ senderId: senderId }),
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
                dispatch(getNotificationsSucces(data));
                console.log(`\n\n\n\n====Delete Notification data\n${JSON.stringify(data)}======\n\n\n\n`)
            }
        )
        .catch(
            error => {
                console.log('getNotic Error', error.message);
                alert('Could not getNotic\nError: ' + error.message);
                dispatch(getNotificationsFailed(error.message));
            }
        );

}


