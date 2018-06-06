import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/posts.js';


export default function(state = {}, action) {
  switch (action.type) {
  case DELETE_POST:
    return _.omit(state, action.payload);
  case FETCH_POSTS:
    return action.payload.data.posts;
  case FETCH_POST:
    return action.payload.data.post;
  default:
    return state;
  }
}
