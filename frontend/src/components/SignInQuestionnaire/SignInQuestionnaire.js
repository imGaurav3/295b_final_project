import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
// import Button from 'react-bootstrap/Button';
import pic from '../../images/signup-page-img.png';
import logo from '../../logo.jpg';
import axios from 'axios';
import url from '../../utils/urlconfig';
import jwtDecode from 'jwt-decode';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { MenuList } from '@mui/material';
import {SegmentedControl} from '@primer/react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Navbar from "../NavBar/Navbar";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useHistory } from 'react-router-dom';

import happyWhiteIcon from '../../images/happiness_white.png';
import happyPurpleIcon from '../../images/happiness_purple.png';
import sadWhiteIcon from '../../images/sad_white.png';
import sadPurpleIcon from '../../images/sad_purple.png';
import neutralWhiteIcon from '../../images/neutral_white.png';
import neutralPurpleIcon from '../../images/neutral_purple.png';

import horrorImg from '../../images/Horror-movie-bro.png';
import musicImg from '../../images/Music-bro.png';


const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#b196e4',
  '&:hover': {
    backgroundColor: '#8268b3',
    cursor: 'click',
  },
  borderRadius: '10px',
  width: '23%',
  textTransform: 'none',
  fontFamily: 'Hind',
  letterSpacing: 'normal',
  fontSize: '16px',
  fontWeight: 'bolder',
  paddingLeft: '2px',
  paddingRight: '2px'
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    border: '1.3px solid #ccc',
    fontSize: 14,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      'Hind'
    ].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#b196e4',
    },
  },
}));

