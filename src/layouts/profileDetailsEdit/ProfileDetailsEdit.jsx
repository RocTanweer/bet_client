import { useState } from "react";

import {
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";

import { FlexBox } from "../flexBox";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { profileDetailsEditFormValSch } from "../../lib/yup/validationSchemas";
import { updateUserDetails } from "../../state/actions/userActions";
import { useGlobalState } from "../../context/globalState";
import { resizeFile, filterKeyValuePair } from "../../utils/others";

import {
  ImageButton,
  ImageSrc,
  ImageBackdrop,
  Image,
} from "./profileDetailsEdit.styled";
import { useFormik } from "formik";
import { urlFor } from "../../lib/sanityClient/sanityClient";

function ProfileDetailsEdit({ setIsEditing }) {
  const [prevImage, setPrevImage] = useState("");

  const { state, dispatch } = useGlobalState();

  const {
    userDetails: { editInfo, info, loginToken },
  } = state;

  const formik = useFormik({
    initialValues: {
      profilePic: editInfo.profilePic,
      firstName: editInfo.firstName,
      lastName: editInfo.lastName,
      email: editInfo.email,
      password: editInfo.password,
    },
    validationSchema: profileDetailsEditFormValSch,
    onSubmit: async (values) => {
      try {
        const mutatedFields = filterKeyValuePair(values, info);
        // fix validation \\
        await updateUserDetails(loginToken, mutatedFields, dispatch);
        setIsEditing(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Stack
      sx={{
        width: "530px",
        flexDirection: "column",
        gap: 3,
        border: "0.5px solid #eee",
        padding: "20px 30px",
      }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <FlexBox csx={{ width: "100%", justifyContent: "flex-start", gap: 2 }}>
        <ImageButton
          focusRipple
          sx={{
            width: "100px",
            height: "100px",
          }}
          component={"label"}
          htmlFor="profilePic"
        >
          {/* SHOW ERROR FOR NOT MEETING REQUIREMENTS */}
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="profilePic"
            name="profilePic"
            style={{ display: "none" }}
            onChange={async (e) => {
              const image = e.target.files[0];

              const resizedImage = await resizeFile(image);

              const reader = new FileReader();

              reader.readAsDataURL(resizedImage);

              reader.onload = () => {
                setPrevImage(reader.result);
              };

              formik.setFieldValue("profilePic", resizedImage);
            }}
          />
          <ImageSrc
            style={{
              backgroundImage: `url(${
                prevImage || urlFor(editInfo.profilePic).url()
              })`,
            }}
          />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <CameraAltIcon />
          </Image>
        </ImageButton>
        <Typography color={"text.secondary"}>Change Profile Pic</Typography>
      </FlexBox>

      <FlexBox csx={{ gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label={"First Name"}
            type={"text"}
            name={"firstName"}
            id={"firstName"}
            fullWidth
            defaultValue={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName && formik.touched.firstName}
          />
          <FormHelperText
            error={formik.errors.firstName && formik.touched.firstName}
          >
            {formik.errors.firstName &&
              formik.touched.firstName &&
              formik.errors.firstName}
          </FormHelperText>
        </Box>

        <Box sx={{ flex: 1 }}>
          <TextField
            label={"Last Name"}
            type={"text"}
            name={"lastName"}
            id={"lastName"}
            fullWidth
            defaultValue={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName && formik.touched.lastName}
          />
          <FormHelperText
            error={formik.errors.lastName && formik.touched.lastName}
          >
            {formik.errors.lastName &&
              formik.touched.lastName &&
              formik.errors.lastName}
          </FormHelperText>
        </Box>
      </FlexBox>

      <Box>
        <TextField
          label={"Email"}
          type={"text"}
          name={"email"}
          id={"email"}
          fullWidth
          defaultValue={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && formik.touched.email}
        />
        <FormHelperText error={formik.errors.email && formik.touched.email}>
          {formik.errors.email && formik.touched.email && formik.errors.email}
        </FormHelperText>
      </Box>

      <Box>
        <TextField
          label={"New Password"}
          type={"password"}
          name={"password"}
          id={"password"}
          fullWidth
          onChange={formik.handleChange}
        />
      </Box>

      <Box>
        <Button
          variant="contained"
          color="grey"
          type="button"
          sx={{ mr: 2 }}
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </Stack>
  );
}

export default ProfileDetailsEdit;
