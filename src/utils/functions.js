import { purple, cyan } from "@mui/material/colors";

import { AES, enc } from "crypto-js";
import Resizer from "react-image-file-resizer";

/**
 * @description This takes two array of objects, which are dummy data for now, and returns data for the chart
 * @param {object[]} dateWiseInvestmentTrans
 * @param {object[]} dateWiseSaleTrans
 * @returns {object}
 */
export function dataForChart(dateWiseInvestmentTrans, dateWiseSaleTrans) {
  const labels = dateWiseInvestmentTrans.map((trans) => trans.date);
  const data1 = dateWiseInvestmentTrans.map((trans) => trans.amount);
  const data2 = dateWiseSaleTrans.map((trans) => trans.amount);
  const options = {};

  return {
    labels,
    options,
    datasets: [
      {
        label: "Investment Transactions",
        data: data1,
        borderColor: purple[300],
        backgroundColor: purple[300],
        tension: 0.1,
        links: labels.map((date) => `/investment/history/${date}`),
      },
      {
        label: "Sales",
        data: data2,
        borderColor: cyan[300],
        backgroundColor: cyan[300],
        tension: 0.1,
        links: labels.map((date) => `/sale/history/${date}`),
      },
    ],
  };
}

/**
 *
 * @param {object} userInfo - responsed user data from google
 * @returns {object} - formatted object suitable for creating doc in sanity
 */
export function formatUserInfo(userInfo) {
  const userDoc = {
    _type: "user",
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
    email: userInfo.email,
    profilePicURL: userInfo.picture,
    loginType: "gOAuth",
  };
  return userDoc;
}

/**
 *
 * @param {number} ms - number of milliseconds to sleep for
 * @returns
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *
 * @param {string} string - the string data to be encrypted
 * @returns {string} - the encrypted string
 */
export function encryptString(string) {
  return AES.encrypt(string, import.meta.env.VITE_SANITY_SECRET).toString();
}

/**
 *
 * @param {string} encryptedString - the encrypted string
 * @returns {string} - the decrypted string
 */
export function decryptString(encryptedString) {
  return AES.decrypt(
    encryptedString,
    import.meta.env.VITE_SANITY_SECRET
  ).toString(enc.Utf8);
}

/**
 *
 * @param {File} file - file object containing info about image
 * @returns - promise which resolves returning resized image
 */
export function resizeFile(file) {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
}

/**
 * @description This takes first object and second object having same set of keys
 * @param {object} obj1
 * @param {object} obj2
 * @returns {object} - object containing properties of obj1 which are different from corresponding properties in obj2
 */
export const filterKeyValuePair = (obj1, obj2) => {
  const filteredObj = Object.entries(obj1).filter(([key1, value1]) => {
    return obj2[key1] !== value1;
  });
  const newObj = Object.fromEntries(filteredObj);
  return newObj;
};