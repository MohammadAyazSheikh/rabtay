import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';



export const OnVideoCallStart = (roomName) => (
    {
        type: ActionTypes.ON_VIDEO_CALL_START,
        payload: roomName
    }
);


export const OnVideoCallEnd = () => (
    {
        type: ActionTypes.ON_VIDEO_CALL_END
    }
);

export const OnVideoCallLoading = () => (
    {
        type: ActionTypes.ON_VIDEO_CALL_LOADIND
    }
);


export const OnVideoCallFailed = (err) => (
    {
        type: ActionTypes.ON_VIDEO_CALL_FAILED,
        payload: err
    }
);


export const OnVideoCallReset = (err) => (
    {
        type: ActionTypes.ON_VIDEO_CALL_RESET,
        payload: err
    }
);


