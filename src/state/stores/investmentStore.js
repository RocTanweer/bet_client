import { combineReducers } from "@/utils/functions.js";

import {
  investmentAddReducer,
  investmentGetReducer,
  investmentUpdateReducer,
  investmentDeleteReducer,
  investmentDataReducer,
} from "../reducers/investmentReducers.js";

export const investmentRootReducer = combineReducers({
  investmentAdd: investmentAddReducer,
  investmentGet: investmentGetReducer,
  investmentUpdate: investmentUpdateReducer,
  investmentDelete: investmentDeleteReducer,
  investmentData: investmentDataReducer,
});

export const investmentInitialState = {
  investmentAdd: {},
  investmentGet: {},
  investmentUpdate: {},
  investmentDelete: {},
  investmentData: { investments: [] },
};
