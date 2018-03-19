import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import action from '../../actions/mainLayoutActions';

import MainLayout from './MainLayout';

class MainContainer extends React.Component {
  render() {
    return(
      <MainLayout {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    mainLayout: state.mainLayoutReducer,
    autHeader: state.signInReducer.autHeader,
    currentCampaign: state.mainLayoutReducer.currentCampaign,
    alertContactUsObj: state.mainLayoutReducer.alertContactUsObj,
    currentUser: state.signInReducer.user,
    repeatBudget: state.mainLayoutReducer.repeatBudget
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
		...action,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
