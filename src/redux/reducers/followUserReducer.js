import * as ActionTypes from '../actionTypes';

export const FOLLOW_USER_REDUCER = (state = { isLoading: true, users: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.FOLLOW_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload,
                errMess: null,
            };
        case ActionTypes.FOLLOW_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                users: null,
                errMess: action.payload,
            };
        case ActionTypes.FOLLOW_USER_LOADIND:
            return {
                ...state,
                isLoading: true,
                users: null,
                errMess: null,
            };
        default:
            return state;
    }
}