import { useGoogleLogin } from "@react-oauth/google";

import { useGlobalState } from "../../context/globalState";

import { oAuthLogin } from "../../state/actions/userActions";

import GoogleIcon from "@mui/icons-material/Google";

import { Button } from "@mui/material";

function GoogleOAuthBtn() {
  const { state, dispatch } = useGlobalState();

  const {
    userLoginOAuth: { loading: oAuthLoading },
  } = state;

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await oAuthLogin(tokenResponse.access_token, dispatch);
      } catch (error) {
        console.log(error);
      }
    },
    ///// Work here \\\\\
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Button type="button" variant="outlined" startIcon={!oAuthLoading && <GoogleIcon />} onClick={() => googleLogin()}>
      {oAuthLoading ? "Loading..." : "Login with Google"}
    </Button>
  );
}

export default GoogleOAuthBtn;
