import { UPLOAD_FILE, SET_ERROR_ALERT, SET_SUCCESS_ALERT } from '../../actionTypes/types';
import { loadUser } from '../auth/auth';
import axios from 'axios';

export const uploadFile = (file) => async dispatch => {
    console.log("Uploading file start!")

    try {
        const res = await axios.post("/payroll/upload", file);

        dispatch({
            type: UPLOAD_FILE,
            payload: res.data
        })
        const success = res.data.success[0].msg;

        if (success) {
            dispatch({
                type: SET_SUCCESS_ALERT,
                payload: success
            })
        }
        dispatch(loadUser())
    } catch (err) {


        const error = err.response.data.errors[0].msg;

        if (error) {
            dispatch({
                type: SET_ERROR_ALERT,
                payload: error
            });
        }
        dispatch(loadUser())

    }
}