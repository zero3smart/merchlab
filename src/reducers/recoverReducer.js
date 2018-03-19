import constant from '../constants/recoverConstants';

export default function(state = {}, action) {
  switch (action.type) {
    case constant.CHANGE_RECOVER_PASSWORD:
      return {...state, recoverPassword: {...state.recoverPassword, email: action.payload}};
    case constant.RETRIEVED_RECOVER_PASSWORD_ERROR:
      return {...state, recoverPassword: {...state.recoverPassword, error: action.payload}};
    case constant.RETRIEVED_RECOVER_PASSWORD_INFO:
      return {...state, recoverPassword: {...state.recoverPassword, info: action.payload}};
    case constant.CHANGE_RESET_PASSWORD:
      return {...state, resetPassword: {...state.resetPassword, password: action.payload}};
    case constant.CHANGE_RESET_PASSWORD_REPEAT:
      return {...state, resetPassword: {...state.resetPassword, password_repeat: action.payload}};
    case constant.RETRIEVED_RESET_PASSWORD_ERROR:
      return {...state, resetPassword: {...state.resetPassword, error: action.payload}};
    case constant.RETRIEVED_RESET_PASSWORD_INFO:
      return {...state, resetPassword: {...state.resetPassword, info: action.payload}};
    case constant.CHANGE_RECOVER_EMAIL_1:
      return {...state, recoverEmail: {...state.recoverEmail, email_1: action.payload}};
    case constant.CHANGE_RECOVER_EMAIL_2:
      return {...state, recoverEmail: {...state.recoverEmail, email_2: action.payload}};
    case constant.CHANGE_RECOVER_EMAIL_3:
      return {...state, recoverEmail: {...state.recoverEmail, email_3: action.payload}};
    case constant.RETRIEVED_RECOVER_EMAIL_ERROR:
      return {...state, recoverEmail: {...state.recoverEmail, error: action.payload}};
    case constant.RETRIEVED_RECOVER_EMAIL_INFO:
      return {...state, recoverEmail: {...state.recoverEmail, info: action.payload}};
    case constant.CLEAR_RECOVER_EMAIL_INFO:
      return {...state, recoverEmail: {}};
    case constant.SAVE_LOCATION_QUERY:
      return {...state, locationQuery: action.locationQuery}
    default:
      return state;
  }
}
