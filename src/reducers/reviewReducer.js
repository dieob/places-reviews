import { CREATE_REVIEW } from '../actions/types';

export default function reviewReducer(state = [], action) {
  switch (action.type) {
      case CREATE_REVIEW:
        return [...state, action.review];
    default:
      return state;
  }
}