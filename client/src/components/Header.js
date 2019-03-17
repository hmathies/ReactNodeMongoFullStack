import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import ParticleComponent from './ParticleComponent';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: false //This is where I am having problems
    };

    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 1450 });
  }

  renderContent() {
    switch ( this.props.auth ) {
      case null:
        return;
      case false:
        return ( <li>
          <a href="/auth/google">Login With Google</a>
        </li> );
      default:
        return [

          <li key="3" style={{marginRight:"10px"}}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="1">
            <Payments/>
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    const isDesktop = this.state.isDesktop;
    return ( <nav style={{minHeight: "100px"}}>

      <div className="nav-wrapper teal darken-4" style={{fontFamily: 'Montserrat Alternates'}}>
        {isDesktop ? (
          <ParticleComponent />
        ): ""}

        <Link to={this.props.auth
            ? "/surveys"
            : "/"} className="left brand-logo">
          Emaily
        </Link>

        <ul className="right" style={{padding:"10px"}}>{this.renderContent()}</ul>
      </div>

    </nav> );
  }
}
function mapStateToProps( { auth } ) {
  return { auth };
}

export default connect( mapStateToProps )( Header );
