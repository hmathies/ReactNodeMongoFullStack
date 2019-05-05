// SurveyNew shows SurveyFOrm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  //the below state code is equivalent to writing out the constructor code
  state = {
    showFormReview: false
  };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
// using reduxForm below so that when a user navigates away from
//the survey form or survey form review with `Cancel` the form values are dumped
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
