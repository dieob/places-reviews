import { FETCH_POST_DATA, CREATE_POST } from '../actions/types';

export default function postReducer(state = [], action) {
  switch (action.type) {
      case FETCH_POST_DATA:
        return action.posts;
      case CREATE_POST:
        return [...state, action.post];
    default:
      return state;
  }
}