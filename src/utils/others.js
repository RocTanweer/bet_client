import { AES, enc } from "crypto-js";
import Resizer from "react-image-file-resizer";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function encryptString(string) {
  return AES.encrypt(string, import.meta.env.VITE_SANITY_SECRET).toString();
}

export function decryptString(encryptedString) {
  return AES.decrypt(
    encryptedString,
    import.meta.env.VITE_SANITY_SECRET
  ).toString(enc.Utf8);
}

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

export const filterKeyValuePair = (obj1, obj2) => {
  const filteredObj = Object.entries(obj1).filter(([key1, value1]) => {
    return obj2[key1] !== value1;
  });
  const newObj = Object.fromEntries(filteredObj);
  return newObj;
};
