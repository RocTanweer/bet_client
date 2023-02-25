import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  FormHelperText,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";

import { FlexBox } from "../../layouts/flexBox";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";

import { loginFormValSch } from "../../lib/yup/validationSchemas";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormValSch,
    onSubmit: (values) => console.log(values),
  });

  return (
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
            <FormHelperText error={formik.errors.email && formik.touched.email}>
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
            Login
          </Button>

          <FlexBox csx={{ gap: 1, justifyContent: "flex-start" }}>
            <Typography variant="subtitle2">Not yet registerd?</Typography>
            <Typography component={NavLink} to={"/register"}>
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

          <Button type="button" variant="outlined" startIcon={<GoogleIcon />}>
            Login with Google
          </Button>
        </Stack>
      </Box>
    </FlexBox>
  );
}

export default Login;
