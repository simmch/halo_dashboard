import {
    GET_DATA_BY_DATE,
    GET_DATA_BY_ID,
    DELETE_DATA_BY_ID,
    SET_ERROR_ALERT,
    SET_SUCCESS_ALERT,
} from '../../actionTypes/types';
import { loadUser } from '../auth/auth';
import { removeAlert } from '../alerts';
import axios from 'axios';

export const getPayrollByDate = (date) => async dispatch => {
    try {
        const res = await axios.get(`/payroll/records/sheet_date/${date}`);
        dispatch({
            type: GET_DATA_BY_DATE,
            payload: res.data,
        })
        removeAlert();
        dispatch(loadUser());
    } catch (err) {
        console.log(err)

        const error = err.response.data.errors[0].msg;

        dispatch({
            type: SET_ERROR_ALERT,
            payload: error
        })

        dispatch(loadUser());
    }
}

export const getPayrollById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/payroll/records/euid/${id}`)
        dispatch({
            type: GET_DATA_BY_ID,
            payload: res.data,
        })
        dispatch(removeAlert());
        dispatch(loadUser());
    } catch (err) {
        console.log(err)
        const error = err.response.data.errors[0].msg;

        dispatch({
            type: SET_ERROR_ALERT,
            payload: error
        })

        dispatch(loadUser());

    }
}

export const saveNewRecord = (data) => async dispatch => {
    try {
        const res = await axios.post('/payroll/records/new', data)
        dispatch({
            type: SET_SUCCESS_ALERT,
            payload: res.data.success[0].msg
        })
        dispatch(loadUser());
    } catch (err) {
        console.log(err)
        const error = err.response.data.errors[0].msg;

        dispatch({
            type: SET_ERROR_ALERT,
            payload: error
        })

        dispatch(loadUser());

    }
}

export const deleteById = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/payroll/records/remove/${id}`)

        dispatch({
            type: SET_SUCCESS_ALERT,
            payload: res.data.success[0].msg
        })
        dispatch(loadUser());
    } catch (err) {
        const error = err.response.data.errors[0].msg;
        dispatch({
            type: SET_ERROR_ALERT,
            payload: error
        })

        dispatch(loadUser());
    }
}

export const updateById = (id, data) => async dispatch => {
    try {
        const res = await axios.put(`/payroll/records/update/${id}`, data);
        dispatch({
            type: SET_SUCCESS_ALERT,
            payload: res.data.success[0].msg
        })
        dispatch(loadUser());
    } catch (err) {
        const error = err.response.data.errors[0].msg;
        dispatch({
            type: SET_ERROR_ALERT,
            payload: error
        })

        dispatch(loadUser());
    }
}