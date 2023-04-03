import * as AT from "../actionTypes/cashActionTypes.js";

export function cashRegisterReducer(state = {}, action) {
  switch (action.type) {
    case AT.CASH_REGISTER_REQUEST:
      return { ...state, loading: true };

    case AT.CASH_REGISTER_SUCCESS:
      return { ...state, loading: false };

    case AT.CASH_REGISTER_FAIL:
      return { ...state, loading: false, error: true };

    case AT.CASH_REGISTER_DELETE:
      return {};

    default:
      return state;
  }
}

export function cashGetReducer(state = {}, action) {
  switch (action.type) {
    case AT.CASH_GET_REQUEST:
      return { ...state, loading: true };

    case AT.CASH_GET_SUCCESS:
      return { ...state, loading: false, cashData: action.payload.cashData };

    case AT.CASH_GET_FAIL:
      return { ...state, loading: false, error: true };

    case AT.CASH_GET_DELETE:
      return {};

    default:
      return state;
  }
}

export function cashUpdateReducer(state = {}, action) {
  switch (action.type) {
    case AT.CASH_UPDATE_REQUEST:
      return { ...state, loading: true };

    case AT.CASH_UPDATE_SUCCESS:
      return { ...state, loading: false };

    case AT.CASH_UPDATE_FAIL:
      return { ...state, loading: false, error: true };

    case AT.CASH_UPDATE_DELETE:
      return {};

    default:
      return state;
  }
}
