import * as ActionTypes from '../actionTypes';

export const NOTIFICATIONS_REDUCER = (state = { isLoading: true, notific: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_NOTIFICATIONS_SUCCES:
            return {
                ...state,
                isLoading: false,
                notific: action.payload,
                errMess: null,
            };
        case ActionTypes.GET_NOTIFICATIONS_FAILED:
            return {
                ...state,
                isLoading: false,
                notific: null,
                errMess: action.payload,
            };
        case ActionTypes.GET_NOTIFICATIONS_LOADIND:
            return {
                ...state,
                isLoading: true,
                notific: null,
                errMess: null,
            };
        default:
            return state;
    }
}