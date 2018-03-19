import constant from '../constants/signUpConstants';
import axios from 'axios';
import { browserHistory } from 'react-router';
import baseURL from '../constants/common';

const changeRegistrationField = (type, value) => {

  switch (type) {
    case 'email':
      return {type: constant.CHANGE_REGISTRATION_EMAIL, payload: value};
    case 'password':
      return {type: constant.CHANGE_REGISTRATION_PASSWORD, payload: value};
    case 'password_repeat':
      return {type: constant.CHANGE_REGISTRATION_PASSWORD_REPEAT, payload: value};
    case 'firstname':
      return {type: constant.CHANGE_REGISTRATION_FIRSTNAME, payload: `${value.charAt(0).toUpperCase()}${value.slice(1)}`};
    case 'lastname':
      return {type: constant.CHANGE_REGISTRATION_LASTNAME, payload: value};
    case 'phone_number_primary':
      return {type: constant.CHANGE_REGISTRATION_PHONE_NUMBER_PRIMARY, payload: value};
    case 'phone_type_primary':
      return {type: constant.CHANGE_REGISTRATION_PHONE_TYPE_PRIMARY, payload: value};
    case 'phone_number_alternative':
      return {type: constant.CHANGE_REGISTRATION_PHONE_NUMBER_ALTERNATIVE, payload: value};
    case 'phone_type_alternative':
      return {type: constant.CHANGE_REGISTRATION_PHONE_TYPE_ALTERNATIVE, payload: value};
    case 'address':
      return {type: constant.CHANGE_REGISTRATION_ADDRESS, payload: value};
    case 'city':
      return {type: constant.CHANGE_REGISTRATION_CITY, payload: value};
    case 'country':
      return {type: constant.CHANGE_REGISTRATION_COUNTRY, payload: value};
    case 'state':
      return {type: constant.CHANGE_REGISTRATION_STATE, payload: value};
    case 'company_name':
      return {type: constant.CHANGE_REGISTRATION_COMPANY_NAME, payload: value};
    case 'zipcode':
      return {type: constant.CHANGE_REGISTRATION_ZIPCODE, payload: value};
    case 'reffer':
      return {type: constant.CHANGE_REGISTRATION_REFFERED_BY, payload: value};
    case 'termsCheckbox':
      return {type: constant.CHANGE_REGISTRATION_TERMS_CHECKBOX};
    default:
      return {type: constant.UNHANDLED};
  }
}

const signUpAction = (data) => dispatch => {
  let errors = {};
  if (!data.user) {
    errors.email = 'Please, enter your email';
    errors.firstName = 'Please, enter your first name';
    errors.lastName = 'Please, enter your last name';
    errors.phone_number_primary = 'Please, enter your phone';
  }
  if (!data || (data.user && !data.user.email)) {
    errors.email = 'Please, enter your email';
  }
  if (!data || (data.user && !data.user.firstName)) {
    errors.firstName = 'Please, enter your first name';
  }
  if (!data || (data.user && !data.user.lastName)) {
     errors.lastName = 'Please, enter your last name';
  }
  if (!data || (data.user && (data.user.password !== data.user.password_repeat))) {
    errors.password = 'Passwords don\'t match';
  }
  if (!data || (data.user && !data.user.phone)) {
    errors.phone = 'Please, enter your phone';
  }

  if (Object.keys(errors).length !== 0) {
    dispatch({type: constant.RETRIEVED_REGISTRATION_ERROR, payload: errors});
    return ;
  } else if (!data.user.termsCheckbox) {
    dispatch({type: constant.RETRIEVED_REGISTRATION_ERROR, payload: {termsError: "Please, agree with the terms"}});
    return;
  } else {
    dispatch({type: constant.RETRIEVED_REGISTRATION_ERROR, payload: {}});
  }

  const obj = {
    client_id: "X8U5BRZH12",
    client_secret: "VK7ttedbpsAHOIWh5zSicYYNZxssLR",
    user: data.user || {},
  };

  axios.post(`${baseURL}sign-up`,
  obj,
  {headers: {'Content-Type': 'application/json'}})
  .then((res) => {
    sessionStorage.setItem('token', res.headers.authorization);
    dispatch({type: constant.RETRIEVED_REGISTRATION_USER_INFO, payload: res});
    dispatch({type: 'RETRIEVED_LOGIN_USER_INFO', payload: res.data});
    dispatch({type: 'RETRIEVED_AUTHORIZATION_HEADER', payload: res.headers.authorization});
    browserHistory.push('/main/');
  })
  .catch((err) => {
    let errors = {};
    for (let key in err.response.data.error[0].message.errors) {
      if (key)
        errors[key] = err.response.data.error[0].message.errors[key].message;
    }
    dispatch({type: constant.RETRIEVED_REGISTRATION_ERROR, payload: errors});
  });

}

export default {
  changeRegistrationField,
  signUpAction
};

