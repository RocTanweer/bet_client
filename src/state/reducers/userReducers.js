import * as AT from "../actionTypes/userActionTypes";

export function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case AT.USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case AT.USER_REGISTER_SUCCESS:
      return { ...state, loading: false };

    case AT.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: true };

    case AT.USER_REGISTER_DELETE:
      return {};
    default:
      return state;
  }
}

export function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case AT.USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case AT.USER_LOGIN_SUCCESS:
      return { ...state, loading: false };

    case AT.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: true };

    case AT.USER_LOGIN_DELETE:
      return {};
    default:
      return state;
  }
}

export function userLoginOAuthReducer(state = {}, action) {
  switch (action.type) {
    case AT.USER_LOGIN_OAUTH_REQUEST:
      return { ...state, loading: true };

    case AT.USER_LOGIN_OAUTH_SUCCESS:
      return { ...state, loading: false };

    case AT.USER_LOGIN_OAUTH_FAIL:
      return { ...state, loading: false, error: true };

    case AT.USER_LOGIN_OAUTH_DELETE:
      return {};
    default:
      return state;
  }
}

export function userLogoutReducer(state = {}, action) {
  switch (action.type) {
    case AT.USER_LOGOUT_REQUEST:
      return { ...state, loading: true };

    case AT.USER_LOGOUT_SUCCESS:
      return { ...state, loading: false };

    case AT.USER_LOGOUT_FAIL:
      return { ...state, loading: false, error: true };

    case AT.USER_LOGOUT_DELETE:
      return {};
    default:
      return state;
  }
}

export function userDetailsReducer(state = {}, action) {
  switch (action.type) {
    case AT.USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case AT.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        editInfo: action.payload.info,
      };

    case AT.USER_DETAILS_FAIL:
      return { ...state, loading: false, error: true };

    case AT.USER_DETAILS_EDIT:
      return {
        ...state,
        editUserDetails: {
          ...state.editUserDetails,
          [action.payload.fieldName]: action.payload.fieldValue,
        },
      };

    case AT.USER_DETAILS_LOGIN_TOKEN:
      return { ...state, loginToken: action.payload.loginToken };

    case AT.USER_DETAILS_DELETE:
      return { loading: true };
    default:
      return state;
  }
}

export function userDetailsUpdateReducer(state = {}, action) {
  switch (action.type) {
    case AT.USER_DETAILS_UPDATE_REQUEST:
      return { ...state, loading: true };

    case AT.USER_DETAILS_UPDATE_SUCCESS:
      return { ...state, loading: false };

    case AT.USER_DETAILS_UPDATE_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
