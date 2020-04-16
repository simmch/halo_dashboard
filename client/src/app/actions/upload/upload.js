import { UPLOAD_FILE } from '../../actionTypes/types';
import { setAlert } from '../alerts';
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

        const success = res.data.success;

        if (success) {
            success.forEach(success => dispatch(setAlert(success.msg, "success")))
        }
        dispatch(loadUser())
    } catch (err) {
        console.log(err.response.data.errors);

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

    }
}