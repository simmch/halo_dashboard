import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alerts";
import upload from "./upload";

export default combineReducers({
  auth,
  alert,
  upload,
});
