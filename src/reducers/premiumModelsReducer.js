import { FETCH_PREMIUM_MODELS } from '../actions/types';

export default function bestModelsReducer(state = [], action) {
  switch (action.type) {
      case FETCH_PREMIUM_MODELS:
        return action.premiummodels;
    default:
      return state;
  }
}