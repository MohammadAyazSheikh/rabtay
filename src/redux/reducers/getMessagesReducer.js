import * as ActionTypes from '../actionTypes';

export const GET_MESSAGES_REDUCER = (state = { isLoading: true, isPosting: false, messages: null, errMess: null }, action) => {

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
        //adding new message
        case ActionTypes.POST_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isPosting: false,
                messages: [...state.messages, action.payload],
                errMess: null,
            };
        case ActionTypes.POST_MESSAGE_FAILED:
            return {
                ...state,
                errMess: action.payload,
                isPosting: false,
                isLoading: false,
            };
        case ActionTypes.POST_MESSAGE_LOADIND:
            return {
                ...state,
                errMess: null,
                isPosting: true,
                isLoading: false,
            };
        default:
            return state;
    }
}