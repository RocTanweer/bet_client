import { client } from "@/lib/sanityClient.js";
import { decryptString, encryptString, sleep } from "@/utils/functions";

import axios from "axios";

import * as AT from "../actionTypes/businessActionTypes";

export async function register(businessDoc, dispatch) {
  try {
    dispatch({ type: AT.BUSINESS_REGISTER_REQUEST });

    const query = `*[_type == "business" && email=="${businessDoc.email}"][0]`;

    const existingBusiness = await client.fetch(query);

    if (!existingBusiness) {
      delete businessDoc.isAgreed;
      const newBusinessDoc = {
        _type: "business",
        ...businessDoc,
        password: encryptString(businessDoc.password),
        loginType: "manual",
      };

      const response = await client.create(newBusinessDoc);

      dispatch({
        type: AT.BUSINESS_DETAILS_LOGIN_TOKEN,
        payload: { loginToken: response._id },
      });

      dispatch({
        type: AT.BUSINESS_DETAILS_SUCCESS,
        payload: { info: response },
      });

      localStorage.setItem("loginToken", encryptString(response._id));

      dispatch({ type: AT.BUSINESS_REGISTER_SUCCESS });
    } else if (existingBusiness.loginType === "manual") {
      throw new Error(null, {
        cause: {
          field: "email",
          value:
            "business already exists with this email, please try logging in using login form",
        },
      });
    } else {
      throw new Error(null, {
        cause: {
          field: "email",
          value:
            "business already exists with this email, please try logging in using google",
        },
      });
    }
  } catch (error) {
    dispatch({ type: AT.BUSINESS_REGISTER_FAIL });
    // Handle promise failing error \\
    throw error;
  }
}

export async function login(businessCred, dispatch) {
  try {
    dispatch({ type: AT.BUSINESS_LOGIN_REQUEST });

    const query = `*[_type == "business" && email=="${businessCred.email}"][0]`;

    const existingBusiness = await client.fetch(query);

    if (!existingBusiness) {
      throw new Error(null, {
        cause: { field: "email", value: "No business exists with this email" },
      });
    } else if (existingBusiness.loginType === "gOAuth") {
      throw new Error(null, {
        cause: {
          field: "email",
          value: "Oops, you registered using Google, please continue with it",
        },
      });
    }

    const existingBusinessDecryptedPassword = decryptString(
      existingBusiness.password
    );

    if (existingBusinessDecryptedPassword === businessCred.password) {
      dispatch({
        type: AT.BUSINESS_DETAILS_LOGIN_TOKEN,
        payload: { loginToken: existingBusiness._id },
      });

      dispatch({
        type: AT.BUSINESS_DETAILS_SUCCESS,
        payload: { info: existingBusiness },
      });

      localStorage.setItem("loginToken", encryptString(existingBusiness._id));

      dispatch({ type: AT.BUSINESS_LOGIN_SUCCESS });
    } else {
      throw new Error(null, {
        cause: { field: "password", value: "Wrong password, please try again" },
      });
    }
  } catch (error) {
    dispatch({ type: AT.BUSINESS_LOGIN_FAIL });
    throw error;
  }
}

export async function oAuthLogin(accessToken, dispatch) {
  try {
    dispatch({ type: AT.BUSINESS_LOGIN_OAUTH_REQUEST });

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const { data: businessInfo } = await axios.get(
      import.meta.env.VITE_GOOGLE_OAUTH_BUSINESSINFO_URL,
      config
    );

    const query = `*[_type == "business" && email=="${businessInfo.email}"][0]`;

    const existingBusiness = await client.fetch(query);

    let businessDetails;
    if (!existingBusiness) {
      const newBusinessDoc = {
        _type: "business",
        name: `${businessInfo.given_name} ${businessInfo.family_name}`,
        email: businessInfo.email,
        profilePicURL: businessInfo.picture,
        loginType: "gOAuth",
      };
      businessDetails = await client.create(newBusinessDoc);
    } else if (existingBusiness.loginType === "gOAuth") {
      businessDetails = existingBusiness;
    } else {
      throw new Error(
        "business exist with this email, please try logging in using login form"
      );
    }

    dispatch({
      type: AT.BUSINESS_DETAILS_LOGIN_TOKEN,
      payload: { loginToken: businessDetails._id },
    });

    localStorage.setItem("loginToken", encryptString(businessDetails._id));

    dispatch({
      type: AT.BUSINESS_DETAILS_SUCCESS,
      payload: { info: businessDetails },
    });

    dispatch({ type: AT.BUSINESS_LOGIN_OAUTH_SUCCESS });
  } catch (error) {
    dispatch({ type: AT.BUSINESS_LOGIN_OAUTH_FAIL });
    throw error;
  }
}

export async function logout(dispatch) {
  try {
    dispatch({ type: AT.BUSINESS_LOGOUT_REQUEST });

    await sleep(1000);
    localStorage.removeItem("loginToken");

    dispatch({ type: AT.BUSINESS_REGISTER_DELETE });

    dispatch({ type: AT.BUSINESS_LOGIN_DELETE });

    dispatch({ type: AT.BUSINESS_LOGIN_OAUTH_DELETE });

    dispatch({ type: AT.BUSINESS_LOGOUT_SUCCESS });
    dispatch({ type: AT.BUSINESS_LOGOUT_DELETE });

    dispatch({ type: AT.BUSINESS_DETAILS_DELETE });
  } catch (error) {
    dispatch({ type: AT.BUSINESS_LOGOUT_FAIL });
    throw error;
  }
}

export async function getBusinessDetails(loginToken, dispatch) {
  try {
    dispatch({ type: AT.BUSINESS_DETAILS_REQUEST });

    const query = `*[_type == "business" && _id=="${loginToken}"][0]`;

    const response = await client.fetch(query);

    dispatch({
      type: AT.BUSINESS_DETAILS_SUCCESS,
      payload: { info: response },
    });
  } catch (error) {
    dispatch({ type: AT.BUSINESS_DETAILS_FAIL });
    throw error;
  }
}

export async function updateBusinessDetails(
  loginToken,
  dataForUpdation,
  dispatch
) {
  try {
    dispatch({ type: AT.BUSINESS_DETAILS_UPDATE_REQUEST });

    const { mutatedObj, prevProfilePicId } = dataForUpdation;

    if (mutatedObj.profilePic) {
      const response = await client.assets.upload(
        "image",
        mutatedObj.profilePic
      );

      mutatedObj.profilePic = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: response._id,
        },
      };
    }

    if (mutatedObj.email) {
      const query = `*[_type == "business" && email=="${mutatedObj.email}"][0]`;
      const existingBusiness = await client.fetch(query);

      if (existingBusiness) {
        throw new Error(null, {
          cause: { field: "email", value: "Email already taken" },
        });
      }
    }

    const data = await client.patch(loginToken).set(mutatedObj).commit();

    if (prevProfilePicId) await client.delete(prevProfilePicId);

    dispatch({
      type: AT.BUSINESS_DETAILS_SUCCESS,
      payload: { info: data },
    });
    dispatch({ type: AT.BUSINESS_DETAILS_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: AT.BUSINESS_DETAILS_UPDATE_FAIL });
    throw error;
  }
}
