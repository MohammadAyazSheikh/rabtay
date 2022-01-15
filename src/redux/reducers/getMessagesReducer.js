import * as ActionTypes from '../actionTypes';

export const GET_MESSAGES_REDUCER = (state = { isLoading: true, messages: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                messages: action.payload,
                errMess: null,
                isPosting: false,
            };
        case ActionTypes.GET_MESSAGES_FAILED:
            return {
                ...state,
                isLoading: false,
                messages: null,
                errMess: action.payload,
                isPosting: false,
            };
        case ActionTypes.GET_MESSAGES_LOADIND:
            return {
                ...state,
                isLoading: true,
                messages: null,
                errMess: null,
                isPosting: false,
            };
        default:
            return state;
    }
}