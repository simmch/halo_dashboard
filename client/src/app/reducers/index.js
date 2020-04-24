import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alerts";
import upload from "./upload";
import paydates from "./paydates";
import payroll from "./payroll";
import associate from "./associate"

export default combineReducers({
  auth,
  alert,
  upload,
  paydates,
  payroll,
  associate
});
