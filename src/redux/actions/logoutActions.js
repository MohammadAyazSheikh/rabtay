import * as ActionTypes from '../actionTypes';

export const logoutSuccess = () => (
    {
        type: ActionTypes.LOGOUT_SUCCES,
    }
)

export const logoutFailed = (errMess) => (
    {
        type: ActionTypes.LOGOUT_FAILED,
        payload: errMess
    }
)

export const logoutLoading = () => ({
    type: ActionTypes.LOGOUT_FAILED,
});


export const Logout = () => (dispatch) => {

    dispatch(logoutLoading());
    dispatch(logoutSuccess());
}