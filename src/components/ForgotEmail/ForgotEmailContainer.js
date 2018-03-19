import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import action from '../../actions/recoverActions';
import ForgotEmail from './ForgotEmail';

class ForgotEmailContainer extends Component {

  render() {
    return(
      <ForgotEmail {...this.props} />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    recoverEmail: state.recoverReducer.recoverEmail,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...action,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotEmailContainer);
