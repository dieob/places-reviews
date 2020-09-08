import { IS_LOADING, IS_NOT_LOADING } from '../actions/types';

export default function loaderReducer(state = [], action) {
    switch (action.type) {
        case IS_LOADING:
          return action.loader;
        case IS_NOT_LOADING:
          return action.loader;
      default:
        return state;
    }
}