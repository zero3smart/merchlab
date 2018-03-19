import constant from '../constants/recoverConstants';
import axios from 'axios';
import baseURL from '../constants/common';

const changeRecoverPasswordField = (type, value) => {
  return {type: constant.CHANGE_RECOVER_PASSWORD, payload: value};
};

const changeResetPasswordField = (type, value) => {
  switch (type) {
    case 'password':
      return {type: constant.CHANGE_RESET_PASSWORD, payload: value};
    case 'password_repeat':
      return {type: constant.CHANGE_RESET_PASSWORD_REPEAT, payload: value};
    default:
      return {type: 'blah'};
  }
}

const changeRecoverEmailField = (type, value) => {
  switch (type) {
    case 'email_1':
      return {type: constant.CHANGE_RECOVER_EMAIL_1, payload: value};
    case 'email_2':
      return {type: constant.CHANGE_RECOVER_EMAIL_2, payload: value};
    case 'email_3':
      return {type: constant.CHANGE_RECOVER_EMAIL_3, payload: value};
    default:
      return {type: 'blah'};
  }
}

const recoverEmailAction = (data) => dispatch => {
  if (!data) {
    dispatch({type: constant.RETRIEVED_RECOVER_EMAIL_ERROR, payload: 'You need to enter at least one email'});
    return ;
  }
  const obj = {
    client_id: "X8U5BRZH12",
    client_secret: "VK7ttedbpsAHOIWh5zSicYYNZxssLR",
    emails: [data.email_1, data.email_2, data.email_3]
  };
  axios.post(baseURL + 'users/forgot-email',
  obj,
  {headers: {'Content-Type': 'application/json'}})
  .then((res) => {
    dispatch({type: constant.RETRIEVED_RECOVER_EMAIL_INFO, payload: res.data.email});
    dispatch({type: constant.RETRIEVED_RECOVER_EMAIL_ERROR, payload: ''});
  })
  .catch((err) => {
    dispatch({type: constant.RETRIEVED_RECOVER_EMAIL_ERROR, payload: err.response.data.error[0].message});
  });
}

const recoverPasswordAction = (data) => dispatch => {
  if (!data || !data.email) {
    dispatch({type: constant.RETRIEVED_RECOVER_PASSWORD_ERROR, payload: 'Please, enter a valid email'});
    return ;
  }
  const obj = {
    client_id: "X8U5BRZH12",
    client_secret: "VK7ttedbpsAHOIWh5zSicYYNZxssLR",
    ...data
  };
  axios.post(baseURL + 'users/forgot-password',
  obj,
  {headers: {'Content-Type': 'application/json'}})
  .then((res) => {
    dispatch({type: constant.RETRIEVED_RECOVER_PASSWORD_INFO, payload: res.data.data[0]});
  })
  .catch((err) => {
    dispatch({type: constant.RETRIEVED_RECOVER_PASSWORD_ERROR, payload: 'We couldn’t find your email address. Please try again.'});
  });
}

const resetPasswordAction = (data) => dispatch => {
  if (!data || !data.password || !data.password_repeat) {
    dispatch({type: constant.RETRIEVED_RESET_PASSWORD_ERROR, payload: 'You need to type new password'});
    return ;
  }
  if (data.password !== data.password_repeat) {
    dispatch({type: constant.RETRIEVED_RESET_PASSWORD_ERROR, payload: 'Passwords don\'t match'});
    return ;
  }
  axios.post(baseURL + 'users/password',
  data,
  {headers: {'Content-Type': 'application/json'}})
  .then((res) => {
    dispatch({type: constant.RETRIEVED_RESET_PASSWORD_INFO, payload: res.data});
  })
  .catch((err) => {
    dispatch({type: constant.RETRIEVED_RESET_PASSWORD_ERROR, payload: err.response.data.error[0].message});
  });
}

const clearRecoverEmail = () => {
  return {type: constant.CLEAR_RECOVER_EMAIL_INFO};
}

const saveLocation = (locationQuery) => {
  return {
    type: constant.SAVE_LOCATION_QUERY,
    locationQuery
  }
}

export default {
  changeRecoverPasswordField,
  changeResetPasswordField,
  changeRecoverEmailField,
  recoverPasswordAction,
  resetPasswordAction,
  recoverEmailAction,
  clearRecoverEmail,
  saveLocation
};
