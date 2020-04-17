import {
    GET_ALL_DATA,
    GET_DATA_BY_DATE,
    GET_DATA_BY_ID,
    DELETE_DATA_BY_DATE,
    DELETE_DATA_BY_ID
} from '../actionTypes/types';

const initialState = {
    payrollData: [],
    loading: true
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_DATA:
        case GET_DATA_BY_ID:
        case GET_DATA_BY_DATE:
            return { ...state, payrollData: payload, loading: false }
        default:
            return state;
    }
}