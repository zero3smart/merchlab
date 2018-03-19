//Login actions
import constant from '../constants/signInConstants';
import { browserHistory } from 'react-router';
import axios from 'axios';
import baseURL from '../constants/common';

const changeLoginField = (type, value) => {
	switch (type) {
		case 'email':
			return {type: constant.CHANGE_LOGIN_EMAIL, payload: value};
		case 'password':
			return {type: constant.CHANGE_LOGIN_PASSWORD, payload: value};
    case 'remember':
      return {type: constant.CHANGE_REMEMBER_ME_CHECKBOX};
		default:
			return {type: constant.UNHANDLED, payload: value};
	}
};

const signInAction = (data) => dispatch => {
  if (!data || !data.email || !data.password) {
    dispatch({type: constant.RETRIEVED_LOGIN_ERROR, payload: 'Please, enter your email and password'});
    return ;
  }
  const obj = {
    client_id: "X8U5BRZH12",
    client_secret: "VK7ttedbpsAHOIWh5zSicYYNZxssLR",
    username: data.email,
    password: data.password,
    remember: data.remember
  };
  axios.post(`${baseURL}sign-in`,
  obj,
  {headers: {'Content-Type': 'application/json'}})
  .then((res) => {
    if (obj.remember) {
      localStorage.setItem('token', res.headers.authorization);
    } else {
      sessionStorage.setItem('token', res.headers.authorization);
    }
    let userInfo = {user: {...res.data.data}};
    dispatch({type: constant.RETRIEVED_LOGIN_USER_INFO, payload: userInfo});
    dispatch({type: constant.RETRIEVED_AUTHORIZATION_HEADER, payload: res.headers.authorization});
    browserHistory.push('/main/');
  })
  .catch((err) => {
    dispatch({type: constant.RETRIEVED_LOGIN_ERROR, payload: err.response.data});
  });
};

export const checkLoginInfo = (url) => dispatch => {
  let mainToken;
  let token = localStorage.getItem('token');
  let tokenTemp = sessionStorage.getItem('token');

  if ((token && token.length > 0)) {
    mainToken = token;
  } else if (tokenTemp && tokenTemp.length > 0) {
    mainToken = tokenTemp;
  }

  if (mainToken) {
    // axios.get(`${baseURL}users/me`,
    // {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+mainToken}})
    // .then((res) => {
    //   dispatch({type: constant.RETRIEVED_LOGIN_USER_INFO, payload: res.data});
    //   dispatch({type: constant.RETRIEVED_AUTHORIZATION_HEADER, payload: mainToken});
    //   url === '/' ? browserHistory.push('/main') : browserHistory.push(url);
    // })
    // .catch((err) => {
    //   if (url.substr(0,5) === '/main') {
    //     browserHistory.push('/signIn')
    //   } else
    //     browserHistory.push(url);
    // });
    browserHistory.push('/main');
  } else  {
    if (url.substr(0,5) === '/main' || url.substr(0,5) === '/') {
      browserHistory.push('/signIn');
    } else
      browserHistory.push(url);
  }
};

export default {
  changeLoginField,
  signInAction,
  checkLoginInfo
};
