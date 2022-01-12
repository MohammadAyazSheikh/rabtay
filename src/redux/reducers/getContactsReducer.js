import * as ActionTypes from '../actionTypes';

export const GET_CONTACTS_REDUCER = (state = { isLoading: true, contacts: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_CONTACTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                contacts: action.payload,
                errMess: null,
            };
        case ActionTypes.GET_CONTACTS_FAILED:
            return {
                ...state,
                isLoading: false,
                contacts: null,
                errMess: action.payload,
            };
        case ActionTypes.GET_CONTACTS_LOADIND:
            return {
                ...state,
                isLoading: true,
                contacts: null,
                errMess: null,
            };
        default:
            return state;
    }
}