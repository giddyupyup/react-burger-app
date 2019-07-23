import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const reduxDevTools = process.env.NODE_ENV === 'development'
                      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                      : null;

const composeEnhancers = reduxDevTools || compose;

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
