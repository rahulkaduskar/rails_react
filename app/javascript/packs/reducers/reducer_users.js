import { profile } from '../actions/users.js';
export const HANDLE_XHR_ERROR = 'handle_xhr_error';

export default function(state = {}, action) {
  if (action.error) {
    action.type = HANDLE_XHR_ERROR; // change the type
  } 
  switch (action.type) {
  case profile:
    return action.payload.data;
  default:
    return state;
  }
}
