import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }


  renderSurveys() {
    if (!this.props.surveys){
      return null;
    }
    if (!this.props.surveys.length){
      return <div className="flow-text" style={{zIndex: 1, fontFamily: 'Bad Script'}}><h3 style={{fontFamily: 'Bad Script'}}>You don't have any surveys at this time.  Click the plus button to add surveys
      and receive feedback about topics you care about.</h3>
      <img src="https://images.pexels.com/photos/263532/pexels-photo-263532.jpeg?auto=compress&cs=tinysrgb&h=400&w=400"></img>
      <div class="divider"></div>
      <img className="right" style={{display: "inline-block"}} src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=250"></img>

      <h3>Survey Topic Ideas: </h3>

      <ul style={{display: "inline-block", fontSize: "30px"}}>
        <li>Wildlife Conservation</li>
        <li>Favorite Charitites</li>
        <li>Technology News</li>
        <li>Favorite Hobbies</li>
      </ul>
      <div class="divider"></div>
      </div>
    } else{
      return this.props.surveys.reverse().map(survey => {
        return (
          <div className="card lime lighten-5" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p className="truncate">
              {survey.body}
              </p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
            </div>
          </div>
        )
      })
    }


  }

  render() {
    return (
      <div>{this.renderSurveys()}</div>
    )
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
