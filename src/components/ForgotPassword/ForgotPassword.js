import React from 'react';
import './ForgotPassword.scss';
import logo from '../../images/jinglz__logo.png';
import icon_error from '../../images/icons/ic_alert_yellow.png';
import arrow_back from '../../images/icons/ic_back.png';
import InputField from '../common/InputField';
import { browserHistory } from 'react-router';

export default class ForgotPassword extends React.Component {

  componentDidMount() {
     if (this.props.location.query.code) {
      browserHistory.push(`/forgotpassword/?user=${this.props.location.query.user}&code=${this.props.location.query.code}`);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.recoverPasswordAction(this.props.recoverPassword);
  }

  render() {
    let errorStyle, errorText;
    if (this.props.recoverPassword && this.props.recoverPassword.error) {
      errorStyle = {visibility: 'visible'};
      errorText = this.props.recoverPassword.error;
    } else {
      errorStyle = {visibility: 'hidden'};
      errorText = '';
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

            <div className="forgot-password__form-header">
              <div>Forgot password</div>
              <div className="g-arrow-back">
                <a href="/signIn"><img src={arrow_back} alt="arrow_back"/></a>
              </div>
            </div>

            <div className="forgot-password__task">
              <span>Please, type your email to create link to restore password</span>
            </div>

            <form>
              <div className="forgot-password__form">
                <div className="forgot-password__input">
                  <InputField placeholder="Email" type="email" onChange={this.props.changeRecoverPasswordField} />
                </div>
              </div>
              <div className="forgot-password__submit">
              {
                this.props.recoverPassword && this.props.recoverPassword.info
                ? <button disabled className="forgot-password__submitted">Check your email</button>
                : <button onClick={this.handleSubmit}>Continue</button>
              }
              </div>
            </form>
            <div className="forgot-password__form-footer">
              <span>Forgot your email address?</span>
              <a href="/forgotEmail">Recover It</a>
            </div>

          </div>
        </div>

      </div>
    );
  }
}