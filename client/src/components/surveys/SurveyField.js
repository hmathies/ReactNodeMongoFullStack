// SurveyField contains logic to render a single label and text input
import React from "react";
// the props are coming from the Field in redux-form
// es6 syntax is the curly braces with input which is one of the props destructured
// the validation error object is in the meta
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        style={{
          marginTop: "5px"
        }}
      />
      <div
        className="red-text"
        style={{
          marginBottom: "20px"
        }}
      >
        {touched && error}
      </div>
    </div>
  );
};
