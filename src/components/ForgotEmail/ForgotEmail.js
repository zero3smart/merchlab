import React from 'react';
import './ForgotEmail.scss';
import InputField from '../common/InputField';
import arrow_back from '../../images/icons/ic_back.png';
import icon_ok from '../../images/icons/ic_checkmark.png';
import icon_error from '../../images/icons/ic_alert_yellow.png';
import logo from '../../images/jinglz__logo.png';

export default class ForgotEmail extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.recoverEmailAction(this.props.recoverEmail);
  }

  render() {
    let errorStyle, errorText, errorText2, defaultStyle, successStyle, successStyleFlex;
    if (this.props.recoverEmail && this.props.recoverEmail.error) {
      errorStyle = {visibility: 'visible'};
      errorText = this.props.recoverEmail.error === 'No user with such email' ? 'We couldn’t find your email addresses.' : this.props.recoverEmail.error;
      errorText2 = this.props.recoverEmail.error === 'No user with such email' ? 'Please try again' : undefined;
    } else {
      errorStyle = {visibility: 'hidden'};
      errorText = '';
    }
    if (this.props.recoverEmail && this.props.recoverEmail.info) {
      successStyle = {display: 'block'};
      successStyleFlex = {display: 'flex'};
      defaultStyle = {display: 'none'};
    } else {
      defaultStyle = {display: 'block'};
      successStyle = {display: 'none'};
      successStyleFlex = {display: 'none'};
    }
    return(
       <div className="forgot-email">

        <div className="g-login__header">
          <div className="g-login__logo">
            <img src={logo} alt="logo"/>
          </div>
        </div>

        <div className="forgot-email__container">
          <div className="forgot-email__content">

            <div className="g-login__error forgot-email__error-text" style={errorStyle}>
              <div className="g-login__error-icon">
                <img src={icon_error} alt="icon_error"/>
              </div>
              <div className="g-login__error-text">
                <span>{errorText}</span>
                <span>{errorText2}</span>
              </div>
            </div>

            <div className="forgot-email__form-header">
              <div>Forgot email</div>
              <div className="g-arrow-back" style={defaultStyle}>
                <a href="/signIn"><img src={arrow_back} alt="arrow_back"/></a>
              </div>
              <div className="g-arrow-back" style={successStyle}>
                <a href="/forgotEmail"><img src={arrow_back} alt="arrow_back"/></a>
              </div>
            </div>

              <div className="forgot-email__success_text" style={successStyleFlex}>
                <div><img src={icon_ok} alt="icon_ok"/></div>
                <div>
                  <span>We found your email address:</span>
                  <span>
                  {
                    this.props.recoverEmail && this.props.recoverEmail.info
                    ? this.props.recoverEmail.info
                    : null
                  }
                  </span>
                </div>
              </div>

            <div className="forgot-email__task" style={defaultStyle}>
              <span>Please, enter up to three email addresses you
                may have used to create your account. <br/>
                We’ll check to find a match. </span>
            </div>

            <form style={defaultStyle}>
              <div className="forgot-email__form">
                <div className="forgot-email__input">
                   <InputField
                    placeholder="Email 1"
                    type="email"
                    actionType="email_1"
                    onChange={this.props.changeRecoverEmailField} />
                </div>
                <div className="forgot-email__input">
                   <InputField
                    placeholder="Email 2"
                    type="email"
                    actionType="email_2"
                    onChange={this.props.changeRecoverEmailField} />
                </div>
                <div className="forgot-email__input">
                   <InputField
                    placeholder="Email 3"
                    type="email"
                    actionType="email_3"
                    onChange={this.props.changeRecoverEmailField} />
                </div>
              </div>
              <div className="forgot-email__submit" style={defaultStyle}>
                <button onClick={this.handleSubmit}>Continue</button>
              </div>
            </form>

            <div className="forgot-email__submit" style={successStyle}>
              <a href="/signIn"><button>Go to Login Page</button></a>
            </div>

          </div>
        </div>

      </div>
    );
  }
}