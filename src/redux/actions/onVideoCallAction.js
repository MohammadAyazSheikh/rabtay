import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';



export const OnVideoCallStart = () => (
    {
        type: ActionTypes.ON_VIDEO_CALL_START
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


