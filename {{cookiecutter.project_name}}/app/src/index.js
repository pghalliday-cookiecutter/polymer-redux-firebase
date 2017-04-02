import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {
  createLogger,
} from 'redux-logger';
import {
  composeWithDevTools,
} from 'redux-devtools-extension';

const logger = createLogger();
const composeEnhancers = composeWithDevTools({
  // devtool options
});

import authReducer from './auth';
import * as auth from './auth';
export {auth as auth};

export default createStore(combineReducers({
  auth: authReducer,
}), composeEnhancers(applyMiddleware(thunk, promise, logger)));
