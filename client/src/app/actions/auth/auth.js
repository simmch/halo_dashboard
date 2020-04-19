import axios from "axios";
import setAuthToken from "../../utils/auth/setAuthToken";
import { removeAlert } from "../alerts"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_SUCCESS_ALERT,
  SET_ERROR_ALERT,
} from "../../actionTypes/types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    removeAlert();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register New User
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/users/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

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
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // dispatch(loadUser())
  } catch (err) {
    const error = err.response.data.errors[0].msg;

    if (error) {
      dispatch({
        type: SET_ERROR_ALERT,
        payload: error
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
