import rootReducer from "./reducers";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';

const loggerMiddleware: any = createLogger();
export default createStore(rootReducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
    )
);