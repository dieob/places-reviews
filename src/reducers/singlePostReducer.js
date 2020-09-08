import { SET_SINGLE_POST_DATA } from '../actions/types';

export default function singlePostReducer(state = [], action) {
  switch (action.type) {
      case SET_SINGLE_POST_DATA:
        return action.singlePost
    default:
      return state;
  }
}