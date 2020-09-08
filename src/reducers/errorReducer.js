import { HIDE_ERROR } from '../actions/types';

const initState = {
    error: null,
    isOpen: false,
    errorMessage: ''
};

export default function errorReducer(state = initState, payload) {
    if (payload.error) {
        return {
            error: payload.error,
            isOpen: true,
            errorMessage: payload.errorMessage
        }
    } else if (payload.type === HIDE_ERROR) {
        return {
            error: null,
            isOpen: false,
            errorMessage:''
        }
    }

    return state;
}