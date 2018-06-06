import axios from '../config/http';
import history from 'history';

// Actions
export const REQUEST = 'REQUEST';
export const RECEIVED = 'RECEIVED';
export const FAILED = 'FAILED';
export const SIGNOUT = 'SIGNOUT';

// Action Creators
export function login(email, password) {
  return (dispatch, getState) => {
    dispatch(startAuthentication());
    return axios({
        url: '/auth/sign_in',
        method: 'POST',
        data: { email, password }
      }).then(response => {
          const uid = response.headers['uid'];
          const client = response.headers['client'];
          const accessToken = response.headers['access-token'];
          const expiry = response.headers['expiry'];
          dispatch(successAuthentication(uid, client, accessToken, expiry));
      });
  };
}

export function signout() {
  return (dispatch, getState) => {
    const { auth } = getState();
    return axios({
      url: '/auth/sign_out',
      method: 'DELETE',
      headers: {
        'accessToken': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid
      }
    }).then(response => {
      localStorage.clear();
      window.location.href = '/';
    });
  };
}

export function sign_up() {
  return (dispatch, getState) => {
    const { auth } = getState();
    return axios({
      url: '/auth/sign_up',
      method: 'post'
    }).then(response => {
      dispatch(doRegistration());
    });
  };
}

export function deleteAccount() {
  return (dispatch, getState) => {
    const { auth } = getState();
    return axios({
      url: '/auth',
      method: 'delete'
    });
  };
}

export function expireAuthentication() {
  return doSignout();
}

function startAuthentication(uid, client, accessToken, expiry) {
  return { type: REQUEST };
}

function doRegistration() {
  return { type: REQUEST };
}

function successAuthentication(uid, client, accessToken, expiry) {
  return { type: RECEIVED, uid, client, accessToken, expiry };
}

function failAuthentication() {
  return { type: FAILED };
}

function doSignout() {
  return { type: SIGNOUT };
}

const initialState = {
  loading: localStorage.getItem('loading'),
  isAuthenticated: localStorage.getItem('isAuthenticated'),
  client: localStorage.getItem('client'),
  accessToken: localStorage.getItem('accessToken'),
  uid: localStorage.getItem('uid'),
  expiry: localStorage.getItem('expiry')
};
