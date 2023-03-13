import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

import { FlexBox } from "../../layouts/flexBox";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import { loginFormValSch } from "../../lib/yup/validationSchemas";
import { useGlobalState } from "../../context/globalState";
import GoogleOAuthBtn from "../../components/googleOAuthBtn/GoogleOAuthBtn";

import { login } from "../../state/actions/userActions";

function Login() {
  const { state, dispatch } = useGlobalState();
  const { state: locState } = useLocation();

  const {
    userDetails: { loginToken },
    userLogin: { loading: loggingLoading },
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
