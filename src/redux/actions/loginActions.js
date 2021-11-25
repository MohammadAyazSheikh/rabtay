import { baseUrl } from '../../utilities/config';
import * as ActionTypes from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';


const storeToken = async (value) => {
    try {
        console.log("\n\n\n=======" + value + "====\n\n\n");
        await AsyncStorage.setItem('@Token', value);
        value = await AsyncStorage.getItem('Token');
        console.log("\n\n\n^^^^^" + value + "^^^^^\n\n\n");
    } catch (e) {
        alert(e)
    }
}

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('Token');
        if (value !== null) {
            // We have data!!
            console.log("\n\n\n******" + value + "*****\n\n\n");
        }
        else {
            console.log("\n\n\n****** null token *****\n\n\n");
        }
    } catch (error) {
        console.log('get token error')
    }
};


export const loginSuccess = (user) => (
    {
        type: ActionTypes.AUTH_SUCCES,
        payload: user
    }
)

export const loginFailed = (errMess) => (
    {
        type: ActionTypes.AUTH_FAILED,
        payload: errMess
    }
)

export const loginLoading = () => ({
    type: ActionTypes.AUTH_LOADING,
});


export const Login = (email, pass) => (dispatch) => {

    dispatch(loginLoading());

    return fetch(`${baseUrl}users/login`,
        {
            method: "POST",
            body: JSON.stringify({ username: email, password: pass }),
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

                dispatch(loginSuccess(data));

                console.log(`\n\n\n\n\n\n\n${data.token}\n\n\n\n\n\n`)
                // storeToken('4ffsd4');

                // setTimeout(() => {
                //     getToken();
                // }, 5000);

            }
        )
        .catch(
            error => {
                console.log('post Signup consolog Error', error.message);
                alert('Your signup req could not be posted\nError: ' + error.message);
                dispatch(loginFailed(error.message))
            }
        );
}




