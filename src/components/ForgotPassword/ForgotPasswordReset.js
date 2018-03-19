import React from 'react';
import './ForgotPassword.scss';
import logo from '../../images/jinglz__logo.png';
import icon_error from '../../images/icons/ic_alert_yellow.png';
import icon_ok from '../../images/icons/ic_checkmark.png';
import InputField from '../common/InputField';

export default class ForgotPassword extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.resetPasswordAction({...this.props.locationQuery, ...this.props.resetPassword});
  }

  render() {
    let errorStyle, errorText, defaultStyle, successStyle;
    if (this.props.resetPassword && this.props.resetPassword.error) {
      errorStyle = {visibility: 'visible'};
      errorText = this.props.resetPassword.error;
    } else {
      errorStyle = {visibility: 'hidden'};
      errorText = '';
    }
    if (this.props.resetPassword && this.props.resetPassword.info) {
      successStyle = {visibility: 'visible'};
      defaultStyle = {visibility: 'hidden'};
    } else {
      defaultStyle = {visibility: 'visible'};
      successStyle = {visibility: 'hidden'};
    }
    return (
      <div className="forgot-password">

        <div className="g-login__header">
          <div className="g-login__logo">
            <img src={logo} alt="logo"/>
          </div>
        </div>

        <div className="forgot-password__container">
          <div className="forgot-password__content">

            <div className="g-login__error" style={errorStyle}>
              <div className="g-login__error-icon">
                <img src={icon_error} alt="icon_error"/>
              </div>
              <div className="g-login__error-text">
                <span>{errorText}</span>
              </div>
            </div>

            <div className="restore-password__form-header">
              <div>Restore password</div>
            </div>

            <div className="forgot-password__task" style={defaultStyle}>
              <span>To make changes please type new password</span>
            </div>

            <form style={defaultStyle}>
              <div className="forgot-password__form">
                <div className="forgot-password__input">
                  <InputField
                    placeholder="New password"
                    type="text"
                    actionType="password"
                    onChange={this.props.changeResetPasswordField} />
                </div>
                <div className="forgot-password__input">
                  <InputField
                    placeholder="Retype new password"
                    type="text"
                    actionType="password_repeat"
                    onChange={this.props.changeResetPasswordField} />
                </div>
              </div>
              <div className="forgot-password__submit">
                <button onClick={this.handleSubmit}>Continue</button>
              </div>
            </form>

            <div className="restore-password__success" style={successStyle}>
              <div className="restore-password__success_text">
                <div><img src={icon_ok} alt="icon_ok"/></div>
                <div>Your password has been changed</div>
              </div>

              <a href="/signIn">
                <button>Go to login page</button>
              </a>
            </div>

          </div>
        </div>

      </div>
    );
  }
}