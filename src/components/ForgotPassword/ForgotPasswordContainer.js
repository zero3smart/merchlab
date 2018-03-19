import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import action from '../../actions/recoverActions';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordReset from './ForgotPasswordReset';

class ForgotPasswordContainer extends Component {

  componentDidMount() {
    if (this.props.location.query.code) {
      this.props.saveLocation(this.props.location.query);
    }
  }

  render() {
    if (this.props.locationQuery)
      return <ForgotPasswordReset {...this.props} />;
    else
      return <ForgotPassword {...this.props} />;
  }
}


const mapStateToProps = (state) => {
  return {
    recoverPassword: state.recoverReducer.recoverPassword,
    resetPassword: state.recoverReducer.resetPassword,
    locationQuery: state.recoverReducer.locationQuery,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...action,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
