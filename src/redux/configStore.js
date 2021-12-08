import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth_Reducer } from './reducers/authReducer';
import { DP_UPLOAD_Reducer } from './reducers/dpUploadReducer';
import { Search_Users_Reducer } from './reducers/searchUserReducer'
import { NOTIFICATIONS_REDUCER } from './reducers/notificationReducer';


export const configureStore = () => {
    const store = createStore(
        combineReducers(
            {
                user: Auth_Reducer,
                dpUpload: DP_UPLOAD_Reducer,
                searchedUsers: Search_Users_Reducer,
                notifications:NOTIFICATIONS_REDUCER
            }
        ), applyMiddleware(thunk, logger)
    );

    return store;
}