import { useState } from "react";
import { useFormik } from "formik";

import {
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

import { FlexBox } from "../../../layouts";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { profileDetailsEditFormValSch } from "../lib/profileYup.js";
import { filterKeyValuePair } from "../utils/profileFunctions.js";

import { updateBusinessDetails } from "../../../state/actions/businessActions.js";
import { useGlobalState } from "../../../context/GlobalStateProvider.jsx";
import { resizeFile } from "../../../utils/functions";

import {
  ImageButton,
  ImageSrc,
  ImageBackdrop,
  Image,
} from "./profileDetailsEdit.styled";
import { urlFor } from "../../../lib/sanityClient.js";

function ProfileDetailsEdit({ setIsEditing }) {
  const [prevImage, setPrevImage] = useState("");

  const { state, dispatch } = useGlobalState();

  const {
    businessDetails: { info: businessInfo, loginToken },
    businessDetailsUpdate: { loading: updateLoading },
  } = state;

  const formik = useFormik({
    initialValues: {
      profilePic: businessInfo.profilePic,
      name: businessInfo.name,
      email: businessInfo.email,
      password: businessInfo.password,
    },
    validationSchema: profileDetailsEditFormValSch,
    onSubmit: async (values) => {
      try {
        const mutatedFields = filterKeyValuePair(values, businessInfo);

        if (Object.keys(mutatedFields).length !== 0) {
          const dataForUpdation = {
            mutatedObj: mutatedFields,
            prevProfilePicId:
              mutatedFields.profilePic && businessInfo.profilePic?.asset._ref,
          };

          await updateBusinessDetails(loginToken, dataForUpdation, dispatch);
        }
        setIsEditing(false);
      } catch (error) {
        /// Handle Error Feedback \\\
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
                prevImage ||
                (businessInfo.profilePic &&
                  urlFor(businessInfo.profilePic).url())
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

      <Box sx={{ flex: 1 }}>
        <TextField
          label={"Name"}
          type={"text"}
          name={"name"}
          id={"name"}
          fullWidth
          defaultValue={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && formik.touched.name}
        />
        <FormHelperText error={formik.errors.name && formik.touched.name}>
          {formik.errors.name && formik.touched.name && formik.errors.name}
        </FormHelperText>
      </Box>

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
          {updateLoading ? (
            <>
              <CircularProgress color="grey" size={24.5} />
            </>
          ) : (
            "Save"
          )}
        </Button>
      </Box>
    </Stack>
  );
}

export default ProfileDetailsEdit;
