import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';
import { socket, connectServer } from '../../lib/socket';
import { GetContacts } from './getContactsActions'

export const signupSuccess = (user) => (
    {
        type: ActionTypes.AUTH_SUCCES,
        payload: user
    }
)

export const signupFailed = (errMess) => (
    {
        type: ActionTypes.AUTH_FAILED,
        payload: errMess
    }
)

export const signupLoading = () => ({
    type: ActionTypes.AUTH_LOADING,
});


export const Register = (fname, lname, email, pass, dob, gender) => (dispatch) => {

    dispatch(signupLoading());

    const userData = {
        username: email,
        password: pass,
        fname: fname,
        lname: lname,
        dob: new Date(dob),
        gender: gender,
    };



    return fetch(`${baseUrl}users/signup`,
        {
            method: "POST",
            body: JSON.stringify(userData),
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

                dispatch(signupSuccess(data));
                dispatch(GetContacts(data.token));

                // console.log(`\n\n\n\nLogin Respons${JSON.stringify(data)}\n\n`);

                //********** establishing socket connection ************ */
                connectServer(data.user._id, (socket) => {
                    socket.emit('active', { userId: data.user._id, username: data.user.username });

                });

                //********** listening on notification event ************ */
                socket.on('notification', msg => {
                    // alert(msg.unreadNotific);
                    console.log(`\n\n\n\n\n Notification Received ${JSON.stringify(msg.unreadNotific)}\n\n\n`);
                    let unread = { unread: msg.unreadNotific, succes: true }

                    dispatch(notificationsBadgeSucces(unread));
                    let token = data.token;
                    console.log(`\n\n\n\n\n\n\******${token}******n\n\n\n\n\n\n`)
                    dispatch(GetNotifications(token));
                });

                // ****************************active user listener**************************************
                socket.on("active", msg => {
                    console.log(`\n\n\active user listener msg from server\n\n ${JSON.stringify(msg)}`);
                    // alert("a contact is active")
                    dispatch(GetContacts(data.token));
                });

                //*******************Listening on new message****************************** */
                socket.on("chat", (chatData) => {
                    console.log(`\n\n\chat listener msg from server\n\n ${JSON.stringify(chatData)}`);
                    // alert();
                    dispatch(postMessagesSuccess(chatData));
                    dispatch(GetMessages(data.token, data.user._id));
                    // socket.emit('chatStatus', {
                    //     contactId: chatData.message.from,
                    //     chatId: chatData.chatId
                    // });
                });


                //*******************Listening on new message****************************** */
                socket.on("videoCall", (vCallData) => {
                    console.log(`\n\nvideo call listener msg from server\n\n ${JSON.stringify(vCallData)}`);
                    if (vCallData.startCall) {
                        dispatch(OnVideoCallStart(vCallData));
                    }
                    else {
                        dispatch(OnVideoCallEnd());
                    }

                    // alert();
                });

            }
        )
        .catch(
            error => {
                console.log('post Signup consolog Error', error.message);
                alert('Your signup req could not be posted\nError: ' + error.message);
                dispatch(signupFailed(error.message))
            }
        );

}