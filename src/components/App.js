import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import action from '../actions/signInActions';

import './App.css';

const Welcome = () => {
  return(
    <div className="welcome">
      <h1>Jinglz CMS</h1>
    </div>
  );
}

class App extends Component {

  componentDidMount() {
    this.props.checkLoginInfo(this.props.location.pathname);
  }

  render() {
    return (
      <div>
        {
          this.props.children ? this.props.children : <Welcome />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkLoginInfo : action.checkLoginInfo
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
