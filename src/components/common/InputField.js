import React from 'react';
import icon_alert from '../../images/icons/ic_alert_yellow.png';
import icon_alert_red from '../../images/icons/ic_alert_red.png';
import icon_ok from '../../images/icons/ic_checkmark.png';
import classNames from 'classnames';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderFlag : false,
      inputField: '',
      hovered: false,
      error: false,
    };
  }

  onMouseOver = () => {
    this.setState({ hovered:true });
  }

  onMouseOut = () => {  
    this.setState({ hovered:false });
  }

  clearInput = () => (
    this.setState({
      ...this.state,
      placeholderFlag: false,
      inputField: '',
    }))

  componentDidMount() {
    let validationRule;
    let validationErrorMessage;
    switch(this.props.type) {
      case 'email':
        validationRule = new RegExp(/^[\w-.+]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        validationErrorMessage = 'Please, enter a valid email';
        break;
      case 'password':
        validationRule = new RegExp(/^[a-zA-Z0-9]{6,}/);
        validationErrorMessage = 'Password should be not less than 6 symbols';
        break;
      default:
        break;
    }

    if (this.props.val) {
      this.setState({
        inputField: this.props.val,
        placeholderFlag: true
      });
    }

    switch (this.props.actionType) {
      case 'phone_number_primary':
        validationRule = new RegExp(/^[0-9]{10}$/);
        validationErrorMessage = 'Phone must contain only numbers and be with length 10';
        break;
      case 'password_repeat':
        validationRule = new RegExp(/^[a-zA-Z0-9]{6,}/);
        validationErrorMessage = 'Password should be not less than 6 symbols';
        break;
      case 'promo_code':
        validationRule = new RegExp(/[\W_]/gi);
        validationErrorMessage = 'Promotion code which you\'ve entered is invalid. Please Contact us to get more details';
        break;
      default:
        break;
    }

    this.setState({
      validationRule: validationRule,
      validationErrorMessage: validationErrorMessage
    });
  }

  validate = (str) => {
    return this.state.validationRule.test(str);
  }

  handleInputChange = (e) => {
    if (this.props.type === 'email'
    || this.props.type === 'password'
    || this.props.actionType === 'phone_number_primary'
    ) {
      this.setState({error: !this.validate(e.target.value)});
    }

    this.setState({inputField: e.target.value});

    if (this.props.onChange && this.props.actionType) {
      this.props.onChange(this.props.actionType, e.target.value);
    } else if (this.props.onChange) {
      this.props.onChange(this.props.type, e.target.value);
    }
  }

  handleKeyPress = (e) => {
    if (((e.key === 'Enter') || (e.charCode === 32)) && !!this.props.onClickEnter) {
      this.props.onClickEnter();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.val !== newProps.val) {
      this.setState({
        inputField: newProps.val,
        placeholderFlag: true
      });
    }
  }

  render() {
    let errorStyle = {display: 'none'}, successStyle = {display: 'none'};
    if (this.props.error && this.props.error.length > 0) {
      errorStyle = {display: 'block'}
    }
    if (this.props.match && !this.props.error) {
      successStyle = {display: 'block'};
    }
    if (this.state.error) {
      errorStyle = {display: 'block'};
      successStyle = {display: 'none'};
    }

    const styles = classNames({
      'password-input-style': this.props.type === 'password',
      capitalized: this.props.capitalize,
    });

    return(
      <div className="g-inputfield">
        <span
          onClick={() => this.refs.inputField.focus()}
          className={this.state.placeholderFlag ? "g-placeholder_default g-placeholder_active" :"g-placeholder_default"}>
          {this.props.placeholder}
        </span>
        <input
          value={this.state.inputField}
          ref="inputField"
          className={styles}
          autoComplete="off"
          type={this.props.type} name={this.props.type}
          onChange={this.handleInputChange}
          onFocus={() => this.setState({placeholderFlag: true})}
          onBlur={() => this.state.inputField && this.state.inputField.length>0 ? null : this.setState({placeholderFlag: false})} 
          onKeyPress={this.handleKeyPress} />
        <div
          className="g-inputfield_error" 
          style={errorStyle} 
          onMouseOver={this.onMouseOver} 
          onMouseOut={this.onMouseOut} >
            <img src={this.props.redError ? icon_alert_red : icon_alert} alt="error"/>
          </div>
        <div className="g-inputfield_ok" style={successStyle}>
          <img src={icon_ok} alt="ok"/>
        </div>
        <div className={this.props.redError ? "g-inputfield__error-message_red" : "g-inputfield__error-message"}
          style={this.state.hovered ? {display: 'block'} : {display: 'none'}}>
          {this.state.validationErrorMessage ? this.state.validationErrorMessage : this.props.error}
        </div>
      </div>
    );
  }
}
