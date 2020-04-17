import { GET_PAY_DATES } from '../actionTypes/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PAY_DATES:
            return [...state, payload];
        default:
            return state;
    }
}