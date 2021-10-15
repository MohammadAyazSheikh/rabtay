import * as ActionTypes from '../actionTypes';

export const Search_Users_Reducer = (state = { isLoading: false, users: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.SEARCH_USER_SUCCES:
            return {
                ...state,
                isLoading: false,
                users: action.payload,
                errMess: null,
            };
        case ActionTypes.SEARCH_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                users: null,
                errMess: action.payload,
            };
        case ActionTypes.SEARCH_USER_LOADING:
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