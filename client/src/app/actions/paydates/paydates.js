import { GET_PAY_DATES, SET_SUCCESS_ALERT, SET_ERROR_ALERT } from '../../actionTypes/types';
import { loadUser } from '../../actions/auth/auth';
import axios from 'axios';


export const loadDates = () => async (dispatch) => {
    try {
        const res = await axios.get("/payroll/records/paydates/all");
        dispatch({
            type: GET_PAY_DATES,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        console.log(err)
    }
}

export const saveDate = (date) => async dispatch => {
    try {
        const res = await axios.post("/payroll/records/date/new", date);
        dispatch({
            type: SET_SUCCESS_ALERT,
            payload: res.data.success[0].msg
        })
        window.location.reload()
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
