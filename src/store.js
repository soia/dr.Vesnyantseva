import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

let middleware = [thunkMiddleware];

if (process.env.REACT_APP_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middleware = [...middleware, loggerMiddleware];
}

const store = createStore(
    rootReducer,
    applyMiddleware(
        ...middleware,
    ),
);

export default store;
