import React, { useState } from 'react';
// import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Navbar from "../NavBar/Navbar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import MovieRecommendation from '../Movie/MovieRecommendation';
import MusicRecommendation from '../Music/MusicRecommendation';

const StyledTab = styled(Tab)({
    // "&.Mui-selected": {
      flex: 1,
      color: "#ccc",
      fontSize: '18px',
      fontFamily: 'Hind',
      "&.Mui-selected": {
        color: '#ded4f1'
      }
    //
  });

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function Dashboard() {
 
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const movieTemplate =  () => {
        return (<MovieRecommendation />);
    }
    const musicTemplate = () => {
        return (<MusicRecommendation />);
    }
  
    return (
        <div className='dashboard-page' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Navbar/>

        {/* <MDBContainer display="flex" style={{paddingTop: '20px', zIndex: '1'}}> */}
        <div style={{paddingTop: '20px', zIndex: '1', width: '95%'}}>
            <div className='dashboard-tabs' style={{fontFamily: 'Hind'}}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: '#151415' }} >
                        <Tabs 
                        TabIndicatorProps={{style: {background:'#b196e4', color: 'white'}}}
                        value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" 
                        variant="fullWidth"
                        centered >
                        <StyledTab sx={{borderRight: '1px solid #151415'}} label="Movie Picks" {...a11yProps(0)} />
                        <StyledTab label="Song Picks" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <Box>
                        <CustomTabPanel value={value} index={0}>
                            <MovieRecommendation /> 
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <MusicRecommendation /> {/* Render MusicRecommendation component */}
                        </CustomTabPanel>
                    </Box>
                </Box>
            </div>
        
        {/* </MDBContainer> */}
        </div>
            {/* Absolute positioned images */}
            {/* <div style={{ position: 'absolute', bottom: 10, left: 20, zIndex: '0' }}>
                <img src={movieImg} alt="Left Side Image" style={{ width: '20%', height: 'auto' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 15, right: 25, zIndex: '0'  }}>
            <img src={popcornImg} alt="Right Side Image" style={{ width: 'auto', height: '300px' }} />
            </div> */}
        </div>
    );
    }


