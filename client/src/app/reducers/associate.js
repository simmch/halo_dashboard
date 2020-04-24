import {
    GET_ALL_ASSOCIATES,
    GET_ASSOCIATE_BY_ID,
    SAVE_NEW_ASSOCIATE,
    DELETE_ASSOCIATE_BY_ID
} from '../actionTypes/types';

const initialState = {
    associate: [],
    loading: true,
    alert: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_ASSOCIATES:
        case GET_ASSOCIATE_BY_ID:
            return { ...state, associate: payload, loading: false }
        case SAVE_NEW_ASSOCIATE:
            return { ...state, alert: payload }
        case DELETE_ASSOCIATE_BY_ID:
            return { ...state, alert: payload }
        default:
            return state;
    }
}