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

import music1 from '../../images/Music-rafiki.png'
import music2 from '../../images/Headphone-rafiki.png'


class MusicRecommendation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // redirect: '/music',
    };
  }

  render() {
    // let redirectVar = null;
    // if (this.state.redirect) {
    //   redirectVar = <Redirect to={this.state.redirect} />;
    // }
    return (
      <div>
      <MDBContainer className='recommendation-container'>
        {/* {redirectVar} */}
        <MDBRow>
          <br></br>

          <MDBCol col='6' className='recommendation-form'>
            {/* <form className='Auth-form'> */}
            {/* <div className='Auth-form-content'> */}
            <div className='text-center'>
              {/* <img src={logo} style={{ width: '185px' }} alt='logo' /> */}
              <h1 className='movie-recommend-heading'>Get your headphones ready! Explore our curated music recommendations tailored just for you.</h1>
            </div>
            <MDBRow>
              <div
                style={{
                  paddingTop: '25px',
                  textAlign: 'center',
                  width: '50vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3?utm_source=oembed'
                  style={{ width: '80%', height: '85px' }} // Setting width to 100% of the parent div, and height directly
                  frameBorder='0'
                  allowFullScreen=''
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                  loading='lazy'
                  marginheight='0'
                  marginwidth='0'
                  hspace='0'
                  vspace='0'
                ></iframe>
              </div>
            </MDBRow>
            <MDBRow>
              <div
                style={{
                  paddingTop: '15px',
                  textAlign: 'center',
                  width: '50vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/5mjYQaktjmjcMKcUIcqz4s?utm_source=oembed'
                  style={{ width: '80%', height: '85px' }} // Setting width to 100% of the parent div, and height directly
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
                  paddingTop: '15px',
                  textAlign: 'center',
                  width: '50vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/5aIVCx5tnk0ntmdiinnYvw?utm_source=oembed'
                  style={{ width: '80%', height: '85px' }} // Setting width to 100% of the parent div, and height directly
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
                  paddingTop: '15px',
                  textAlign: 'center',
                  width: '50vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/0LMwmV37RCmBO2so0szAFs?utm_source=oembed'
                  style={{ width: '80%', height: '85px' }} // Setting width to 100% of the parent div, and height directly
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
                  paddingTop: '15px',
                  textAlign: 'center',
                  width: '50vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/3Pbp7cUCx4d3OAkZSCoNvn?utm_source=oembed'
                  style={{ width: '80%', height: '85px' }} // Setting width to 100% of the parent div, and height directly
                  frameBorder='0'
                  allowFullScreen=''
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                  loading='lazy'
                ></iframe>
              </div>
            </MDBRow>
            {/* <MDBRow>
              <div
                style={{
                  paddingTop: '15px',
                  textAlign: 'center',
                  width: '50vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/22dUzMFttcR3uU17NcOAIv?utm_source=oembed'
                  style={{  width: '80%', height: '85px'}} // Setting width to 100% of the parent div, and height directly
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
                  paddingTop: '15px',
                  textAlign: 'center',
                  width: '50vw',
                  margin: 'auto',
                }}
              >
                <iframe
                  src='https://open.spotify.com/embed/track/48vIfHaK7by6x0T6ucpODL?utm_source=oembed'
                  style={{ width: '80%', height: '85px'}} // Setting width to 100% of the parent div, and height directly
                  frameBorder='0'
                  allowFullScreen=''
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                  loading='lazy'
                ></iframe>
              </div>
            </MDBRow> */}
            <br></br>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
        {/* Absolute positioned images */}
        <div style={{ position: 'absolute', bottom: 10, left: 20, zIndex: '0' }}>
            <img src={music1} alt="Left Side Image" style={{ width: '20%', height: 'auto' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 15, right: 25, zIndex: '0'  }}>
        <img src={music2} alt="Right Side Image" style={{ width: 'auto', height: '300px' }} />
        </div>

      </div>
    );
  }
}

export default MusicRecommendation;
