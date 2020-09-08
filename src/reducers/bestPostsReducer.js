import { FETCH_BEST_POSTS } from '../actions/types';

export default function bestPostsReducer(state = [], action) {
  switch (action.type) {
      case FETCH_BEST_POSTS:
        return action.bestposts;
    default:
      return state;
  }
}