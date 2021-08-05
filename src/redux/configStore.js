import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth_Reducer } from './reducers/authReducer';
import {DP_UPLOAD_Reducer} from './reducers/dpUploadReducer'

export const configureStore = () => {
    const store = createStore(
        combineReducers(
            {
                user: Auth_Reducer,
                dpUpload:DP_UPLOAD_Reducer
            }
        ), applyMiddleware(thunk, logger)
    );

    return store;
}