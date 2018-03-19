import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import action from '../../actions/signUpActions';
import SignUp from './SignUp';

class SignUpContainer extends Component {
  render() {
    return(
      <SignUp {...this.props} />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.signUpReducer,
    user: state.signUpReducer.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...action,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
