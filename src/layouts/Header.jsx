import { useState } from "react";

import { Nav } from "../components";

import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Tooltip,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Drawer,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useBusinessState } from "@/hooks/states.js";
import { logout } from "../state/actions/businessActions";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { urlFor } from "../lib/sanityClient.js";

function Header() {
  const { state, dispatch } = useBusinessState();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const open = Boolean(anchorEl);

  const {
    businessLogout: { loading: logoutLoading },
    businessDetails: { info: businessInfo, loading: businessLoading },
  } = state;

  function handleMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function handleLogout() {
    try {
      await logout(dispatch);
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AppBar
      position="static"
      sx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "1 / 2",
      }}
      color="primary"
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: { xs: "space-between", md: "flex-end" } }}>
        {/* Ham Button on small devices */}
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{ display: { md: "none" } }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          variant="temporary"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{ display: { md: "none" } }}
        >
          <Toolbar />
          <Typography variant="h5" textAlign={"center"}>
            BET
          </Typography>
          <Nav />
        </Drawer>

        <Stack direction={"row"} alignItems="center">
          {/* Total balance */}
          <IconButton
            aria-label="Change theme"
            color="inherit"
            onClick={() => null}
          >
            <DarkModeIcon />
          </IconButton>

          {/* business settings with dropdown */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleMenuOpen}
                aria-controls={open ? "business-settings" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  alt="business image"
                  src={
                    businessLoading ||
                    (!businessInfo.profilePic && !businessInfo.profilePicURL)
                      ? null
                      : businessInfo.profilePicURL?.replace("96", "200") ||
                        urlFor(businessInfo.profilePic).url()
                  }
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "40px" }}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={NavLink}
                to={"/profile"}
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ mr: 1 }} />
                </ListItemIcon>
                Profile
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ mr: 1 }} />
                </ListItemIcon>
                {logoutLoading ? (
                  <>
                    <CircularProgress color="grey" size={24.5} />
                  </>
                ) : (
                  "Logout"
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
