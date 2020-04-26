import uuid from 'uuid';
import { SET_SUCCESS_ALERT, SET_ERROR_ALERT, REMOVE_ALERT } from '../actionTypes/types';
import { loadUser } from './auth/auth';

export const setSuccessAlert = (msg, alertType) => async dispatch => {
    const id = uuid.v4();

    dispatch({
        type: SET_SUCCESS_ALERT,
        payload: { msg, alertType, id }
    })

}

export const setErrorAlert = (msg, alertType) => async dispatch => {
    const id = uuid.v4();

    dispatch({
        type: SET_ERROR_ALERT,
        payload: { msg, alertType, id }
    })
}

export const removeAlert = () => async dispatch => {
    dispatch({
        type: REMOVE_ALERT,
    })
    dispatch(loadUser());
}