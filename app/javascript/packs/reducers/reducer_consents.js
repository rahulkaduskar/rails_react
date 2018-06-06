import LOAD_CONSENTS from '../actions/consents.js';


export default function(state = {}, action) {
  switch (action.type) {
  case LOAD_CONSENTS:
    return action.payload.data;
  default:
    return state;
  }
}
