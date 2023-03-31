import * as AT from "../actionTypes/businessActionTypes";

export function businessRegisterReducer(state = {}, action) {
  switch (action.type) {
    case AT.BUSINESS_REGISTER_REQUEST:
      return { ...state, loading: true };

    case AT.BUSINESS_REGISTER_SUCCESS:
      return { ...state, loading: false };

    case AT.BUSINESS_REGISTER_FAIL:
      return { ...state, loading: false, error: true };

    case AT.BUSINESS_REGISTER_DELETE:
      return {};
    default:
      return state;
  }
}

export function businessLoginReducer(state = {}, action) {
  switch (action.type) {
    case AT.BUSINESS_LOGIN_REQUEST:
      return { ...state, loading: true };

    case AT.BUSINESS_LOGIN_SUCCESS:
      return { ...state, loading: false };

    case AT.BUSINESS_LOGIN_FAIL:
      return { ...state, loading: false, error: true };

    case AT.BUSINESS_LOGIN_DELETE:
      return {};
    default:
      return state;
  }
}

export function businessLoginOAuthReducer(state = {}, action) {
  switch (action.type) {
    case AT.BUSINESS_LOGIN_OAUTH_REQUEST:
      return { ...state, loading: true };

    case AT.BUSINESS_LOGIN_OAUTH_SUCCESS:
      return { ...state, loading: false };

    case AT.BUSINESS_LOGIN_OAUTH_FAIL:
      return { ...state, loading: false, error: true };

    case AT.BUSINESS_LOGIN_OAUTH_DELETE:
      return {};
    default:
      return state;
  }
}

export function businessLogoutReducer(state = {}, action) {
  switch (action.type) {
    case AT.BUSINESS_LOGOUT_REQUEST:
      return { ...state, loading: true };

    case AT.BUSINESS_LOGOUT_SUCCESS:
      return { ...state, loading: false };

    case AT.BUSINESS_LOGOUT_FAIL:
      return { ...state, loading: false, error: true };

    case AT.BUSINESS_LOGOUT_DELETE:
      return {};
    default:
      return state;
  }
}

export function businessDetailsReducer(state = {}, action) {
  switch (action.type) {
    case AT.BUSINESS_DETAILS_REQUEST:
      return { ...state, loading: true };

    case AT.BUSINESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
      };

    case AT.BUSINESS_DETAILS_FAIL:
      return { ...state, loading: false, error: true };

    case AT.BUSINESS_DETAILS_LOGIN_TOKEN:
      return { ...state, loginToken: action.payload.loginToken };

    case AT.BUSINESS_DETAILS_DELETE:
      return { loading: true };
    default:
      return state;
  }
}

export function businessDetailsUpdateReducer(state = {}, action) {
  switch (action.type) {
    case AT.BUSINESS_DETAILS_UPDATE_REQUEST:
      return { ...state, loading: true };

    case AT.BUSINESS_DETAILS_UPDATE_SUCCESS:
      return { ...state, loading: false };

    case AT.BUSINESS_DETAILS_UPDATE_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
