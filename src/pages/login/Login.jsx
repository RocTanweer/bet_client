import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Navigate, NavLink, useLocation } from "react-router-dom";

import { FlexBox } from "../../layouts";
import { GoogleOAuthBtn } from "../../components";
import { useGlobalState } from "../../context/GlobalStateProvider.jsx";
import { login } from "../../state/actions/businessActions";
import { loginFormValSch } from "./lib/loginYup.js";

function Login() {
  const { state, dispatch } = useGlobalState();
  const { state: locState } = useLocation();

  const {
    businessDetails: { loginToken },
    businessLogin: { loading: loggingLoading },
  } = state;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormValSch,
    onSubmit: async (values) => {
      try {
        await login(values, dispatch);
      } catch (error) {
        const { field, value } = error.cause;
        formik.setFieldError(field, value);
      }
    },
  });

  return (
    <>
      {loginToken && (
        <Navigate
          to={
            locState?.prevPath === undefined ? "/dashboard" : locState.prevPath
          }
          replace={true}
        />
      )}

      <FlexBox csx={{ minHeight: "100vh" }}>
        <Box sx={{ maxWidth: "530px", width: "100%", height: "auto" }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
          </Box>

          <Stack component={"form"} spacing={2} onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                label={"Email"}
                type={"text"}
                name={"email"}
                id={"email"}
                fullWidth
                onChange={formik.handleChange}
                error={formik.errors.email && formik.touched.email}
              />
              <FormHelperText
                error={formik.errors.email && formik.touched.email}
              >
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </FormHelperText>
            </Box>

            <Box>
              <TextField
                label={"Password"}
                type={"password"}
                name={"password"}
                id={"password"}
                fullWidth
                onChange={formik.handleChange}
                error={formik.errors.password && formik.touched.password}
              />
              <FormHelperText
                error={formik.errors.password && formik.touched.password}
              >
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </FormHelperText>
            </Box>

            <Button type="submit" variant="contained" fullWidth>
              {loggingLoading ? (
                <>
                  <CircularProgress color="grey" size={24.5} />
                </>
              ) : (
                "Login"
              )}
            </Button>

            <FlexBox csx={{ gap: 1, justifyContent: "flex-start" }}>
              <Typography variant="subtitle2">Not yet registerd?</Typography>
              <Typography component={NavLink} to={"/register"} replace={true}>
                create an account
              </Typography>
            </FlexBox>

            <Divider
              orientation="horizontal"
              variant="subtitle2"
              flexItem
              sx={{ color: "text.secondary" }}
            >
              Or
            </Divider>

            <GoogleOAuthBtn />
          </Stack>
        </Box>
      </FlexBox>
    </>
  );
}

export default Login;
