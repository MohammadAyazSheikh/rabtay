import * as ActionTypes from '../actionTypes';

export const GET_SINGLE_USER_MESSAGES_REDUCER = (state = { isLoading: true, isPosting: false, messages: { _id: '', userId: '', isTyping: false, messages: [] }, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_SINGLE_USER_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isPosting: false,
                messages: action.payload,
                errMess: null,
            };
        case ActionTypes.GET_SINGLE_USER_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                isPosting: false,
                messages: null,
                errMess: action.payload,
            };
        case ActionTypes.GET_SINGLE_USER_MESSAGE_LOADIND:
            return {
                ...state,
                isLoading: true,
                isPosting: false,
                messages: null,
                errMess: null,
            };
        //adding new message
        case ActionTypes.POST_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isPosting: false,
                messages: {
                    ...state.messages,
                    messages: [...state?.messages?.messages, action.payload.message]
                },
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