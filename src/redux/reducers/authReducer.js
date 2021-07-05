import * as ActionTypes from '../actionTypes';

export const Auth_Reducer = (state = { isLoading: false, user: null, errMess: null, succes: false }, action) => {

    switch (action.type) {
        case ActionTypes.SIGNUP_SUCCES:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                succes: true,
                errMess: null,
            };
        case ActionTypes.SIGNUP_FAILED:
            return {
                ...state,
                isLoading: false,
                user: null,
                succes: false,
                errMess: action.payload.errMess,
            };
        case ActionTypes.SIGNUP_LOADING:
            return {
                ...state,
                isLoading: true,
                user: null,
                succes: false,
                errMess: null,
            };
        default:
            return state;
    }
}