import * as ActionTypes from '../actionTypes';

export const CHAT_BADGE_REDUCER = (state = { isLoading: true, badge: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.CHAT_BADGE_SUCCES:
            return {
                ...state,
                isLoading: false,
                badge: action.payload,
                errMess: null,
            };
        case ActionTypes.CHAT_BADGE_FAILED:
            return {
                ...state,
                isLoading: false,
                badge: null,
                errMess: action.payload,
            };
        case ActionTypes.CHAT_BADGE_LOADIND:
            return {
                ...state,
                isLoading: true,
                notific: null,
                errMess: null,
            };
        // case ActionTypes.NOTIFICATIONS_BADGE_CLEAR:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         notific: action.payload,
        //         errMess: null,
        //     };
        default:
            return state;
    }
}