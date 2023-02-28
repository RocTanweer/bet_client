import * as AT from "../actionTypes/userActionTypes";

import axios from "axios";

import { AES } from "crypto-js";

import { client } from "../../lib/sanityClient";

import { formatUserInfo } from "../../utils";
import { sleep } from "../../utils/others";

export async function register(userDoc, dispatch) {
  try {
    dispatch({ type: AT.USER_REGISTER_REQUEST });

    const query = `*[_type == "user" && email=="${userDoc.email}"]`;

    const existingUser = await client.fetch(query);

    if (existingUser.length == 0) {
      const response = await client.create({ _type: "user", ...userDoc });

      dispatch({
        type: AT.USER_DETAILS_LOGIN_TOKEN,
        payload: { loginToken: response._id },
      });

      dispatch({ type: AT.USER_DETAILS_SUCCESS, payload: { info: response } });

      const encryptedLoginToken = AES.encrypt(response._id, import.meta.env.VITE_SANITY_SECRET).toString();

      localStorage.setItem("loginToken", encryptedLoginToken);

      dispatch({ type: AT.USER_REGISTER_SUCCESS });
    } else {
      throw new Error("User already exists!");
    }
  } catch (error) {
    dispatch({ type: AT.USER_REGISTER_FAIL });
    throw error;
  }
}

export async function oAuthLogin(accessToken, dispatch) {
  try {
    dispatch({ type: AT.USER_LOGIN_OAUTH_REQUEST });

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const { data: userInfo } = await axios.get(import.meta.env.VITE_GOOGLE_OAUTH_USERINFO_URL, config);

    dispatch({
      type: AT.USER_DETAILS_LOGIN_TOKEN,
      payload: { loginToken: userInfo.sub },
    });

    const encryptedLoginToken = AES.encrypt(userInfo.sub, import.meta.env.VITE_SANITY_SECRET).toString();

    localStorage.setItem("loginToken", encryptedLoginToken);

    const userDoc = formatUserInfo(userInfo);

    const userDetails = await client.createIfNotExists(userDoc);

    dispatch({ type: AT.USER_DETAILS_SUCCESS, payload: { info: userDetails } });

    dispatch({ type: AT.USER_LOGIN_OAUTH_SUCCESS });
  } catch (error) {
    dispatch({ type: AT.USER_LOGIN_OAUTH_FAIL });
    throw error;
  }
}

export async function logout(dispatch) {
  try {
    dispatch({ type: AT.USER_LOGOUT_REQUEST });

    await sleep(1000);
    localStorage.removeItem("loginToken");

    dispatch({ type: AT.USER_REGISTER_DELETE });

    dispatch({ type: AT.USER_LOGIN_DELETE });

    dispatch({ type: AT.USER_LOGIN_OAUTH_DELETE });

    dispatch({ type: AT.USER_LOGOUT_SUCCESS });
    dispatch({ type: AT.USER_LOGOUT_DELETE });

    dispatch({ type: AT.USER_DETAILS_DELETE });
  } catch (error) {
    dispatch({ type: AT.USER_LOGOUT_FAIL });
    throw error;
  }
}

export async function getUserDetails(loginToken, dispatch) {
  try {
    dispatch({ type: AT.USER_DETAILS_REQUEST });

    const query = `*[_type == "user" && _id=="${loginToken}"]`;

    const response = await client.fetch(query);

    dispatch({ type: AT.USER_DETAILS_SUCCESS, payload: { info: response[0] } });
  } catch (error) {
    console.log(error);
    dispatch({ type: AT.USER_DETAILS_FAIL });
    throw error;
  }
}
