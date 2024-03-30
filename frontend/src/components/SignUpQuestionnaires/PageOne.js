import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import popcornImg from '../../images/Popcorns-bro.png'
import movieImg from '../../images/Home_cinema_amico.png'
import Navbar from "../Common/Navbar";


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

      <MDBContainer className='signup-form-left' display="flex" style={{paddingTop: '20px'}}>

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
                <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '25px', fontSize: '17px', fontWeight: 'bolder' }}>
                  What is your favorite movie genre overall?
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '7px' }}>
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
                    <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '22px', fontSize: '17px', fontWeight: 'bolder' }}>
                    What movie genres do you prefer when you’re feeling Happy?
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '7px' }}>
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
                    <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '22px', fontSize: '17px', fontWeight: 'bolder' }}>
                    What movie genres do you prefer when you’re feeling Sad?
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '7px' }}>
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
                    <div className='questionnaire-labels' style={{ paddingBottom: '2px', paddingTop: '22px', fontSize: '17px', fontWeight: 'bolder' }}>
                    What movie genres do you prefer when you’re feeling Neutral?
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '7px' }}>
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


              </div>
            </div>
            </MDBCol>
            
        </MDBRow>

        {/* Absolute positioned images */}
        <div style={{ position: 'absolute', bottom: 10, left: 20 }}>
            <img src={movieImg} alt="Right Side Image" style={{ width: '20%', height: 'auto' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 15, right: 25 }}>
        <img src={popcornImg} alt="Left Side Image" style={{ width: 'auto', height: '300px' }} />
        </div>
      </MDBContainer>
    </div>
  );
}

export default PageOne;


