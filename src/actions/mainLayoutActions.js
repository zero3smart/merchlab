import axios from 'axios'
import { browserHistory } from 'react-router'
import constant from '../constants/mainLayoutConstants'
import baseURL from '../constants/common'

const changeAccountPopupVisibility = () => {
  return { type: constant.CHANGE_ACCOUNT_POPUP_VISIBILITY }
}

const changeRepeatCampaignPopupVisibility = () => {
  return { type: constant.CHANGE_REPEAT_CAMPAIGN_POPUP_VISIBILITY }
}

const alertContactUs = (payload) => {
  return {
    type: constant.ALERT_CONTACT_US,
    payload
  }
}

const retrievedCampaignList = (payload) => {
  return {
    type: constant.RETRIEVED_CAMPAIGNS_LIST,
    payload
  }
}

const getCampaignsList = (status, token) => dispatch => {
  axios.get(baseURL + 'campaigns/?status='+status,
    {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+ token}})
    .then((res) => {
      dispatch(retrievedCampaignList(res.data.campaigns))
    })
    .catch((err) => {
      dispatch(retrievedCampaignList(err))
    })
}

const changeContactUsTheme = (e) => {
  return {type: constant.CHANGE_CONTACT_US_MESSAGE_THEME, payload: e}
}

const changeContactUsMessage = (e) => {
  if (e) return {type: constant.CHANGE_CONTACT_US_MESSAGE_TEXT, payload: e.target.value}
  else return {type: constant.CHANGE_CONTACT_US_MESSAGE_TEXT, payload: e}
}

const sendContactUsMessage = (data, token) => dispatch => {
  if (data && data.theme && data.message) {
    axios.post(baseURL + 'contact',
    data,
    {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+token}})
    .then((res) => {
      dispatch(alertContactUs({type: true, text:'Your message has been sent'}))
      dispatch(changeContactUsTheme())
      dispatch(changeContactUsMessage())
      browserHistory.push('/main')
    })
    .catch((err) => {
       dispatch(alertContactUs({type: false, text: err.response.status + err.response.statusText}))
    })
  } else {
    dispatch(alertContactUs({type: false, text:'Fill in all the fields'}))
  }
}

const changeCurrentCampaign = (currentCampaign) => {
  browserHistory.push('/main/current')
  return {type: constant.CHANGE_CURRENT_CAMPAIGN_INDEX, payload: currentCampaign}
}

const getPaypalCode = (code) => {
  return {type: constant.ADD_PAYPAL_CODE, payload: code}
}

const connectPayPal = (code, token) => dispatch => {
  axios.post(baseURL + 'paypal',
  {code: code},
  {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+token}})
  .then((res) => {
    dispatch({type: constant.RETRIEVED_PAYPAL_CONNECT})
    localStorage.setItem('paypalId', res.data.user.paypalId)
    window.close()
  })
  .catch((err) => {
    alert(err.response.data.error[0].message)
  })
}

const disconnectPayPal = (token) => dispatch => {
  axios.delete(baseURL + 'paypal',
  {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+token}})
  .then((res) => {
    localStorage.removeItem('paypalId')
    location.reload()
  })
  .catch((err) => {
    console.log('error', err, err.response)
  })
}

const acceptPaypalConnection = () =>{
  return {type: constant.RETRIEVED_PAYPAL_CONNECT}
}

const calculateBudget = (token, obj) => dispatch => {
  axios.post(baseURL + 'campaigns/budget',
  obj,
  {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+token}})
  .then((res) => {
    dispatch({type: constant.CALCULATE_BUDGET_REPEAT, payload: res.data.budget})
  })
  .catch((err) => {
    console.log(err.response)
  })
}

const changeRepeatDateRange = (dateRange) => {
  return {type: constant.CHANGE_REPEAT_DATE_RANGE, payload: dateRange}
}

const changeRepeatBudget = (some, budget) => {
  return {type: constant.CHANGE_REPEAT_BUDGET, payload: budget}
}

const repeatCampaignAction = (data, token, id) => dispatch => {
  axios.post(baseURL + 'campaigns/'+id+"/repeat",
  {campaign: data},
  {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+token}})
  .then((res) => {
    browserHistory.push('/main/inreview')
  })
  .catch((err) => console.log(err, err.response))
}

const moveToArchive = (id, token) => dispatch => {
  axios.put(baseURL + 'campaigns/'+id,
  {status: 'Archived'},
  {headers: {'Content-Type': 'application/json', 'Authorization': 'bearer '+token}})
  .then((res) => {
    dispatch(getCampaignsList('InReview', token))
  })
  .catch((err) => console.log(err, err.response))
}

export const showUploadVideo = (flag) => {
  return {
    type: constant.SHOW_UPLOAD_VIDEO,
    flag
  }
}

const logOut = () => dispatch => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  dispatch({type: constant.CHANGE_ACCOUNT_POPUP_VISIBILITY})
  browserHistory.push('/signIn')
}

export default {
  changeAccountPopupVisibility,
  getCampaignsList,
  changeContactUsTheme,
  changeContactUsMessage,
  sendContactUsMessage,
  changeCurrentCampaign,
  getPaypalCode,
  connectPayPal,
  acceptPaypalConnection,
  disconnectPayPal,
  changeRepeatDateRange,
  changeRepeatCampaignPopupVisibility,
  changeRepeatBudget,
  repeatCampaignAction,
  showUploadVideo,
  logOut,
  alertContactUs,
  retrievedCampaignList,
  calculateBudget,
  moveToArchive
}

