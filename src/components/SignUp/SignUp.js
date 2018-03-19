import React from 'react';
import './SignUp.css';
import logo from '../../images/jinglz__logo.png';
import icon_check from '../../images/icons/ic_checkmark.png';
import arrow_back from '../../images/icons/ic_back.png';
import InputField from '../common/InputField';
import DropDown from '../common/DropDownList';
import negative_alert from '../../images/icons/ic_alert_red.png';

export default class SignUp extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      alertFlag: false
    };
  }

  handleCheckboxChange = (e) => {
    this.props.changeRegistrationField('termsCheckbox');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUpAction(this.props.currentUser);
  }

  render() {
    let password_match, password_match_flag = false;
    let errors = {};
    if (this.props.currentUser && this.props.currentUser.error) {
      errors = {...this.props.currentUser.error};
    }
    if (this.props.currentUser && this.props.currentUser.user && this.props.currentUser.user.password !== this.props.currentUser.user.password_repeat) {
      password_match = "Password don't match!";
    }
    else if (this.props.currentUser && this.props.currentUser.user && this.props.currentUser.user.password && this.props.currentUser.user.password.length > 0) {
      password_match_flag = true;
    } 
    else if (this.props.currentUser && this.props.currentUser.user && (!this.props.currentUser.user.password || !this.props.currentUser.user.password_repeat)) {
      password_match = "Password don't match!";
    } 

    if (errors.password) {
      password_match = errors.password;
    }

    let message = "You must accept the terms & conditions before continuing"

    return(
      <div className="register">

        <div className="g-login__header">
          <div className="g-login__logo">
            <img src={logo} alt="logo"/>
          </div>
        </div>

        <div className="register__container">
          <div className="register__content">
          
            <div className="register__form-header">
              <div>Sign Up</div>
              <div className="g-arrow-back">
                <a href="/signIn"><img src={arrow_back} alt="arrow_back"/></a>
              </div>
            </div>

            {
              this.props.currentUser.error && this.props.currentUser.error.termsError
              ? (
                  <div className="g-alert_container" style={{'backgroundColor': '#ffe9e5'}}>
                     <img className="g-alert_img_negative"
                      src={negative_alert}
                      alt="alert"/>
                    <p className="g-alert_text" style={{'color': '#d2644f'}}>{message}</p>
                  </div>)
              : null
            }

            <form>
              <div className="register__form">
                
                <div className="register__row">
                  <div className="register__input_300">
                    <InputField 
                      error={errors.email}
                      placeholder="Email*" 
                      type="email" 
                      onChange={this.props.changeRegistrationField} />
                  </div>
                  <div className="register__input_300">
                    <InputField 
                      placeholder="Company name" 
                      type="text" 
                      actionType="company_name"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register__row">
                  <div className="register__input_300">
                    <InputField
                      placeholder="First name*"
                      type="text" 
                      actionType="firstname"
                      capitalize={true}
                      onChange={this.props.changeRegistrationField} />
                  </div>
                  <div className="register__input_300">
                    <InputField 
                      placeholder="Last name*"
                      type="text" 
                      actionType="lastname"
                      capitalize={true}
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register__row">
                  <div className="register__input_300">
                    <InputField 
                      error={password_match ? password_match : errors.password}
                      match={password_match_flag}
                      placeholder="Password*" 
                      type="password" 
                      onChange={this.props.changeRegistrationField} />
                  </div>
                  <div className="register__input_300">
                    <InputField 
                      error={password_match ? password_match : errors.password_repeat}
                      match={password_match_flag}
                      placeholder="Confirm password*" 
                      type="password" 
                      actionType="password_repeat"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register__row">
                  <div className="register__contact-info">CONTACT INFORMATION</div>
                </div>

                <div className="register__row">
                  <div className="register__input_420">
                    <InputField
                      error={errors.phone_number_primary || errors.phone}
                      placeholder="Phone number (primary)*" 
                      type="text" 
                      actionType="phone_number_primary"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                  <div className="register__input_180">
                    <DropDown type="phone"
                      ref={(e) => this.phoneDropDown = e} 
                      placeholder="Type of number"
                      actionType="phone_type_primary"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register__row">
                  <div className="register__input_420">
                    <InputField
                      placeholder="Phone number (alternative)" 
                      type="text" 
                      actionType="phone_number_alternative"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                  <div className="register__input_180">
                    <DropDown type="phone"
                      ref={(e) => this.phoneAltDropDown = e} 
                      placeholder="Type of number"
                      actionType="phone_type_alternative"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register__row">
                  <div className="register__input_420">
                    <InputField
                      placeholder="Address" 
                      type="text" 
                      actionType="address"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                  <div className="register__input_180">
                    <InputField
                      placeholder="City" 
                      type="text" 
                      actionType="city"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register__row">
                  <div className="register__input_240">
                    <DropDown 
                      type="country"
                      ref={(e) => this.countryDropDown = e} 
                      placeholder="Country"
                      actionType="country"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                  <div className="register__input_140">
                    {
                      (()=>{
                        if (this.props.currentUser) {
                          if (this.props.currentUser && this.props.currentUser.country === 'United States') {
                            return (<DropDown 
                                      type="usa_state"
                                      ref={(e) => this.countryDropDown = e} 
                                      placeholder="State"
                                      actionType="state"
                                      onChange={this.props.changeRegistrationField} />);
                          } else if (this.props.currentUser && this.props.currentUser.country === 'Canada') {
                            return (<DropDown 
                                      type="canada_state"
                                      ref={(e) => this.countryDropDown = e} 
                                      placeholder="State"
                                      actionType="state"
                                      onChange={this.props.changeRegistrationField} />);
                          } else return (<InputField
                                        placeholder="State" 
                                        type="text" 
                                        actionType="state"
                                        onChange={this.props.changeRegistrationField} />);
                        } else return null;
                      })()
                    }
                  </div>
                  <div className="register__input_180">
                    <InputField
                      placeholder="Zipcode" 
                      type="text" 
                      actionType="zipcode"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register__row">
                  <div className="register__input_640">
                    <InputField
                      placeholder="Reffered by" 
                      type="text" 
                      actionType="reffer"
                      onChange={this.props.changeRegistrationField} />
                  </div>
                </div>

                <div className="register-form__submit">
                  <div className="register-form__terms">
                    <div>I agree with 
                      <span> Terms of Service</span> and 
                      <span> Privacy Policy Statement</span>
                    </div>
                    <div className="login__checkbox_icon" onClick={this.handleCheckboxChange}>
                    {
                      this.props.currentUser.user && this.props.currentUser.user.termsCheckbox
                      ? <img src={icon_check} alt="icon_check"/>
                      : <img src={icon_check} alt="icon_check" style={{visibility: 'hidden'}}/>
                    }
                    </div>
                  </div>

                  <div className="register-form__submit_button">
                    <button onClick={this.handleSubmit}>Sign Up</button>
                  </div>
                </div>

              </div>
            </form>

          </div>        
        </div>

      </div>
    );
  }
}