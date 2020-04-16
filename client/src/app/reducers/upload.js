import { UPLOAD_FILE } from '../actionTypes/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPLOAD_FILE:
            return { ...state, payload }
        default:
            return state;
    }
}