import { combineReducers } from "redux";
// using the reducer function from redux-form. with es6 we can rename using the key work `as`
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
