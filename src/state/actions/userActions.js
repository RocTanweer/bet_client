import * as AT from "../actionTypes/userActionTypes";

import axios from "axios";

import { client } from "../../lib/sanityClient";

import { formatUserInfo } from "../../utils";
import { decryptString, encryptString, sleep } from "../../utils/others";

export async function register(userDoc, dispatch) {
  try {
    dispatch({ type: AT.USER_REGISTER_REQUEST });

    const query = `*[_type == "user" && email=="${userDoc.email}"]`;

    const existingUser = await client.fetch(query);

    if (existingUser.length === 0) {
      delete userDoc.isAgreed;
      const sanityUserDoc = {
        _type: "user",
        ...userDoc,
        password: encryptString(userDoc.password),
        loginType: "manual",
      };

      const response = await client.create(sanityUserDoc);

      dispatch({
        type: AT.USER_DETAILS_LOGIN_TOKEN,
        payload: { loginToken: response._id },
      });

      dispatch({ type: AT.USER_DETAILS_SUCCESS, payload: { info: response } });

      localStorage.setItem("loginToken", encryptString(response._id));

      dispatch({ type: AT.USER_REGISTER_SUCCESS });
    } else if (existingUser.length !== 0 && existingUser[0].loginType === "manual") {
      throw new Error("User already exists with this email, please try logging in using login form");
    } else {
      throw new Error("User already exists with this email, please try logging in using google");
    }
  } catch (error) {
    dispatch({ type: AT.USER_REGISTER_FAIL });
    throw error;
  }
}

export async function login(userCred, dispatch) {
  try {
    dispatch({ type: AT.USER_LOGIN_REQUEST });

    const query = `*[_type == "user" && email=="${userCred.email}"]`;

    const existingUser = await client.fetch(query);

    if (existingUser.length === 0) {
      throw new Error("No user exist with this email");
    } else if (existingUser.length !== 0 && existingUser[0].loginType === "gOAuth") {
      throw new Error("Oops, you registered using Google, please continue with it");
    }

    const existingUserDecryptedPassword = decryptString(existingUser[0].password);

    if (existingUserDecryptedPassword === userCred.password) {
      dispatch({
        type: AT.USER_DETAILS_LOGIN_TOKEN,
        payload: { loginToken: existingUser[0]._id },
      });

      dispatch({ type: AT.USER_DETAILS_SUCCESS, payload: { info: existingUser[0] } });

      localStorage.setItem("loginToken", encryptString(existingUser[0]._id));

      dispatch({ type: AT.USER_LOGIN_SUCCESS });
    } else {
      throw new Error("Wrong password");
    }
  } catch (error) {
    dispatch({ type: AT.USER_LOGIN_FAIL });
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

    const query = `*[_type == "user" && email=="${userInfo.email}"]`;

    const existingUser = await client.fetch(query);

    let userDetails;

    if (existingUser.length === 0) {
      const userDoc = formatUserInfo(userInfo);
      userDetails = await client.create(userDoc);
    } else if (existingUser.length !== 0 && existingUser.loginType === "gOAuth") {
      userDetails = existingUser[0];
    } else {
      throw new Error("User exist with this email, please try logging in using login form");
    }

    dispatch({
      type: AT.USER_DETAILS_LOGIN_TOKEN,
      payload: { loginToken: userDetails._id },
    });

    localStorage.setItem("loginToken", encryptString(userDetails._id));

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
