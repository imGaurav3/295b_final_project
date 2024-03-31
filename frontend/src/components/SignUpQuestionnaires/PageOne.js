import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import popcornImg from '../../images/Popcorns-bro.png'
import movieImg from '../../images/Home_cinema_amico.png'
import Navbar from "../NavBar/Navbar";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';


const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#b196e4',
  '&:hover': {
    backgroundColor: '#8268b3',
    cursor: 'click',
  },
  borderRadius: '10px',
  width: '45%',
  textTransform: 'none',
  fontFamily: 'Hind',
  letterSpacing: 'normal',
  fontSize: '16px',
  fontWeight: 'bolder',
  paddingLeft: '2px',
  paddingRight: '2px'
}));

const PageOne = () => {
 
    const [selectedOverallChips, setSelectedOverallChips] = useState([]); // State for overall favorite genre
    const [selectedHappyChips, setSelectedHappyChips] = useState([]); // State for favorite genre when feeling happy
    const [selectedSadChips, setSelectedSadChips] = useState([]); // State for favorite genre when feeling sad
    const [selectedNeutralChips, setSelectedNeutralChips] = useState([]); // State for favorite genre when feeling neutral

    const handleChipClick = (chip, setSelectedChips, selectedChips) => {
        // Check if the chip is already selected
        const isChipSelected = selectedChips.includes(chip);
        // Check if the total selected chips are less than 3
        if (selectedChips.length < 3 || isChipSelected) {
          // Update the selected chips based on whether the chip is already selected or not
          if (isChipSelected) {
            setSelectedChips(selectedChips.filter((selectedChip) => selectedChip !== chip));
          } else {
            setSelectedChips([...selectedChips, chip]);
          }
        }
    };

// Array containing the options for chips
  const chipOptions = [
    'Drama',
    'Comedy',
    'Thriller',
    'Action',
    'Romance',
    'Adventure',
    'Crime',
    'Horror',
    'Family',
    'Science Fiction',
    'Fantasy',
    'Animation',
    'Mystery'
  ];

  return (
    <div className='signup-questions-page' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Navbar/>

      <MDBContainer className='signup-form-left' display="flex" style={{paddingTop: '20px', zIndex: '1'}}>

        <MDBRow>
           
            <MDBCol col='6' className='mb-5'>
            <div className="signin-ques-page" style={{ paddingLeft: '20px'}}>
              <h1 className='bookheading text-center' style={{ fontWeight: 'bold' }}>
                Let's get you set up!
              </h1>
             
              {/* <div className='regular-text text-center'>
                Share your interests to help us get to know you better.
              </div> */}
              <div className='signin-ques-form'>
                <div className='questionnaire-labels' style={{ paddingBottom: '2px', fontSize: '20px', fontWeight: 'bolder' }}>
                    Lights, camera, action! Share your favorites with us.
                </div>
                <div className='regular-text' style={{ paddingBottom: '5px' }}>
                    Select up to 3 genres that you like the most. We'll use this info to recommend movies you might like.
                </div>
                <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '15px', fontSize: '17px', fontWeight: 'bolder' }}>
                  What is your favorite movie genre overall?
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '7px' }}>
                  {chipOptions.map((option, index) => (
                    <Chip
                      key={index}
                      onClick={() => handleChipClick(option, setSelectedOverallChips, selectedOverallChips)}
                      style={{
                        backgroundColor: selectedOverallChips.includes(option) ? '#b196e4' : '#3a3a3b',
                        color: 'white',
                        fontWeight: selectedOverallChips.includes(option) ? 'bold' : 'normal',
                        cursor: 'pointer'
                      }}
                      label={option}
                    />
                  ))}
                </div>

                <br></br>

                <div>
                    <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '15px', fontSize: '17px', fontWeight: 'bolder' }}>
                    What movie genres do you prefer when you’re feeling Happy?
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '7px' }}>
                    {chipOptions.map((option, index) => (
                        <Chip
                        key={index}
                        onClick={() => handleChipClick(option, setSelectedHappyChips, selectedHappyChips)}
                        style={{
                            backgroundColor: selectedHappyChips.includes(option) ? '#b196e4' : '#3a3a3b',
                            color: 'white',
                            fontWeight: selectedHappyChips.includes(option) ? 'bold' : 'normal',
                            cursor: 'pointer'
                        }}
                        label={option}
                        />
                    ))}
                    </div>
                </div>

                <br></br>

                <div>
                    <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '15px', fontSize: '17px', fontWeight: 'bolder' }}>
                    What movie genres do you prefer when you’re feeling Sad?
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '7px' }}>
                    {chipOptions.map((option, index) => (
                        <Chip
                        key={index}
                        onClick={() => handleChipClick(option, setSelectedSadChips, selectedSadChips)}
                        style={{
                            backgroundColor: selectedSadChips.includes(option) ? '#b196e4' : '#3a3a3b',
                            color: 'white',
                            fontWeight: selectedSadChips.includes(option) ? 'bold' : 'normal',
                            cursor: 'pointer'
                        }}
                        label={option}
                        />
                    ))}
                    </div>
                </div>

                <br></br>

                <div>
                    <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '15px', fontSize: '17px', fontWeight: 'bolder' }}>
                    What movie genres do you prefer when you’re feeling Neutral?
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '7px' }}>
                    {chipOptions.map((option, index) => (
                        <Chip
                        key={index}
                        onClick={() => handleChipClick(option, setSelectedNeutralChips, selectedNeutralChips)}
                        style={{
                            backgroundColor: selectedNeutralChips.includes(option) ? '#b196e4' : '#3a3a3b',
                            color: 'white',
                            fontWeight: selectedNeutralChips.includes(option) ? 'bold' : 'normal',
                            cursor: 'pointer'
                        }}
                        label={option}
                        />
                    ))}
                    </div>
                </div>

                <br style={{paddingTop: '10px'}}></br>

                <div style={{display: 'flex', justifyContent: 'center', zIndex: 1}}>
                  <ColorButton variant="contained" endIcon={<ArrowForwardIcon />}>
                    Explore Recommendations! 
                  </ColorButton>
                </div>


              </div>
            </div>
            </MDBCol>
            
        </MDBRow>

      </MDBContainer>

        {/* Absolute positioned images */}
        <div style={{ position: 'absolute', bottom: 10, left: 20, zIndex: '0' }}>
            <img src={movieImg} alt="Left Side Image" style={{ width: '20%', height: 'auto' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 15, right: 25, zIndex: '0'  }}>
        <img src={popcornImg} alt="Right Side Image" style={{ width: 'auto', height: '300px' }} />
        </div>
    </div>
  );
}

export default PageOne;


