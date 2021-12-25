import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';


const followUserSuccess = (data) => (
    {
        type: ActionTypes.FOLLOW_USER_SUCCESS,
        payload: data
    }
);

const followUserFailed = (data) => (
    {
        type: ActionTypes.FOLLOW_USER_FAILED,
        payload: data
    }
);

const followUserLoading = () => (
    {
        type: ActionTypes.FOLLOW_USER_LOADIND,
    }
);



export const FollowUser = (token, contactId) => (dispatch) => {

    dispatch(followUserLoading());
    console.log(`\n\n\n\n\n\n\n>>>>>>>>>>>${token}\n\n\n\n\n\n<<<<<<<<<<< ${contactId}\n\n\n\n\n\n\n`)



    fetch(`${baseUrl}users/addcontact`,
        {
            method: 'POST',
            body: JSON.stringify({ contactId:  contactId }),
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }
    )
        .then(response => {
            // alert()
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); //erro if user not found etc
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);  //error if we face problem to connect server
                throw errmess;
            })
        .then((response) => response.json())
        .then(
            data => {
                // dispatch(followUserSuccess(data));
                console.log(`\n\n\n\n====follow User Succes\n${JSON.stringify(data)}======\n\n\n\n`)
            }
        )
        .catch(
            error => {
                console.log('folow User Error', error.message);
                alert('Could follow user\nError: ' + error);
                dispatch(followUserFailed(error.message));
            }
        );

}


