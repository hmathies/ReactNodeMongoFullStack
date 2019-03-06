//form that shows the user their form inputs and allows them to review and go back
import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";
import formFields from './formFields';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom'

//destruturing formFields - so instead of field.name and field.label in the return
//we destructure it with ({name, label}) so we can refer to it as name and label

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({name, label}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  })
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="grey btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
//formValues is being passed as a prop to SurveyFormReview because of code below
//using the withRouter allows this component to know about the history object from react-router
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
