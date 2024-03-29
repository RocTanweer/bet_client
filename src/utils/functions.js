import Resizer from "react-image-file-resizer";

import { AES, enc } from "crypto-js";

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
 * i This function is same as combineReducer from redux
 * @param {Object} slices An Object containing all the reducers in a key-value pair
 * @returns rootReducer which is a usual reducer but it remembers slices object as closure and operate upon it and not switch-case stuff
 */
export const combineReducers = (slices) => {
  return (state, action) => {
    return Object.keys(slices).reduce((accu, prop) => {
      return {
        ...accu,
        [prop]: slices[prop](accu[prop], action),
      };
    }, state);
  };
};
