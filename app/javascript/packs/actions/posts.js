import axios from '../config/http';

export const RECEIVED = 'RECEIVED';
export const REQUEST = 'REQUEST';

const ROOT_URL = '';

export function fetchPosts() {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}/posts.json`
    });
  };

}

export function fetchPost(id) {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}/posts/${id}`
    });
  };
}

// export function deletePost(id, callback) {
//   const request = axios.delete(`${ROOT_URL}/posts/${id}`).then(() => callback());

//   return {
//     type: DELETE_POST,
//     payload: id
//   }
// }

export function createPost(values) {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}/posts.json`,
      method: 'POST',
      data: values
    });
  }
}

export function updatePost(id, values) {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({ type: REQUEST });
    return axios({
      url: `${ROOT_URL}/posts/${id}.json`,
      method: 'PUT',
      data: values
    });
  }
}

