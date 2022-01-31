import * as ActionTypes from '../actionTypes';

export const NOTIFICATIONS_REDUCER = (state = { isLoading: true, VideoCallToken: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.GET_VIDEO_CALL_TOKEN_SUCCES:
            return {
                ...state,
                isLoading: false,
                VideoCallToken: action.payload.token,
                errMess: null,
            };
        case ActionTypes.GET_VIDEO_CALL_TOKEN_FAILED:
            return {
                ...state,
                isLoading: false,
                VideoCallToken: null,
                errMess: action.payload.err,
            };
        case ActionTypes.GET_VIDEO_CALL_TOKEN_LOADIND:
            return {
                ...state,
                isLoading: true,
                VideoCallToken: null,
                errMess: null
            };
        default:
            return state;
    }
}