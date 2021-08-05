import * as ActionTypes from '../actionTypes';

export const DP_UPLOAD_Reducer = (state = { isLoading: false, dpUrl:null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.DP_UPLAOD_LOADING:
            return {
                ...state,
                isLoading: true,
                dpUrl: null,
                errMess: null,
            };
        case ActionTypes.DP_UPLAOD_SUCCES:
            return {
                ...state,
                isLoading: false,
                dpUrl: action.payload,
                errMess:null ,
            };
        case ActionTypes.DP_UPLAOD_FAILED:
            return {
                ...state,
                isLoading: false,
                dpUrl: action.payload,
                errMess: action.payload,
            };
        default:
            return state;
    }
}