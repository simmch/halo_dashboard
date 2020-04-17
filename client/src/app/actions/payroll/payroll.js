import {
    GET_ALL_DATA,
    GET_DATA_BY_DATE,
    GET_DATA_BY_ID,
    DELETE_DATA_BY_DATE,
    DELETE_DATA_BY_ID
} from '../../actionTypes/types';
import { loadUser } from '../auth/auth';
import axios from 'axios';

export const getPayrollByDate = (date) => async dispatch => {
    console.log("TRYING TO GET DATA BY DATE")
    try {
        const res = await axios.get(`/payroll/records/sheet_date/${date}`);
        dispatch({
            type: GET_DATA_BY_DATE,
            payload: res.data,
        })
        dispatch(loadUser());
        console.log("Data Loaded")
    } catch (err) {
        console.log(err)
    }
}