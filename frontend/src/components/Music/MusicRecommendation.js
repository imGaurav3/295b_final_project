/* eslint-disable */
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
// import Button from 'react-bootstrap/Button';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

// import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

class MusicRecommendation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: '/music',
    };
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to={this.state.redirect} />;
    }
    return (
      // <div className='Auth-form-container login-page'>
      <MDBContainer className='recommendation-container'>
        {redirectVar}
        <MDBRow>
          <br></br>

          <MDBCol col='6' className='mb-5 my-5 recommendation-form'>
            {/* <form className='Auth-form'> */}
            {/* <div className='Auth-form-content'> */}
            <div className='text-center'>
              {/* <img src={logo} style={{ width: '185px' }} alt='logo' /> */}
              <h1 className='bookheading'>Music Recommendation</h1>
            </div>
            <MDBRow>
              <div
                style={{
                  padding: '15px',
                  textAlign: 'center',
                  width: '60vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3?utm_source=oembed'
                  style={{ width: '100%', height: '25vh' }} // Setting width to 100% of the parent div, and height directly
                  frameBorder='0'
                  allowFullScreen=''
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                  loading='lazy'
                ></iframe>
              </div>
            </MDBRow>
            <MDBRow>
              <div
                style={{
                  padding: '15px',
                  textAlign: 'center',
                  width: '60vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3?utm_source=oembed'
                  style={{ width: '100%', height: '25vh' }} // Setting width to 100% of the parent div, and height directly
                  frameBorder='0'
                  allowFullScreen=''
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                  loading='lazy'
                ></iframe>
              </div>
            </MDBRow>

            <MDBRow>
              <div
                style={{
                  padding: '15px',
                  textAlign: 'center',
                  width: '60vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3?utm_source=oembed'
                  style={{ width: '100%', height: '25vh' }} // Setting width to 100% of the parent div, and height directly
                  frameBorder='0'
                  allowFullScreen=''
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                  loading='lazy'
                ></iframe>
              </div>
            </MDBRow>

            <br></br>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default MusicRecommendation;
