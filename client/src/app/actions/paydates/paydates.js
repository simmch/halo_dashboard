import { GET_PAY_DATES } from '../../actionTypes/types';
import { loadUser } from '../../actions/auth/auth';
import axios from 'axios';


export const loadDates = () => async (dispatch) => {
    console.log("Loading Dates")
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