import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';
import { GetChatBadge } from '../actions/chatBadgeActions'
import { getContactsFailed } from './getContactsActions';


export const GetMessagesSuccess = (messages) => (
    {
        type: ActionTypes.GET_MESSAGES_SUCCESS,
        payload: messages
    }
);

export const GetMessagesFailed = (err) => (
    {
        type: ActionTypes.GET_MESSAGES_FAILED,
        payload: err
    }
);

export const GetMessagesLoading = () => (
    {
        type: ActionTypes.GET_MESSAGES_LOADIND,
    }
);


export const GetMessages = (token, userId) => (dispatch) => {

    console.log(userId)
    dispatch(GetMessagesLoading());

    // alert();
    return fetch(`${baseUrl}users/getMessage`,
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

                dispatch(GetMessagesSuccess(data));
                //getting badge
                dispatch(GetChatBadge(data, userId));
                console.log(`\n\n\n\n\n\n\n get messages Response\n\n ${JSON.stringify(data)}\n\n\n\n\n\n`)

            }
        )
        .catch(
            error => {
                console.log('get messages failed error', error.message);
                alert('Your get messages req could not be posted\nError: ' + error.message);
                dispatch(GetMessagesFailed(error.message))
            }
        );

}