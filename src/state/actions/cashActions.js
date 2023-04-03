import { client } from "@/lib/sanityClient.js";

import * as AT from "../actionTypes/cashActionTypes.js";

export async function registerCash(data, dispatch) {
  try {
    dispatch({ type: AT.CASH_REGISTER_REQUEST });

    const { cashData, loginToken } = data;

    const query = `*[_type == "cash" && references("${loginToken}")][0]`;

    const existingCashDoc = await client.fetch(query);

    if (!existingCashDoc) {
      const newCashDoc = {
        _type: "cash",
        ...cashData,
        ownedBy: {
          _type: "reference",
          _ref: loginToken,
        },
      };

      const response = await client.create(newCashDoc);

      dispatch({ type: AT.CASH_GET_SUCCESS, payload: { cashData: response } });

      dispatch({ type: AT.CASH_REGISTER_SUCCESS });
    } else {
      throw new Error(
        "Cash information of this business is already been registered"
      );
    }
  } catch (error) {
    dispatch({ type: AT.CASH_REGISTER_FAIL });
    throw error;
  }
}

export async function getCash(loginToken, dispatch) {
  try {
    dispatch({ type: AT.CASH_GET_REQUEST });

    const query = `*[_type == "cash" && references("${loginToken}")][0]`;

    const response = await client.fetch(query);

    dispatch({ type: AT.CASH_GET_SUCCESS, payload: { cashData: response } });
  } catch (error) {
    dispatch({ type: AT.CASH_GET_FAIL });
    throw error;
  }
}

export async function updateCash(dataForUpdation, cashDocID, dispatch) {
  try {
    dispatch({ type: AT.CASH_UPDATE_REQUEST });

    const updatedCashDoc = await client
      .patch(cashDocID)
      .set(dataForUpdation)
      .commit();

    dispatch({
      type: AT.CASH_GET_SUCCESS,
      payload: { cashData: updatedCashDoc },
    });

    dispatch({ type: AT.CASH_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: AT.CASH_UPDATE_FAIL });
    throw error;
  }
}