const SignInQuestionnaire = () => {
  // console.log(jwtDecode(localStorage.getItem("currentUser")).user_id)
  const history = useHistory();

  const [redirect, setRedirect] = useState(null);
  const [mood, setMood] = useState("");
  const [selectedRecommOption, setSelectedRecommOption] = useState("Movies"); // Initial selected option
  const [selectedChipGroup, setSelectedChipGroup] = useState(null); // State to store the selected chip
  // const [selectedChipTime, setSelectedChipTime] = useState(null); // State to store the selected chip
  const [selectedChipTimeDisplay, setSelectedChipTimeDisplay] = useState(null); // State to store the selected chip time for display
  const [selectedChipTimeSend, setSelectedChipTimeSend] = useState(null); // State to store the formatted selected chip time for sending to API
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
  };

  const moodChangeHandler = (event) => {
    setMood(event.target.value);
  };

  const handleExploreRecommendations = async () => {

    try {
      // Map mood to lowercase string based on selection
      const moodString = selectedMood.toLowerCase();

      // Map chipTime to 'latest', 'mid', or 'old' based on selection
      let chipTimeMapping = '';
      if (selectedChipTimeDisplay === 'New Releases (> 2022)') {
        chipTimeMapping = 'latest';
      } else if (selectedChipTimeDisplay === 'Recent Releases (2010-2021)') {
        chipTimeMapping = 'mid';
      } else if (selectedChipTimeDisplay === 'Classics (< 2010)') {
        chipTimeMapping = 'old';
      }

      // Make POST request to backend API with mapped values
      const response = await axios({
        url: `${url}/questionnaire/submit_signin_ques`,
        method: 'post',
        data: {
          user_id: jwtDecode(localStorage.getItem("currentUser")).user_id,
          mood: moodString,
          recommOption: selectedRecommOption,
          chipGroup: selectedChipGroup,
          chipTime: chipTimeMapping
        }
      });

      // Log the response data
      console.log(response.data);

      // Navigate to dashboard route with selected option parameter
      history.push(`/dashboard?selectedOption=${selectedRecommOption}`);
    } catch (error) {
      // Handle error
      console.error('Error posting data to API:', error);
    }

  };

  const handleOptionChange = (option) => {
    setSelectedRecommOption(option);
  };

  const handleChipClick = (chip) => {
    setSelectedChipGroup(chip);
  };

  const handleTimeChipClick = (chip) => {
    // setSelectedChipTime(chip);
    let formattedChip = chip.toLowerCase().replace(/\s/g, '_'); // Convert to lowercase and replace spaces with underscore
    setSelectedChipTimeDisplay(chip); // Set the selected chip time for display
    setSelectedChipTimeSend(formattedChip); // Set the formatted selected chip time for sending to API
  };

  

  const getIcon = (mood) => {
    if (selectedMood === mood) {
      return mood === 'happy' ? happyPurpleIcon : mood === 'sad' ? sadPurpleIcon : neutralPurpleIcon;
    } else {
      return mood === 'happy' ? happyWhiteIcon : mood === 'sad' ? sadWhiteIcon : neutralWhiteIcon;
    }
  };

  return (
    <div className='signin-questions-page' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      {/* <Navbar/> */}
      {redirect && <Redirect to={redirect} />}
      <MDBContainer className='signup-form-left'>
        <MDBRow>
          <MDBCol col='6' className=''>
            <div className="signin-ques-page" style={{paddingLeft: '40px', zIndex: '5'}}>
              <h1 className='bookheading text-center' style={{ fontWeight: 'bold' }}>
                Discover Your Perfect Picks!
              </h1>
              <div className='regular-text text-center'>
                Welcome! Let's fine-tune your entertainment choices.
              </div>
              <div className='regular-text text-center'>
                Share your current mood and interests, and we'll do the rest.
              </div>
              <br></br>
              <div className='signin-ques-form'>
                <div className='questionnaire-labels' style={{ paddingBottom: '5px' }}>
                  How are you feeling today?
                </div>
                <div style={{ display: 'flex', gap: '20px', paddingTop:'8px' }}>
                <div style={{ textAlign: 'center', marginRight: '10px'  }}>
                    <img
                      src={getIcon('happy')}
                      alt="Happy"
                      style={{ cursor: 'pointer', width: '65px', height: '65px' }}
                      onClick={() => handleMoodChange('happy')}
                    />
                    <div style={{fontFamily: 'Hind', color: 'white', paddingTop:'5px', fontSize: '13px'}}>Happy</div>
                  </div>
                  <div style={{ textAlign: 'center', marginRight: '10px'   }}>
                    <img
                      src={getIcon('sad')}
                      alt="Sad"
                      style={{ cursor: 'pointer', width: '65px', height: '65px'}}
                      onClick={() => handleMoodChange('sad')}
                    />
                    <div style={{fontFamily: 'Hind', color: 'white', paddingTop:'5px', fontSize: '13px'}}>Sad</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={getIcon('neutral')}
                      alt="Neutral"
                      style={{ cursor: 'pointer', width: '65px', height: '65px' }}
                      onClick={() => handleMoodChange('neutral')}
                    />
                    <div style={{fontFamily: 'Hind', color: 'white', paddingTop:'5px', fontSize: '13px'}}>Neutral</div>
                  </div>
                </div>

                <br style={{ paddingBottom: '7px' }}></br>


                <div className='questionnaire-labels' style={{ paddingBottom: '5px' }}>
                  What are you in the mood for?
                </div>
                <div style={{display:'flex',paddingTop: '5px', zIndex: '6'}}>
                  <SegmentedControl sx={{borderRadius: "10px", border: '2px solid white', width: '510px', backgroundColor: '', height: '42px', fontSize: '15px'}} aria-label="File view">
                    <SegmentedControl.Button
                      sx={{
                        backgroundColor: selectedRecommOption === 'Movies' ? '#b196e4' : '#3a3a3b',
                        color: selectedRecommOption === 'Movies' ? 'white' : '#ccc',
                        fontWeight: selectedRecommOption === 'Movies' ? 'bold' : 'normal',
                        border: selectedRecommOption === 'Movies' ? '0px solid #A388C5' : 'none',
                        borderRadius: "10px 0 0 10px",
                        width: '250px',
                        height: '40px',
                        marginRight: '5px',
                      }}
                      defaultSelected={selectedRecommOption === 'Movies'}
                      onClick={() => handleOptionChange('Movies')}
                    >
                      Movies
                    </SegmentedControl.Button>
                    <SegmentedControl.Button
                      sx={{
                        backgroundColor: selectedRecommOption === 'Music' ? '#b196e4' : '#3a3a3b',
                        color: selectedRecommOption === 'Music' ? 'white' : '#ccc',
                        fontWeight: selectedRecommOption === 'Music' ? 'bold' : 'normal',
                        border: selectedRecommOption === 'Music' ? '0px solid #A388C5' : 'none',
                        borderRadius: "0 10px 10px 0",
                        width: '250px',
                        height: '40px'
                      }}
                      defaultSelected={selectedRecommOption === 'Music'}
                      onClick={() => handleOptionChange('Music')}
                    >
                      Music
                    </SegmentedControl.Button>
                  </SegmentedControl>
                </div>

                <br style={{paddingBottom:'7px'}}></br>

                <div className='questionnaire-labels' style={{ paddingBottom: '8px' }}>
                  Who are you with?
                </div> 
                <div style={{ display: 'flex', fontFamily: 'Hind'}}>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      onClick={() => handleChipClick('Alone')}
                      style={{  
                        backgroundColor: selectedChipGroup === 'Alone' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipGroup === 'Alone' ? 'bold' : 'normal'
                      }} 
                      label="Alone" 
                      // variant="outlined"
                    />
                    <Chip 
                      onClick={() => handleChipClick('With Friends')} 
                      style={{ 
                        backgroundColor: selectedChipGroup === 'With Friends' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipGroup === 'With Friends' ? 'bold' : 'normal'
                      }} 
                      label="With Friends" 
                      // variant="outlined" 
                    />
                    <Chip 
                      onClick={() => handleChipClick('With Family')}
                      style={{ 
                        backgroundColor: selectedChipGroup === 'With Family' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipGroup === 'With Family' ? 'bold' : 'normal'
                      }} 
                      label="With Family" 
                      // variant="outlined"
                    />
                    <Chip 
                      onClick={() => handleChipClick('With A Partner')}
                      style={{
                        backgroundColor: selectedChipGroup === 'With A Partner' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipGroup === 'With A Partner' ? 'bold' : 'normal'
                      }}
                      label="With A Partner" 
                      // variant="outlined" 
                    />
                  </Stack>
                </div>

                <br style={{paddingBottom:'7px'}}></br>

                <div className='questionnaire-labels' style={{ paddingBottom: '8px', zIndex: 2 }}>
                  Are you in the mood for a new release or a classic?
                </div>
                <div style={{ display: 'flex', fontFamily: 'Hind', zIndex: 2}}>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      onClick={() => handleTimeChipClick('Classics (< 2010)')}
                      style={{  
                        backgroundColor: selectedChipTimeDisplay === 'Classics (< 2010)' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipTimeDisplay === 'Classics (< 2010)' ? 'bold' : 'normal'
                      }} 
                      label="Classics (< 2010)" 
                      // variant="outlined"
                      />
                    <Chip 
                      onClick={() => handleTimeChipClick('Recent Releases (2010-2021)')}
                      style={{ 
                        backgroundColor: selectedChipTimeDisplay === 'Recent Releases (2010-2021)' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipTimeDisplay === 'Recent Releases (2010-2021)' ? 'bold' : 'normal'
                      }} 
                      label="Recent Releases (2010-2021)" 
                      // variant="outlined"
                    />
                    <Chip 
                      onClick={() => handleTimeChipClick('New Releases (> 2022)')} 
                      style={{ 
                        backgroundColor: selectedChipTimeDisplay === 'New Releases (> 2022)' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipTimeDisplay === 'New Releases (> 2022)' ? 'bold' : 'normal'
                      }} 
                      label="New Releases (> 2022)" 
                      // variant="outlined" 
                    />
                    
                  </Stack>
                </div>
                  
                <br></br>
                <br></br>

                <div style={{display: 'flex', justifyContent: 'end', zIndex: 2}}>
                  <ColorButton variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleExploreRecommendations}>
                    Reveal Picks 
                  </ColorButton>
                </div>

              </div>
              <div></div>
            </div>
          </MDBCol>
        </MDBRow>

        {/* Absolute positioned images */}
        {/* <div style={{ position: 'absolute', bottom: 0, left: 20 }}>
            <img src={horrorImg} alt="Right Side Image" style={{ width: '20%', height: 'auto' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 15, right: 25 }}>
        <img src={happyImg} alt="Left Side Image" style={{ width: 'auto', height: '375px' }} />
        </div> */}
        </MDBContainer>
        
        {selectedRecommOption === 'Movies' && (
          <div style={{ position: 'absolute', bottom: 10, left: 20, zIndex: 0, width: '20%' }}>
            <img src={horrorImg} alt="Right Side Image" style={{ width: '100%', height: 'auto', zIndex: 0 }} />
          </div>
        )}
        {selectedRecommOption === 'Music' && (
          <div style={{ position: 'absolute', bottom: 0, left: '78vw', zIndex: 0 }}>
            <img src={musicImg} alt="Left Side Image" style={{ width: '102%', height: 'auto', zIndex: 0  }} />
          </div>
        )}

      
    </div>
  );
}

export default SignInQuestionnaire;


