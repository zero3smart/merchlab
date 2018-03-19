import constant from '../constants/signInConstants';

export default function(state = {}, action) {
	switch (action.type) {
		case constant.CHANGE_LOGIN_EMAIL:
			return {...state, user: {...state.user, email: action.payload}};
		case constant.CHANGE_LOGIN_PASSWORD:
			return {...state, user: {...state.user, password: action.payload}};
    case constant.CHANGE_REMEMBER_ME_CHECKBOX:
      if (state.user)
        return {...state, user: {...state.user, remember: !state.user.remember}};
      else return {...state, user: {...state.user, remember: true}};
		case constant.RETRIEVED_LOGIN_ERROR: 
			return {...state, error: action.payload};
		case constant.RETRIEVED_LOGIN_USER_INFO:
			return {...state, user: {...state.user, ...action.payload}};
		case constant.USER_LOGGED_OUT:
			return {...state, currentUser: action.payload};
		case constant.UPDATE_USER_INFO:
			return {...state, user: {...state.user, ...action.payload}};
		case constant.RETRIEVED_AUTHORIZATION_HEADER:
			return {...state, autHeader: action.payload};
		default:
			return state;
	}
}
