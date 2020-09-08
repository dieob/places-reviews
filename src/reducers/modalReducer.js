import { HIDE_MODAL } from '../actions/types';

const initState = {
    isOpen: false,
    message: ''
};

export default function modalReducer(state = initState, payload) {
    if (payload.message) {
        return {
            isOpen: true,
            message: payload.message
        }
    } else if (payload.type === HIDE_MODAL) {
        return {
            isOpen: false,
            message:''
        }
    }
    return state;
}