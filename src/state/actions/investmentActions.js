import { client } from "@/lib/sanityClient.js";

import * as AT from "../actionTypes/investmentActionTypes.js";

export async function addInvestment(data, dispatch) {
  try {
    dispatch({ type: AT.INVESTMENT_ADD_REQUEST });

    const { formData, loginToken } = data;

    const newInvestmentDoc = {
      _type: "investment",
      ...formData,
      ownedBy: {
        _type: "reference",
        _ref: loginToken,
      },
    };

    const response = await client.create(newInvestmentDoc);
    console.log(response);
    dispatch({
      type: AT.INVESTMENT_DATA_ADDONE,
      payload: { investment: response },
    });

    dispatch({ type: AT.INVESTMENT_ADD_SUCCESS });
  } catch (error) {
    dispatch({ type: AT.INVESTMENT_ADD_FAIL });
    throw error;
  }
}

export async function getInvestments(data, dispatch, abortController) {
  try {
    dispatch({ type: AT.INVESTMENT_GET_REQUEST });

    const { loginToken } = data;

    const query = `*[_type == "investment" && references("${loginToken}")]`;

    const response = await client.fetch(
      query,
      {},
      {
        signal: abortController.signal,
      }
    );

    dispatch({
      type: AT.INVESTMENT_DATA_ADDMANY,
      payload: { investments: response },
    });

    dispatch({
      type: AT.INVESTMENT_GET_SUCCESS,
      payload: { investments: response },
    });
  } catch (error) {
    dispatch({ type: AT.INVESTMENT_GET_FAIL });
    throw error;
  }
}
