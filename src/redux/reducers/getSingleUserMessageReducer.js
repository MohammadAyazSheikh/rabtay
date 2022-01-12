import * as ActionTypes from '../actionTypes';

export const GET_SINGLE_USER_MESSAGES_REDUCER = (state = { isLoading: true, messages: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_SINGLE_USER_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                messages: action.payload,
                errMess: null,
            };
        case ActionTypes.GET_SINGLE_USER_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                messages: null,
                errMess: action.payload,
            };
        case ActionTypes.GET_SINGLE_USER_MESSAGE_LOADIND:
            return {
                ...state,
                isLoading: true,
                messages: null,
                errMess: null,
            };
        default:
            return state;
    }
}