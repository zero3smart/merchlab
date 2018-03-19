import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import action from '../../actions/signInActions';
import SignIn from './SignIn';

class SignInContainer extends Component {
  render() {
    return(
      <SignIn {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.signInReducer.user,
    error: state.signInReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...action
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
