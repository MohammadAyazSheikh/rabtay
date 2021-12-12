import * as ActionTypes from '../actionTypes';

export const NOTIFICATIONS_BADGE_REDUCER = (state = { isLoading: true, badge: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.NOTIFICATIONS_BADGE_SUCCES:
            return {
                ...state,
                isLoading: false,
                badge: action.payload,
                errMess: null,
            };
        case ActionTypes.NOTIFICATIONS_BADGE_FAILED:
            return {
                ...state,
                isLoading: false,
                badge: null,
                errMess: action.payload,
            };
        case ActionTypes.NOTIFICATIONS_BADGE_LOADIND:
            return {
                ...state,
                isLoading: true,
                notific: null,
                errMess: null,
            };
        case ActionTypes.NOTIFICATIONS_BADGE_CLEAR:
            return {
                ...state,
                isLoading: false,
                notific: action.payload,
                errMess: null,
            };
        default:
            return state;
    }
}