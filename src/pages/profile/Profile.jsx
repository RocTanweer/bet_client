import { Avatar, Box, Paper, Typography } from "@mui/material";
import { FlexBox } from "../../layouts/flexBox";

import { useGlobalState } from "../../context/globalState";
import { useEffect } from "react";
import { getUserDetails } from "../../state/actions/userActions";

function Profile() {
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
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
      }}
    >
      {userLoading ? (
        "Loading..."
      ) : (
        <Box component={Paper} sx={{ padding: "20px 40px" }}>
          <Avatar alt="user Image" src={userInfo.profilePicURL?.replace("96", "200")} sx={{ width: "200px", height: "200px", mb: 2 }} />
          <Box>
            <Typography variant="subtitle2" color={"primary"}>
              Your name
            </Typography>

            <Typography>
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color={"primary"}>
              Email
            </Typography>

            <Typography variant="subtitle1">{userInfo.email}</Typography>
          </Box>
        </Box>
      )}
    </FlexBox>
  );
}

export default Profile;
