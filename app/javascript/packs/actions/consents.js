import axios from '../config/http';

export const RECEIVED = 'RECEIVED';
export const REQUEST = 'REQUEST';

const ROOT_URL = '/consents';

export function loadConsents() {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}.json`
    });
  };
}
