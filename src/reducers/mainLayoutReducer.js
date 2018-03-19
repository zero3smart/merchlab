import constant from '../constants/mainLayoutConstants';

export default function(state = {}, action) {
  switch(action.type) {
    case constant.CHANGE_ACCOUNT_POPUP_VISIBILITY:
      return {...state, accountPopupFlag: !state.accountPopupFlag};
    case constant.CHANGE_CURRENT_LEFT_MENU_ITEM:
      return {...state, currentLeftMenuItem: action.payload};
    case constant.RETRIEVED_CAMPAIGNS_LIST:
      return {...state, campaignsList: action.payload};
    case constant.RETRIEVED_CAMPAIGNS_LIST_ERROR:
      return {...state, campaignsListError: action.payload};
    case constant.CHANGE_CONTACT_US_MESSAGE_TEXT:
      return {...state, contactUsMessage: {...state.contactUsMessage, message: action.payload}};
    case constant.CHANGE_CONTACT_US_MESSAGE_THEME:
      return {...state, contactUsMessage: {...state.contactUsMessage, theme: action.payload}};
    case constant.CHANGE_CURRENT_CAMPAIGN_INDEX:
      return {...state, currentCampaign: action.payload};
    case constant.ADD_PAYPAL_CODE:
      return {...state, paypalCode: action.payload};
    case constant.RETRIEVED_PAYPAL_CONNECT:
      return {...state, paypalConnected: true};
    case constant.CHANGE_REPEAT_DATE_RANGE:
      return {...state, repeatCampaign: {...state.repeatCampaign, schedule: action.payload}};
    case constant.CHANGE_REPEAT_BUDGET:
      return {...state, repeatCampaign: {...state.repeatCampaign, budget: action.payload}};
    case constant.CHANGE_REPEAT_CAMPAIGN_POPUP_VISIBILITY:
      if (state.repeatCampaign)
        return {...state, repeatCampaign: {...state.repeatCampaign, repeatCampaignPopupFlag: !state.repeatCampaign.repeatCampaignPopupFlag}};
      else return {...state, repeatCampaign: {...state.repeatCampaign, repeatCampaignPopupFlag: true}};
    case constant.ALERT_CONTACT_US:  
      return {...state, alertContactUsObj: action.payload}
    case constant.SHOW_UPLOAD_VIDEO: 
      return {...state, showUploadVideoFlag: action.flag}
    case constant.CALCULATE_BUDGET_REPEAT: 
      return {...state, repeatBudget: action.payload}
    default:
      return state;
  }
}