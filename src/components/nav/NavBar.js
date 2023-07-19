import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";


export const NavBar = ({ toggleTheme, themeMode }) => {
  const navigate = useNavigate();
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleAvatarOpen = (event) => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleAvatarClose = () => {
    setAnchorElAvatar(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GhostPen
        </Typography>
        <div>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="toggle theme"
          >
            {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-haspopup="true"
            onClick={handleAvatarOpen}
            aria-controls="avatar-menu"
            aria-label="account menu"
          >
            <Avatar src={"./images/ghost.svg"} className="avatar" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElMenu)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={Link}
              to="/letter"
              onClick={handleMenuClose}
            >
              Write a letter
            </MenuItem>
            <MenuItem
              component={Link}
              to="/library"
              onClick={handleMenuClose}
            >
              Letter Library
            </MenuItem>
            <MenuItem
              component={Link}
              to="/contact"
              onClick={handleMenuClose}
            >
              Manage Contacts
            </MenuItem>
            <MenuItem
              component={Link}
              to="/campaign"
              onClick={handleMenuClose}
            >
              Manage Campaigns
            </MenuItem>
            <MenuItem
              component={Link}
              to="/writecampaign"
              onClick={handleMenuClose}
            >
              Write a Campaign
            </MenuItem>
            <MenuItem
              component={Link}
              to="/campaignlist"
              onClick={handleMenuClose}
            >
              Campaign List
            </MenuItem>
          </Menu>
          <Menu
            id="avatar-menu"
            anchorEl={anchorElAvatar}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElAvatar)}
            onClose={handleAvatarClose}
          >
            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleAvatarClose}
            >
              Edit Profile
            </MenuItem>
            {localStorage.getItem("auth_token") !== null ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <div key={`menu-items`}>
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={handleAvatarClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/register"
                  onClick={handleAvatarClose}
                >
                  Register
                </MenuItem>
              </div>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
