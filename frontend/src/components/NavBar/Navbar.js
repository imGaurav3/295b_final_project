import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import moodifyIcon from '../../images/moodify_icon.png';
import { useHistory, useLocation } from 'react-router-dom'; // Import useHistory hook for navigation

// const pages = [];
// const settings = ['Movie Preferences', 'Current Mood', 'Logout'];

const settings = [
  { label: 'Movie Preferences', route: '/signupquestions_a' },
  { label: 'Current Mood', route: '/signinquestions' },
  { label: 'Logout', action: 'logout' } // Assuming 'Logout' also has a route
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const location = useLocation();
  const history = useHistory(); // Access the history object for navigation

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem('currentUser'); // Clear the 'currentUser' item
      // You can add more localStorage items to clear if needed
      // localStorage.removeItem('admin'); // Example: Clear 'admin' item if exists
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  };

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

  const handleMenuItemClick = (item) => {
    if (!item) {
      console.log('Nothing!');
      return;
    }; // Safety check for undefined item
    if (item.action === 'logout') {
      // Perform logout action
      console.log('Clicked logout')
      try {
        localStorage.removeItem('currentUser'); // Clear the 'currentUser' item
        // You can add more localStorage items to clear if needed
        // localStorage.removeItem('admin'); // Example: Clear 'admin' item if exists
      } catch (error) {
        console.error('Error clearing local storage:', error);
      }

      history.push('/login');
    } else if (item.route) {
      console.log('Clicked other option')
      // Navigate to the specified route
      history.push(item.route);
    }

    // Close the menu
    handleCloseUserMenu();
  };

  // Check if the current location is the landing page ('/')
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return null; // If it's the landing page, do not render the Navbar
  }

  const isLoginPage = location.pathname === '/login/' || location.pathname === '/signup';

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#272626', boxShadow: '1px 1px 6px #1b1a1a', borderBottom: '0.5px solid #767676'}}>
      <Container maxWidth="100vw" style={{ backgroundColor: '#212020'}}>
        <Toolbar disableGutters>
          <img src={moodifyIcon} style={{  width: '40px', paddingRight: '10px'}} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Raleway',
              fontWeight: 500,
              // letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              "&:hover": { color: "white", textDecoration: 'none' }
            }}
          >
            MOODIFY
          </Typography>

          <Box sx={{ flexGrow: 50 }} />
          {/* <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
        
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          
          {!isLoginPage && (
            <Box sx={{ flexGrow: 0 }} >
              <Tooltip title="Options" style={{ fontFamily: 'Raleway' }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ bgcolor: '#b196e4'}} /> */}
                  <MenuIcon style={{color: '#b196e4'}}></MenuIcon>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    backgroundColor: '#212020', // Set the desired background color
                    color: 'rgb(221, 220, 218)',
                  },
                }}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={() => handleMenuItemClick(setting)}>
                    <Typography style={{ fontFamily: 'Raleway', fontSize: '13px', fontWeight: 'bold'}} textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;