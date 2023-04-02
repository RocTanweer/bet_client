import { combineReducers } from "@/utils/functions";
import { decryptString } from "@/utils/functions";

import {
  businessRegisterReducer,
  businessLoginReducer,
  businessLoginOAuthReducer,
  businessLogoutReducer,
  businessDetailsReducer,
  businessDetailsUpdateReducer,
} from "../reducers/businessReducers";

export const businessRootReducer = combineReducers({
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

export const businessInitialState = {
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
