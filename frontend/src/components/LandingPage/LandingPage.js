import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bgImg from '../../images/landingPageImg4.jpeg';
import { useHistory } from 'react-router-dom';

const landingPageStyles = {
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      overflowY: 'hidden',
      backgroundColor: 'black',
      position: 'relative', // Ensure relative position for overlay
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'black',
      opacity: 0.6,
      zIndex: 1, // Ensure the overlay is above the background image
    },
    content: {
      position: 'relative', // Ensure content is above overlay
      zIndex: 2, // Ensure content is above overlay
      textAlign: 'center',
    },
    title: {
      color: '#FFFFFF',
      fontFamily: 'Raleway',
      fontWeight: 'bold',
      fontSize: '5rem',
      marginBottom: '16px',
    },
    slogan: {
      color: '#FFFFFF',
      fontFamily: 'Raleway',
      fontSize: '2rem',
      marginBottom: '32px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
    },
    button: {
      outline: 'none',
      backgroundColor: '#b196e4',
      fontFamily: 'Raleway',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#b196e4', // Keep the same background color on hover
      },
      '&:focus': {
        outline: 'none', // Remove the default blue outline on focus
      },
    },
  };
  
  const LandingPage = () => {
    const history = useHistory(); // Access the history object for navigation
  
    const handleSignUp = () => {
      history.push('/signup'); // Redirect to the '/signup' route
    };
  
    const handleLogin = () => {
      history.push('/login'); // Redirect to the '/login' route
    };
  
    return (
      <div style={landingPageStyles.root}>
        <div style={landingPageStyles.overlay} />
        <div style={landingPageStyles.content}>
          <Typography variant="h2" style={landingPageStyles.title}>
            Moodify
          </Typography>
          <Typography variant="subtitle1" style={landingPageStyles.slogan}>
            Elevate your mood with tailored entertainment!
          </Typography>
          <div style={landingPageStyles.buttonContainer}>
            <Button
              variant="contained"
            //   color="primary"
              size="large"
              onClick={handleSignUp}
              style={landingPageStyles.button}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
            //   color="primary"
              size="large"
              onClick={handleLogin}
              style={landingPageStyles.button}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LandingPage;