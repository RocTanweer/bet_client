import { decryptString } from "../utils/functions";

import {
  businessRegisterReducer,
  businessLoginReducer,
  businessLoginOAuthReducer,
  businessLogoutReducer,
  businessDetailsReducer,
  businessDetailsUpdateReducer,
} from "./reducers/businessReducers";

/**
 * i This function is same as combineReducer from redux
 * @param {Object} slices An Object containing all the reducers in a key-value pair
 * @returns rootReducer which is a usual reducer but it remembers slices object as closure and operate upon it and not switch-case stuff
 */
const combineReducers = (slices) => {
  return (state, action) => {
    return Object.keys(slices).reduce((accu, prop) => {
      return {
        ...accu,
        [prop]: slices[prop](accu[prop], action),
      };
    }, state);
  };
};

export const rootReducer = combineReducers({
  businessRegister: businessRegisterReducer,
  businessLogin: businessLoginReducer,
  businessLoginOAuth: businessLoginOAuthReducer,
  businessDetails: businessDetailsReducer,
  businessLogout: businessLogoutReducer,
  businessDetailsUpdate: businessDetailsUpdateReducer,
});

const decryptedLoginToken =
  localStorage.getItem("loginToken") &&
  decryptString(localStorage.getItem("loginToken"));

export const initialState = {
  businessRegister: {},
  businessLogin: {},
  businessLoginOAuth: {},
  businessDetails: {
    loginToken: decryptedLoginToken,
    loading: true,
  },
  businessLogout: {},
  businessDetailsUpdate: {},
};
