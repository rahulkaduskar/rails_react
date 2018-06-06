import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import persistState from 'redux-localstorage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import promise from 'redux-promise';
import axios from 'axios';
import { reducer as formReducer } from 'redux-form';
import auth from './reducers/reducer_auth';
import UsersReducer from './reducers/reducer_users';
import ConsentsReducer from './reducers/reducer_consents';

import App from './app';

const history = createHistory();

const loggerMiddleware = createLogger();
const middlewares= applyMiddleware(loggerMiddleware, thunkMiddleware);

const enhancer = compose(
  middlewares,
  persistState('auth', { key: 'auth' })
);

const store = createStore(
  combineReducers({
    users: UsersReducer,
    consents: ConsentsReducer,
    form: formReducer,
    auth: auth
  }), {}, enhancer);


ReactDOM.render(
  <Provider store={store}>
    <div>
      <App></App>
    </div>
  </Provider>
  , document.querySelector('.app'));
