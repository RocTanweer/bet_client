import { useState } from "react";

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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  function handleMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
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
          onClick={() => null}
          sx={{ display: { md: "none" } }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Stack direction={"row"} alignItems="center">
          {/* Total balance */}
          <IconButton
            aria-label="Change theme"
            color="inherit"
            onClick={() => null}
          >
            <DarkModeIcon />
          </IconButton>

          {/* User settings with dropdown */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleMenuOpen}
                aria-controls={open ? "user-settings" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  alt="user image"
                  src="https://avatars.githubusercontent.com/u/71582699?v=4"
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
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <AccountCircleIcon sx={{ mr: 1 }} />
                </ListItemIcon>
                Profile
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <LogoutIcon sx={{ mr: 1 }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
