// Reducer
import {REQUEST, RECEIVED, FAILED, SIGNOUT } from '../actions/auth.js';

// Reducer
export default function(state = initialState, action = {}) {
  switch (action.type) {
  case REQUEST:
    return Object.assign(
      {},
      state,
      {
        loading: true
      }
    );
  case RECEIVED:
    return Object.assign(
      {},
      state,
      {
        loading: false,
        isAuthenticated: true,
        uid: action.uid,
        client: action.client,
        accessToken: action.accessToken,
        expiry: action.expiry
      }
    );
  case FAILED:
    return Object.assign(
      {},
      state,
      {
        loading: false
      }
    );
  case SIGNOUT:
    return Object.assign(
      {},
      initialState
    );
  default: return state;
  }
}

const initialState = {
  loading: false,
  isAuthenticated: false,
  client: null,
  accessToken: null,
  uid: null,
  expiry: null
};