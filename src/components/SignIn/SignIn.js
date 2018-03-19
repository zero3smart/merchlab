import React from 'react';
import './SignIn.css';
import logo from '../../images/jinglz__logo.png';
import icon_check from '../../images/icons/ic_checkmark.png';
import icon_error from '../../images/icons/ic_alert_yellow.png';
import InputField from '../common/InputField';

export default class SignIn extends React.Component {
  handleCheckboxChange = (e) => {
    this.props.changeLoginField('remember');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signInAction(this.props.currentUser);
  }

  render() {
    let errorStyle, errorText;
    if (this.props.error) {
      errorStyle = {visibility: 'visible'};
      errorText = this.props.error === 'Unauthorized' ? 'Invalid email or password' : this.props.error;
    } else {
      errorStyle = {visibility: 'hidden'};
      errorText = '';
    }
    return(
      <div className="login">
        
        <div className="g-login__header">
          <div className="g-login__logo">
            <img src={logo} alt="logo"/>
          </div>

          <div className="login-title" style={{display: 'none'}}>Advertising Management Platform</div>
        </div>

        <div className="login__container">
          <div className="login__content">

            <div className="g-login__error" style={errorStyle}>
              <div className="g-login__error-icon">
                <img src={icon_error} alt="icon_error"/>
              </div>
              <div className="g-login__error-text">
                <span>{errorText}</span>
              </div>    
            </div>

            <div className="login__form-header">
              <div>Sign In</div>
            </div>
            
            <form>
              <div className="login__form">
                <div className="login__input g-clearfix">
                  <InputField placeholder="Email" type="email" onChange={this.props.changeLoginField} />
                </div>
                <div className="login__input">
                  <InputField placeholder="Password" type="password" onChange={this.props.changeLoginField} />              
                </div>
                <div className="login__input_checkbox">
                  <span>Remember me</span>
                  <div className="login__checkbox_icon" onClick={this.handleCheckboxChange}>
                    {
                      this.props.currentUser && this.props.currentUser.remember
                      ? <img src={icon_check} alt="icon_check"/>
                      : <img src={icon_check} alt="icon_check" style={{visibility: 'hidden'}}/>
                    }
                  </div>
                </div>
                <div className="login__submit">
                  <div className="login__button">
                    <button onClick={this.handleSubmit}>Login</button>
                  </div>
                  <div className="login__link_forgot-password">
                    <a href="/forgotPassword">Having trouble logging in?</a>
                  </div>
                </div>
                <div className="login__form-footer">
                  <span>Don't have an account?</span>
                  <a href="/signUp">Sign Up</a>
                </div>
              </div>
            </form>

          </div>

        </div>
      </div>
    );
  }
}