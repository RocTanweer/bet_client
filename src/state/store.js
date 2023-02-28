import { decryptString } from "../utils/others";

import {
  userRegisterReducer,
  userLoginReducer,
  userLoginOAuthReducer,
  userLogoutReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
} from "./reducers/userReducers";

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
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userLoginOAuth: userLoginOAuthReducer,
  userDetails: userDetailsReducer,
  userLogout: userLogoutReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
});

const decryptedLoginToken = localStorage.getItem("loginToken") && decryptString(localStorage.getItem("loginToken"));

export const initialState = {
  userRegister: {},
  userLogin: {},
  userLoginOAuth: {},
  userDetails: {
    loginToken: decryptedLoginToken,
    loading: true,
  },
  userLogout: {},
  userDetailsUpdate: {},
};
