import axios from '../config/http';
import { expireAuthentication } from './auth';

export const RECEIVED = 'RECEIVED';
export const REQUEST = 'REQUEST';

const ROOT_URL = '/user';


export function profile() {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}.json`
    });
  };
}

export function sign_up(params) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST });
    return axios({
      url: '/auth',
      method: 'post',
      data: params,
    });
  };
}

export function update(values) {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}.json`,
      method: 'put',
      data: values,
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid,
        'expiry': auth.expiry,
        'token-type': 'Bearer'
      }
    });
  };
}

export function deleteAccount() {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}.json`,
      method: 'delete',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid,
        'expiry': auth.expiry,
        'token-type': 'Bearer'
      }
    });
  };
}