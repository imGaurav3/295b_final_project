/* eslint-disable */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ListItemText } from "@mui/material";
import logo from "../../images/logo.jpg";
//import logo from "../../logo.jpg";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const login = localStorage.getItem("loggedIn");

  //let history = useNavigate();
  const useLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="relative" style={{ backgroundColor: "#ee7724" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 55678 }}
              paddingLeft={2}
            >
              <img src={logo} style={{ width: "55px" }} alt="logo" />
              <Link style={{ color: "White" }} to="/">
                 Moodify
              </Link>
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              style={{ color: "black" }}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={useLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <Link to="/login" >
            Logout
          </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
