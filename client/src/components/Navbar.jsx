import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Menu, MenuItem, Box, Button } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, Brightness4 as Brightness4Icon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import LogoImg from "../utils/Images/Logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Box component={RouterLink} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
            <img src={LogoImg} alt="Vidyalaya" style={{ height: 50 }} />
            <Typography variant="h6" noWrap sx={{ marginLeft: 2 }}>
              Vidyalaya
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/about">About</Button>
            <Button color="inherit" component={RouterLink} to="/compare">Compare</Button>
            <Button color="inherit" component={RouterLink} to="/blogs">Blogs</Button>
            <Button color="inherit" component={RouterLink} to="/chat">Chat</Button>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Find school"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton color="inherit">
              <Brightness4Icon />
            </IconButton>
            <IconButton edge="end" onClick={handleProfileMenuOpen} color="inherit">
              <Avatar src={currentUser?.img} alt={currentUser?.name}>{currentUser?.name[0]}</Avatar>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleProfileMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Navbar;
