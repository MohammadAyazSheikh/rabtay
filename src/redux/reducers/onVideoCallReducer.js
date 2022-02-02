import * as ActionTypes from '../actionTypes';

export const ON_VIDEO_CALL = (state = { isLoading: true, onVideoCall: false, errMess: null, roomName: null, contact: null, endCall: false }, action) => {

    switch (action.type) {
        case ActionTypes.ON_VIDEO_CALL_START:
            return {
                ...state,
                isLoading: false,
                onVideoCall: true,
                errMess: null,
                roomName: action.payload.roomName,
                contact: action.payload.contact,
                endCall: false
            };
        case ActionTypes.ON_VIDEO_CALL_END:
            return {
                ...state,
                isLoading: false,
                onVideoCall: false,
                errMess: null,
                roomName: null,
                contact: null,
                endCall: true
            };
        case ActionTypes.ON_VIDEO_CALL_FAILED:
            return {
                ...state,
                isLoading: false,
                onVideoCall: false,
                errMess: action.payload,
                roomName: null,
                contact: null,
                endCall: false
            };
        case ActionTypes.ON_VIDEO_CALL_LOADIND:
            return {
                ...state,
                isLoading: true,
                onVideoCall: false,
                errMess: null,
                roomName: null,
                contact: null,
                endCall: false
            };
        case ActionTypes.ON_VIDEO_CALL_RESET:
            return {
                ...state,
                isLoading: false,
                onVideoCall: false,
                errMess: null,
                roomName: null,
                contact: null,
                endCall: false
            };
        default:
            return state;
    }
}