import { combineReducers } from "@/utils/functions.js";

import {
  cashRegisterReducer,
  cashGetReducer,
  cashUpdateReducer,
} from "../reducers/cashReducers.js";

export const cashRootReducer = combineReducers({
  cashRegister: cashRegisterReducer,
  cashGet: cashGetReducer,
  castUpdate: cashUpdateReducer,
});

export const cashInitialState = {
  cashRegister: {},
  cashGet: {},
  castUpdate: {},
};
