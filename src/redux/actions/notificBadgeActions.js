import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';


const notificationsBadgeSucces = (data) => (
    {
        type: ActionTypes.NOTIFICATIONS_BADGE_SUCCES,
        payload: data
    }
);

const notificationsBadgeFailed = (data) => (
    {
        type: ActionTypes.NOTIFICATIONS_BADGE_FAILED,
        payload: data
    }
);



const notificationsBadgeLaoding = (data) => (
    {
        type: ActionTypes.NOTIFICATIONS_BADGE_LOADIND,
        payload: data
    }
);




export const GetNotifications = (token) => (dispatch) => {

    dispatch(notificationsBadgeLaoding());




    fetch(`${baseUrl}users/notifications/unread`,
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
                dispatch(notificationsBadgeSucces(data));
                console.log(`\n\n\n\n====Notification Badge data\n${JSON.stringify(data)}======\n\n\n\n`)
            }
        )
        .catch(
            error => {
                console.log('getNotic Error', error.message);
                alert('Could not getNotic\nError: ' + error.message);
                dispatch(notificationsBadgeFailed(data));
            }
        );

}


