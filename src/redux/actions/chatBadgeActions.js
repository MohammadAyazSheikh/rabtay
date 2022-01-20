import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';


export const chatBadgeSucces = (data) => (
    {
        type: ActionTypes.CHAT_BADGE_SUCCES,
        payload: data
    }
);

const chatBadgeFailed = (data) => (
    {
        type: ActionTypes.chat_BADGE_FAILED,
        payload: data
    }
);



const chatBadgeLaoding = (data) => (
    {
        type: ActionTypes.CHAT_BADGE_LOADIND,
        payload: data
    }
);

// export const notificationsBadgeClear = (data) => {
//     console.log('\n\n\n\n****Clear Notific fired***\n\n\n\n')
//     return (
//         {
//             type: ActionTypes.NOTIFICATIONS_BADGE_CLEAR,
//             payload: data
//         }
//     )
// };




export const GetChatBadge = (messages, userId) => (dispatch) => {

    
    let badge = 0;
    for (let i = 0; i < messages?.length; i++) {

    
        if (messages[i]?.message?.to === userId && messages[i]?.message?.isSeen === false) {
        
            badge++;
        }
    }

    dispatch(chatBadgeSucces(badge));

}


