import { Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';

export const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);

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
            edge="end"
            color="inherit"
            aria-haspopup="true"
            onClick={handleAvatarOpen}
            aria-controls="avatar-menu"
            aria-label="account menu"
          >
            <Avatar />
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
            <MenuItem component={Link} to="/letter" onClick={handleMenuClose}>
              Write a letter
            </MenuItem>
            <MenuItem component={Link} to="/library" onClick={handleMenuClose}>
              Letter Library
            </MenuItem>
            <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>
              Manage Contacts
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
            <MenuItem component={Link} to="/profile" onClick={handleAvatarClose}>
              Edit Profile
            </MenuItem>
            {localStorage.getItem("auth_token") !== null ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <>
                <MenuItem component={Link} to="/login" onClick={handleAvatarClose}>
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleAvatarClose}>
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
