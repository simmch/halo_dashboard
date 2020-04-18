import { SET_SUCCESS_ALERT, SET_ERROR_ALERT, REMOVE_ALERT } from "../actionTypes/types";

const initialState = {
    msg: null,
    alertType: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_SUCCESS_ALERT:
            return { ...state, msg: payload, alertType: "success" };
        case SET_ERROR_ALERT:
            return { ...state, msg: payload, alertType: "danger" };
        case REMOVE_ALERT:
            return { ...state, msg: null, alertType: null };
        default:
            return state;
    }
}