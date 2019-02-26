// SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import _ from "lodash";
// reduxForm takes care of calling action creators, pulling data out of our store and providing it to other componenets for us
// the Field component from reduxForm renders any type of traditional html form elements
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom'
import SurveyField from "./SurveyField";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title"
  }, {
    label: "Subject Line",
    name: "subject"
  }, {
    label: "Email Body",
    name: "body"
  }, {
    label: "Recipient List",
    name: "emails"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map( FIELDS, ( { label, name } ) => {
      return ( <Field key={name} component={SurveyField} type="text" label={label} name={name}/> );
    } );
  }
  render() {
    return ( <div>
      <form onSubmit={this
          .props
          .handleSubmit( values => console.log( values ) )}>
        {/*  3 required properties of Field: 1) name property can be anything... we are telling reduxForm to store the field with the name property as the key
    2)component property is telling reduxForm what element tag to use. ** it is common to replace component with a custom react component 3) type is what the input should be*/
        }
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
        <button type="submit" className="teal btn-flat right white-text">Next
          <i className='material-icons right'>done</i>
        </button>
      </form>
    </div> );
  }
}
// the values object is the object data that is submitting in the form
function validate( values ) {
  const errors = {};

  if ( !values.title ) {
    errors.title = "You must provide a title";
  }

  return errors;
}
//reduxForm can be thought of as nearly identical to the redux connect helper
// iot requires one option which is 'form' and the value 'surveyForm' which has a purpose of ???? to passed inside the object
export default reduxForm( { validate, form: "surveyForm" } )( SurveyForm );
