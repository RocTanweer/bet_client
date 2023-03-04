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
