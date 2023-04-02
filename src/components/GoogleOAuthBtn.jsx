import { useGoogleLogin } from "@react-oauth/google";

import { useBusinessState } from "@/hooks/states.js";

import { oAuthLogin } from "../state/actions/businessActions";

import GoogleIcon from "@mui/icons-material/Google";

import { Box, Button, FormHelperText, CircularProgress } from "@mui/material";
import { useState } from "react";

function GoogleOAuthBtn() {
  const [errMsg, setErrMsg] = useState("");
  const { state, dispatch } = useBusinessState();

  const {
    businessLoginOAuth: { loading: oAuthLoading },
  } = state;

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await oAuthLogin(tokenResponse.access_token, dispatch);
      } catch (error) {
        setErrMsg(error.message);
      }
    },
    ///// Work here \\\\\
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Box>
      <Button
        type="button"
        variant="outlined"
        color={errMsg ? "error" : "primary"}
        fullWidth
        startIcon={!oAuthLoading && <GoogleIcon />}
        onClick={() => googleLogin()}
      >
        {oAuthLoading ? (
          <>
            <CircularProgress color="grey" size={24.5} />
          </>
        ) : (
          "Login with google"
        )}
      </Button>
      <FormHelperText error={Boolean(errMsg)}>
        {errMsg && errMsg}
      </FormHelperText>
    </Box>
  );
}

export default GoogleOAuthBtn;
