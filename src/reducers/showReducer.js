import { SET_SHOW } from '../actions/types';

const initState = {
    show: 'All'
};

export default function showReducer(state = initState, payload) {
    switch (payload.type) {
        case SET_SHOW:
          return {
            show: payload.show
        }
      default:
        return state;
    }
}