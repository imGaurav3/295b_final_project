import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
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

import happyWhiteIcon from '../../images/happiness_white.png';
import happyPurpleIcon from '../../images/happiness_purple.png';
import sadWhiteIcon from '../../images/sad_white.png';
import sadPurpleIcon from '../../images/sad_purple.png';
import neutralWhiteIcon from '../../images/neutral_white.png';
import neutralPurpleIcon from '../../images/neutral_purple.png';

import horrorImg from '../../images/Horror-movie-bro.png';
import musicImg from '../../images/Music-bro.png';

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
  const [redirect, setRedirect] = useState(null);
  const [mood, setMood] = useState("");
  const [selectedOption, setSelectedOption] = useState("Movies"); // Initial selected option
  const [selectedChip, setSelectedChip] = useState(null); // State to store the selected chip
  const [selectedChipTime, setSelectedChipTime] = useState(null); // State to store the selected chip
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
  };

  const moodChangeHandler = (event) => {
    setMood(event.target.value);
  };



  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
  };

  const handleTimeChipClick = (chip) => {
    setSelectedChipTime(chip);
  };

  const getIcon = (mood) => {
    if (selectedMood === mood) {
      return mood === 'happy' ? happyPurpleIcon : mood === 'sad' ? sadPurpleIcon : neutralPurpleIcon;
    } else {
      return mood === 'happy' ? happyWhiteIcon : mood === 'sad' ? sadWhiteIcon : neutralWhiteIcon;
    }
  };

  return (
    <div className='signin-questions-page'>
      {redirect && <Redirect to={redirect} />}
      <MDBContainer className='signup-form-left'>
        <MDBRow>
          <MDBCol col='6' className='mb-5'>
            <div className="signin-ques-page" style={{paddingLeft: '40px'}}>
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
                {/* <Box sx={{ minWidth: 80 }} style={{ color: '#3A3A3B'}}>
                  <FormControl fullWidth variant="standard" style={{ color: '#3A3A3B'}}>
                    <InputLabel id="demo-simple-select-label" style={{ color: '#ccc', paddingLeft: '14px', fontSize: '14px' }}>Mood</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mood}
                      label="Mood"
                      onChange={moodChangeHandler}
                      input={<BootstrapInput />}
                      // style={{border: '1.3px solid #ccc', borderRadius: '10px', '&:focus': {
                      //   borderColor: '#b196e4',
                      // }, }}
                      MenuProps={{
                        sx: '#3a3a3b',
                      }}
                    >
                      <MenuList sx={{ backgroundColor: '#3A3A3B', fontFamily: 'Hind'}}>
                        <MenuItem value="Happy" style={{ backgroundColor: '#3A3A3B', color: '#ccc' }}>Happy</MenuItem>
                        <MenuItem value="Sad" style={{ backgroundColor: '#3A3A3B', color: '#ccc' }}>Sad</MenuItem>
                        <MenuItem value="Neutral" style={{ backgroundColor: '#3A3A3B', color: '#ccc' }}>Neutral</MenuItem>
                      </MenuList>
                    </Select>
                  </FormControl>
                </Box> */}
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
                <div style={{display:'flex',paddingTop: '5px'}}>
                  <SegmentedControl sx={{borderRadius: "10px", border: '2px solid white', width: '510px', backgroundColor: '', height: '42px', fontSize: '15px'}} aria-label="File view">
                    <SegmentedControl.Button
                      sx={{
                        backgroundColor: selectedOption === 'Movies' ? '#b196e4' : '#3a3a3b',
                        color: selectedOption === 'Movies' ? 'white' : '#ccc',
                        fontWeight: selectedOption === 'Movies' ? 'bold' : 'normal',
                        border: selectedOption === 'Movies' ? '0px solid #A388C5' : 'none',
                        borderRadius: "10px 0 0 10px",
                        width: '250px',
                        height: '40px',
                        marginRight: '5px',
                      }}
                      defaultSelected={selectedOption === 'Movies'}
                      onClick={() => handleOptionChange('Movies')}
                    >
                      Movies
                    </SegmentedControl.Button>
                    <SegmentedControl.Button
                      sx={{
                        backgroundColor: selectedOption === 'Music' ? '#b196e4' : '#3a3a3b',
                        color: selectedOption === 'Music' ? 'white' : '#ccc',
                        fontWeight: selectedOption === 'Music' ? 'bold' : 'normal',
                        border: selectedOption === 'Music' ? '0px solid #A388C5' : 'none',
                        borderRadius: "0 10px 10px 0",
                        width: '250px',
                        height: '40px'
                      }}
                      defaultSelected={selectedOption === 'Music'}
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
                        backgroundColor: selectedChip === 'Alone' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChip === 'Alone' ? 'bold' : 'normal'
                      }} 
                      label="Alone" 
                      // variant="outlined"
                    />
                    <Chip 
                      onClick={() => handleChipClick('With Friends')} 
                      style={{ 
                        backgroundColor: selectedChip === 'With Friends' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChip === 'With Friends' ? 'bold' : 'normal'
                      }} 
                      label="With Friends" 
                      // variant="outlined" 
                    />
                    <Chip 
                      onClick={() => handleChipClick('With Family')}
                      style={{ 
                        backgroundColor: selectedChip === 'With Family' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChip === 'With Family' ? 'bold' : 'normal'
                      }} 
                      label="With Family" 
                      // variant="outlined"
                    />
                    <Chip 
                      onClick={() => handleChipClick('With A Partner')}
                      style={{
                        backgroundColor: selectedChip === 'With A Partner' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChip === 'With A Partner' ? 'bold' : 'normal'
                      }}
                      label="With A Partner" 
                      // variant="outlined" 
                    />
                  </Stack>
                </div>

                <br style={{paddingBottom:'7px'}}></br>

                <div className='questionnaire-labels' style={{ paddingBottom: '8px' }}>
                  Are you in the mood for a new release or a classic?
                </div>
                <div style={{ display: 'flex', fontFamily: 'Hind'}}>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      onClick={() => handleTimeChipClick('Classics (< 1990)')}
                      style={{  
                        backgroundColor: selectedChipTime === 'Classics (< 1990)' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipTime === 'Classics (< 1990)' ? 'bold' : 'normal'
                      }} 
                      label="Classics (< 1990)" 
                      // variant="outlined"
                      />
                    <Chip 
                      onClick={() => handleTimeChipClick('New Releases (> 1990)')} 
                      style={{ 
                        backgroundColor: selectedChipTime === 'New Releases (> 1990)' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipTime === 'New Releases (> 1990)' ? 'bold' : 'normal'
                      }} 
                      label="New Releases (> 1990)" 
                      // variant="outlined" 
                    />
                    <Chip 
                      onClick={() => handleTimeChipClick('Anything works!')}
                      style={{ 
                        backgroundColor: selectedChipTime === 'Anything works!' ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedChipTime === 'Anything works!' ? 'bold' : 'normal'
                      }} 
                      label="Anything works!" 
                      // variant="outlined"
                    />
                  </Stack>
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

        {selectedOption === 'Movies' && (
          <div style={{ position: 'absolute', bottom: 10, left: 20 }}>
            <img src={horrorImg} alt="Right Side Image" style={{ width: '20%', height: 'auto' }} />
          </div>
        )}
        {selectedOption === 'Music' && (
          <div style={{ position: 'absolute', bottom: 0, right: 25 }}>
            <img src={musicImg} alt="Left Side Image" style={{ width: 'auto', height: '375px' }} />
          </div>
        )}

      </MDBContainer>
    </div>
  );
}

export default SignInQuestionnaire;


