import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth_Reducer } from './reducers/authReducer';
import { DP_UPLOAD_Reducer } from './reducers/dpUploadReducer';
import { Search_Users_Reducer } from './reducers/searchUserReducer'
import { NOTIFICATIONS_REDUCER } from './reducers/notificationReducer';
import { NOTIFICATIONS_BADGE_REDUCER } from './reducers/notificBadgeReducer';
import { FOLLOW_USER_REDUCER } from './reducers/followUserReducer';
import { GET_CONTACTS_REDUCER } from './reducers/getContactsReducer';



export const configureStore = () => {
    const store = createStore(
        combineReducers(
            {
                user: Auth_Reducer,
                dpUpload: DP_UPLOAD_Reducer,
                searchedUsers: Search_Users_Reducer,
                notifications: NOTIFICATIONS_REDUCER,
                notificationsBadge: NOTIFICATIONS_BADGE_REDUCER,
                followedUser: FOLLOW_USER_REDUCER,
                contacts: GET_CONTACTS_REDUCER,
            }
        ), applyMiddleware(thunk, logger)
    );

    return store;
}