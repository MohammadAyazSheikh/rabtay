import * as ActionTypes from '../actionTypes';

export const VIDEO_CALL_TOKEN = (state = { isLoading: true, videoCallToken: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_VIDEO_CALL_TOKEN_SUCCES:
            return {
                ...state,
                isLoading: false,
                videoCallToken: action.payload.token,
                errMess: null,
            };
        case ActionTypes.GET_VIDEO_CALL_TOKEN_FAILED:
            return {
                ...state,
                isLoading: false,
                videoCallToken: null,
                errMess: action.payload,
            };
        case ActionTypes.GET_VIDEO_CALL_TOKEN_LOADIND:
            return {
                ...state,
                isLoading: true,
                videoCallToken: null,
                errMess: null
            };
        default:
            return state;
    }
}