import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';
import { socket } from '../../lib/socket';

export const postMessagesSuccess = (messages) => (
    {
        type: ActionTypes.POST_MESSAGE_SUCCESS,
        payload: messages
    }
);

export const postMessagesFailed = (err) => (
    {
        type: ActionTypes.POST_MESSAGE_FAILED,
        payload: err
    }
);

export const postMessagesLoading = () => (
    {
        type: ActionTypes.GET_MESSAGES_LOADIND,
    }
);


export const PostMessages = (token, chatId, text, to, type, initializeChat) => (dispatch) => {

    dispatch(postMessagesLoading());

    // alert();
    return fetch(`${baseUrl}users/addMessage`,
        {
            method: 'POST',
            body: JSON.stringify({
                chatId: chatId,
                text: text,
                to: to,
                type: type,
                initializeChat: initializeChat
            }),
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

                // alert(JSON.stringify(data.message));
                dispatch(postMessagesSuccess(data));

                socket.emit('chat',
                    {
                        message: data,
                        contactId: to,
                    }
                );

                console.log(`\n\n\n\n\n\n\n get messages Response\n\n ${JSON.stringify(data)}\n\n\n\n\n\n`)

            }
        )
        .catch(
            error => {
                console.log('post message failed error', error.message);
                alert('Your post message req could not be posted\nError: ' + error.message);
                dispatch(postMessagesFailed(error.message))
            }
        );
}