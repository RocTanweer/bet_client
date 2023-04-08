import * as AT from "../actionTypes/investmentActionTypes.js";

export function investmentAddReducer(state = {}, action) {
  switch (action.type) {
    case AT.INVESTMENT_ADD_REQUEST:
      return { ...state, loading: true };

    case AT.INVESTMENT_ADD_SUCCESS:
      return { ...state, loading: false };

    case AT.INVESTMENT_ADD_FAIL:
      return { ...state, loading: false, error: true };

    case AT.INVESTMENT_ADD_DELETE:
      return {};

    default:
      return state;
  }
}

export function investmentGetReducer(state = {}, action) {
  switch (action.type) {
    case AT.INVESTMENT_GET_REQUEST:
      return { ...state, loading: true };

    case AT.INVESTMENT_GET_SUCCESS:
      return { ...state, loading: false };

    case AT.INVESTMENT_GET_FAIL:
      return { ...state, loading: false, error: true };

    case AT.INVESTMENT_GET_DELETE:
      return {};

    default:
      return state;
  }
}

export function investmentUpdateReducer(state = {}, action) {
  switch (action.type) {
    case AT.INVESTMENT_UPDATE_REQUEST:
      return { ...state, loading: true };

    case AT.INVESTMENT_UPDATE_SUCCESS:
      return { ...state, loading: false };

    case AT.INVESTMENT_UPDATE_FAIL:
      return { ...state, loading: false, error: true };

    case AT.INVESTMENT_UPDATE_DELETE:
      return {};

    default:
      return state;
  }
}

export function investmentDeleteReducer(state = {}, action) {
  switch (action.type) {
    case AT.INVESTMENT_DELETE_REQUEST:
      return { ...state, loading: true };

    case AT.INVESTMENT_DELETE_SUCCESS:
      return { ...state, loading: false };

    case AT.INVESTMENT_DELETE_FAIL:
      return { ...state, loading: false, error: true };

    case AT.INVESTMENT_DELETE_DELETE:
      return {};

    default:
      return state;
  }
}

export function investmentDataReducer(state = {}, action) {
  switch (action.type) {
    case AT.INVESTMENT_DATA_ADDONE:
      console.log(state.investments);
      return { investments: [action.payload.investment, ...state.investments] };

    case AT.INVESTMENT_DATA_ADDMANY:
      return {
        investments: [...state.investments, ...action.payload.investments],
      };

    case AT.INVESTMENT_DATA_UPDATE:
      return {
        investments: [
          ...state.investments.map((el) => {
            if (el._id === action.payload.updatedInvestment._id) {
              return action.payload.updatedInvestment;
            }
            return el;
          }),
        ],
      };

    case AT.INVESTMENT_DATA_DELETEONE:
      return {
        investments: [
          ...state.filter(
            (el) => el._id !== action.payload.deletedInvestment._id
          ),
        ],
      };

    default:
      return state;
  }
}
