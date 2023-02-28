import { AES, enc } from "crypto-js";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function encryptString(string) {
  return AES.encrypt(string, import.meta.env.VITE_SANITY_SECRET).toString();
}

export function decryptString(encryptedString) {
  return AES.decrypt(encryptedString, import.meta.env.VITE_SANITY_SECRET).toString(enc.Utf8);
}
