import constant from '../constants/signUpConstants';

export default function(state = {}, action) {
	switch (action.type) {
		case constant.CHANGE_REGISTRATION_EMAIL:
      return {...state, user: {...state.user, email: action.payload}};
		case constant.CHANGE_REGISTRATION_PASSWORD:
			return {...state, user: {...state.user, password: action.payload}};
        case constant.CHANGE_REGISTRATION_PASSWORD_REPEAT:
			return {...state, user: {...state.user, password_repeat: action.payload}};
		case constant.CHANGE_REGISTRATION_FIRSTNAME:
			return {...state, user: {...state.user, firstName: action.payload}};
		case constant.CHANGE_REGISTRATION_LASTNAME:
			return {...state, user: {...state.user, lastName: action.payload}};
    case constant.CHANGE_REGISTRATION_PHONE_NUMBER_PRIMARY:
      return {...state, user: {...state.user, phone: action.payload}};
    case constant.CHANGE_REGISTRATION_PHONE_TYPE_PRIMARY:
      return {...state, user: {...state.user, phoneType: action.payload}};
    case constant.CHANGE_REGISTRATION_ZIPCODE:
      return {...state, user: {...state.user, zipCode: action.payload}};
    case constant.CHANGE_REGISTRATION_REFFERED_BY:
      return {...state, user: {...state.user, referrerCode: action.payload}};
    case constant.CHANGE_REGISTRATION_TERMS_CHECKBOX:
      if (state.user)
        return {...state, user: {...state.user, termsCheckbox: !state.user.termsCheckbox}}
      else return {...state, user: {...state.user, termsCheckbox: true}};
    case constant.CHANGE_REGISTRATION_PHONE_NUMBER_ALTERNATIVE:
      return {...state, user: {...state.user, phoneAlt: action.payload}};
    case constant.CHANGE_REGISTRATION_PHONE_TYPE_ALTERNATIVE:
      return {...state, user: {...state.user, phoneAltType: action.payload}};
    case constant.CHANGE_REGISTRATION_ADDRESS:
      return {...state, user: {...state.user, address: action.payload}};
    case constant.CHANGE_REGISTRATION_CITY:
      return {...state, user: {...state.user, city: action.payload}};
    case constant.CHANGE_REGISTRATION_COUNTRY:
      return {...state, user: {...state.user, country: action.payload}};
    case constant.CHANGE_REGISTRATION_STATE:
      return {...state, user: {...state.user, state: action.payload}};
    case constant.CHANGE_REGISTRATION_COMPANY_NAME:
      return {...state, user: {...state.user, companyName: action.payload}};
    //retrieving
		case constant.RETRIEVED_REGISTRATION_USER_INFO:
			return {...state, retrievedInfo: {...state.retrievedInfo, ...action.payload}};
    case constant.RETRIEVED_REGISTRATION_ERROR:
      return {...state, error: action.payload};
		default:
			return state;
	}
}
