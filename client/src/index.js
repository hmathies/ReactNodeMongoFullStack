//this file is responsible for the redux setup
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// the purpose of redux-thunk is to allow us to break the rule of requiring
// an action creator has to immediately return an action
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
//devlopment only axios helpers
import axios from 'axios'
window.axios = axios

const store = createStore( reducers, {}, applyMiddleware( reduxThunk ) );

//the Provider needs to wrap the entire application so that all of the components
//  inside our app have access to the store which in turn holds all of the state of our
//  application

ReactDOM.render( <Provider store={store}>
  <App/>
</Provider>, document.querySelector( "#root" ) );
