import * as ActionTypes from '../actionTypes';
import { baseUrl } from '../../utilities/config';


export const signupSuccess = (user) => (
    {
        type: ActionTypes.AUTH_SUCCES,
        payload: user
    }
)

export const signupFailed = (errMess) => (
    {
        type: ActionTypes.AUTH_FAILED,
        payload: errMess
    }
)

export const signupLoading = () => ({
    type: ActionTypes.AUTH_LOADING,
});


export const Register = (fname, lname, email, pass, dob, gender) => (dispatch) => {

    dispatch(signupLoading());

    const userData = {
        username: email,
        password: pass,
        fname: fname,
        lname: lname,
        dob: new Date(dob),
        gender: gender,
    };



    return fetch(`${baseUrl}users/signup`,
        {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }
    )
        .then(response => {
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
        .then((res) => res.json())
        .then(
            data => {
                //console.log("\n***response**\n\n"+data)
                dispatch(signupSuccess(data));
                //setTimeout(() =>dispatch(signUpSucces(data)),3000) 
            }
        )
        .catch(
            error => {
                console.log('post Signup consolog Error', error.message);
                alert('Your signup req could not be posted\nError: ' + error.message);
                dispatch(signupFailed(error.message))
            }
        );

}