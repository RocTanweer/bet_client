export function formatUserInfo(userInfo) {
  const userDoc = {
    _id: userInfo.sub,
    _type: "user",
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
    email: userInfo.email,
    profilePicURL: userInfo.picture,
  };
  return userDoc;
}
