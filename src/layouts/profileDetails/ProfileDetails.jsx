import { Avatar, Box, Button, Typography } from "@mui/material";

import { FlexBox } from "../../layouts/flexBox";

import { useGlobalState } from "../../context/globalState";
import { useEffect } from "react";
import { getUserDetails } from "../../state/actions/userActions";
import { urlFor } from "../../lib/sanityClient/sanityClient";

function ProfileDetails({ setIsEditing }) {
  const { state, dispatch } = useGlobalState();

  const {
    userDetails: { loading: userLoading, info: userInfo, loginToken },
  } = state;

  useEffect(() => {
    async function getDetails() {
      try {
        await getUserDetails(loginToken, dispatch);
      } catch (error) {
        console.log(error);
      }
    }

    if (loginToken && !userInfo) {
      getDetails();
    }
  }, []);

  return (
    <>
      {userLoading ? (
        "Loading..."
      ) : (
        <FlexBox
          csx={{
            width: "530px",
            flexDirection: "column",
            gap: 4,
            border: "0.5px solid #eee",
            padding: "20px 30px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Avatar
              alt="user Image"
              src={
                userInfo?.profilePicURL?.replace("96", "200") ||
                urlFor(userInfo?.profilePic).url()
              }
              sx={{
                width: "200px",
                height: "200px",
                mx: "auto",
              }}
            />

            {userInfo.loginType === "manual" ? (
              <>
                <FlexBox csx={{ width: "100%", justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="grey"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Info
                  </Button>
                </FlexBox>
              </>
            ) : null}
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" mb={1} color={"primary"}>
              Your name
            </Typography>

            <Typography variant="h6">
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" mb={1} color={"primary"}>
              Email
            </Typography>

            <Typography variant="h6">{userInfo.email}</Typography>
          </Box>
        </FlexBox>
      )}
    </>
  );
}

export default ProfileDetails;
