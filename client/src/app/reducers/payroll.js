import {
    GET_ALL_DATA,
    GET_DATA_BY_DATE,
    GET_DATA_BY_ID,
    SAVE_NEW_RECORD,
    DELETE_DATA_BY_DATE,
    DELETE_DATA_BY_ID
} from '../actionTypes/types';

const initialState = {
    payrollData: [],
    loading: true,
    alert: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_DATA:
        case GET_DATA_BY_ID:
        case GET_DATA_BY_DATE:
            return { ...state, payrollData: payload, loading: false }
        case SAVE_NEW_RECORD:
            return { ...state, alert: payload }
        default:
            return state;
    }
}