import * as ActionTypes from '../actionTypes';

export const ON_VIDEO_CALL = (state = { isLoading: true, onVideoCall: false, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.ON_VIDEO_CALL_START:
            return {
                ...state,
                isLoading: false,
                onVideoCall: true,
                errMess: null,
            };
        case ActionTypes.ON_VIDEO_CALL_END:
            return {
                ...state,
                isLoading: false,
                onVideoCall: false,
                errMess: null,
            };
        case ActionTypes.ON_VIDEO_CALL_FAILED:
            return {
                ...state,
                isLoading: false,
                onVideoCall: false,
                errMess: action.payload,
            };
        case ActionTypes.ON_VIDEO_CALL_LOADIND:
            return {
                ...state,
                isLoading: true,
                onVideoCall: false,
                errMess: null
            };
        default:
            return state;
    }
}