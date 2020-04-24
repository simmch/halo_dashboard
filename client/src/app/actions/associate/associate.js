import {
    GET_ALL_ASSOCIATES,
    // GET_ASSOCIATE_BY_ID,
    // SAVE_NEW_ASSOCIATE,
    // DELETE_ASSOCIATE_BY_ID,
    SET_ERROR_ALERT,
    SET_SUCCESS_ALERT,
} from '../../actionTypes/types';
import { loadUser } from '../../actions/auth/auth';
import axios from 'axios';


export const loadAssociates = () => async (dispatch) => {
    try {
        const res = await axios.get("/payroll/records/associates/all");
        dispatch({
            type: GET_ALL_ASSOCIATES,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        console.log(err)
    }
}

export const saveAssociate = (data) => async dispatch => {
    try {
        const res = await axios.post("/payroll/associate/new", data);
        console.log(res)
        dispatch({
            type: SET_SUCCESS_ALERT,
            payload: res.data.success[0].msg
        })
        // window.location.reload()
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

export const deleteAssociate = (id) => async dispatch => {
    try {
        const res = await axios.delete(`payroll/records/associate/remove/${id}`)

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
