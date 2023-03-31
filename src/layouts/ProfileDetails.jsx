import { Avatar, Box, Button, Typography } from "@mui/material";

import FlexBox from "./FlexBox.jsx";

import { useGlobalState } from "../context/GlobalStateProvider.jsx";
import { useEffect } from "react";
import { getBusinessDetails } from "../state/actions/businessActions";
import { urlFor } from "../lib/sanityClient.js";

function ProfileDetails({ setIsEditing }) {
  const { state, dispatch } = useGlobalState();

  const {
    businessDetails: {
      loading: businessLoading,
      info: businessInfo,
      loginToken,
    },
  } = state;

  useEffect(() => {
    async function getDetails() {
      try {
        await getBusinessDetails(loginToken, dispatch);
      } catch (error) {
        console.log(error);
      }
    }

    if (loginToken && !businessInfo) {
      getDetails();
    }
  }, []);

  return (
    <>
      {businessLoading ? (
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
              alt="business Image"
              src={
                !businessInfo.profilePic && !businessInfo.profilePicURL
                  ? null
                  : businessInfo?.profilePicURL?.replace("96", "200") ||
                    urlFor(businessInfo.profilePic).url()
              }
              sx={{
                width: "200px",
                height: "200px",
                mx: "auto",
              }}
            />

            {businessInfo.loginType === "manual" ? (
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

            <Typography variant="h6">{businessInfo.name}</Typography>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" mb={1} color={"primary"}>
              Email
            </Typography>

            <Typography variant="h6">{businessInfo.email}</Typography>
          </Box>
        </FlexBox>
      )}
    </>
  );
}

export default ProfileDetails;
