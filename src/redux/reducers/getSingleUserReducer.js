import * as ActionTypes from '../actionTypes';

export const Single_User_Reducer = (state = { isLoading: false, user: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_SINGLE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                errMess: null,
            };
        case ActionTypes.GET_SINGLE_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                user: null,
                errMess: action.payload,
            };
        case ActionTypes.GET_SINGLE_USER_LOADING:
            return {
                ...state,
                isLoading: true,
                user: null,
                errMess: null,
            };
        default:
            return state;
    }
}