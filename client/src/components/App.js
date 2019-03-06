//this file is responsible for the view layer of the app
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import ParticleComponent from './ParticleComponent';

class App extends Component {
  componentDidMount() {
    this
      .props
      .fetchUser();
  }

  render() {
    return ( <BrowserRouter>
      <div>
        <Header/>

        <div className="container">

          <Route exact={true} path="/" component={Landing}/>
          <Route exact={true} path="/surveys" component={Dashboard}/>
          <Route path="/surveys/new" component={SurveyNew}/>
        </div>
      </div>
    </BrowserRouter> );
  }
}

export default connect( null, actions )( App );
