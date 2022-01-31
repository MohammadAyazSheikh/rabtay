import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';
import { connectServer, socket } from '../../lib/socket';
import { notificationsBadgeSucces } from '../actions/notificBadgeActions';
import { GetNotifications } from '../actions/notificationsActions';
import { GetContacts } from '../actions/getContactsActions';
import { postMessagesSuccess } from '../actions/postMessageActions'
import { GetMessages } from '../actions/getMessagesActions';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const storeToken = async (value) => {
//     try {
//         console.log("\n\n\n=======" + value + "====\n\n\n");
//         await AsyncStorage.setItem('@Token', value);
//         value = await AsyncStorage.getItem('Token');
//         console.log("\n\n\n^^^^^" + value + "^^^^^\n\n\n");
//     } catch (e) {
//         alert(e)
//     }
// }

// const getToken = async () => {
//     try {
//         const value = await AsyncStorage.getItem('Token');
//         if (value !== null) {
//             // We have data!!
//             console.log("\n\n\n******" + value + "*****\n\n\n");
//         }
//         else {
//             console.log("\n\n\n****** null token *****\n\n\n");
//         }
//     } catch (error) {
//         console.log('get token error')
//     }
// };


export const loginSuccess = (user) => (
    {
        type: ActionTypes.AUTH_SUCCES,
        payload: user
    }
)

export const loginFailed = (errMess) => (
    {
        type: ActionTypes.AUTH_FAILED,
        payload: errMess
    }
)

export const loginLoading = () => ({
    type: ActionTypes.AUTH_LOADING,
});


export const Login = (email, pass) => (dispatch) => {

    dispatch(loginLoading());

    return fetch(`${baseUrl}users/login`,
        {
            method: "POST",
            body: JSON.stringify({ username: email, password: pass }),
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


                dispatch(loginSuccess(data));
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
                    console.log(`\n\n\chat listener msg from server\n\n ${JSON.stringify(vCallData)}`);
                    alert();

                });
            }
        )
        .catch(
            error => {
                console.log('post login consolog Error', error.message);
                alert('Your login req could not be posted\nError: ' + error.message);
                dispatch(loginFailed(error.message))
            }
        );
}




