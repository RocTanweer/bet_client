import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Modal,
  CircularProgress,
} from "@mui/material";

import { FlexBox } from "../../layouts";
import { Navigate, NavLink } from "react-router-dom";

import { useGlobalState } from "../../context/GlobalStateProvider";

import { useFormik } from "formik";
import { registerFormValSch } from "../../lib/yupValidationSchemas";

import { GoogleOAuthBtn } from "../../components";
import { register } from "../../state/actions/businessActions";
import { useState } from "react";

function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state, dispatch } = useGlobalState();

  const {
    businessDetails: { loginToken },
    businessRegister: { loading: registerLoading },
  } = state;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      isAgreed: false,
    },
    validationSchema: registerFormValSch,
    onSubmit: async (values) => {
      try {
        await register({ ...values }, dispatch);
      } catch (error) {
        const { field, value } = error.cause;
        formik.setFieldError(field, value);
      }
    },
  });

  return (
    <>
      {loginToken && <Navigate to={"/dashboard"} replace={true} />}

      <FlexBox csx={{ minHeight: "100vh" }}>
        <Box sx={{ maxWidth: "530px", width: "100%", height: "auto" }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Create an account</Typography>
          </Box>

          <Stack component={"form"} spacing={2} onSubmit={formik.handleSubmit}>
            <Box sx={{ flex: 1 }}>
              <TextField
                label={"Name"}
                type={"text"}
                name={"name"}
                id={"name"}
                fullWidth
                onChange={formik.handleChange}
                error={formik.errors.name && formik.touched.name}
              />
              <FormHelperText error={formik.errors.name && formik.touched.name}>
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </FormHelperText>
            </Box>

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

            <FormGroup>
              <FormControlLabel
                id={"isAgreed"}
                name={"isAgreed"}
                onChange={formik.handleChange}
                control={
                  <Checkbox
                    sx={{
                      color:
                        formik.errors.isAgreed &&
                        formik.touched.isAgreed &&
                        "error.main",
                    }}
                    checked={formik.values.isAgreed}
                  />
                }
                label={
                  <>
                    I agree to{" "}
                    {
                      <Button
                        disableRipple
                        size="small"
                        onClick={() => setIsModalOpen(true)}
                        sx={{ textDecoration: "underline" }}
                      >
                        Terms & Conditions
                      </Button>
                    }
                  </>
                }
              />
              <FormHelperText
                error={formik.errors.isAgreed && formik.touched.isAgreed}
              >
                {formik.errors.isAgreed &&
                  formik.touched.isAgreed &&
                  formik.errors.isAgreed}
              </FormHelperText>

              <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby=""
                aria-describedby=""
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 2,
                  }}
                >
                  <Typography variant="h5" textAlign={"center"} mb={2}>
                    Terms and Conditions
                  </Typography>
                  <Typography mb={1}>
                    In the incident of forgetting the password, the business
                    account will not be recovered. In other words, the{" "}
                    <b>forgot password</b> feature is not implemented
                  </Typography>
                  <Typography>
                    We recommend using <b>google</b> to register
                  </Typography>
                </Box>
              </Modal>
            </FormGroup>

            <Button type="submit" variant="contained" fullWidth>
              {registerLoading ? (
                <>
                  <CircularProgress color="grey" size={24.5} />
                </>
              ) : (
                "Register"
              )}
            </Button>

            <FlexBox csx={{ gap: 1, justifyContent: "flex-start" }}>
              <Typography variant="subtitle2">Already registerd?</Typography>
              <Typography component={NavLink} to={"/login"} replace={true}>
                login here
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

export default Register;
