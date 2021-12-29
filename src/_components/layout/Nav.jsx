import { useRecoilValue } from "recoil";

import { authAtom } from "_state";
import { useUserActions } from "_actions";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ToggleTheme } from "_components/theme/ToggleTheme";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // only show nav when logged in

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => navigate("/")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {auth ? (
                <MenuItem onClick={() => navigate("/dashboard")}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              ) : (
                ""
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/about")}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            {auth ? (
              <Button
                onClick={() => navigate("/dashboard")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
            ) : (
              ""
            )}

            <Button
              onClick={() => navigate("/contact")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact
            </Button>
            <Button
              onClick={() => navigate("/about")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About us
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ToggleTheme />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {auth ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={auth?.userName} src={auth?.image} />
                </IconButton>
              </Tooltip>
            ) : (
              <Button variant="primary" href="/login">
                Login
              </Button>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">
                  {auth?.userName} Profile
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Account Settings</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>

              <MenuItem onClick={() => userActions.logout()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export { Navbar };
