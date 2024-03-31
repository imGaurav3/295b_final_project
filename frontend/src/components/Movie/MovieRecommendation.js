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

import movie1 from '../../images/Film-rolls-amico.png'
import movie2 from '../../images/3D-glasses-bro.png'


class MovieRecommendation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // redirect: '/movie',
    };
  }

  render() {
    // let redirectVar = null;
    // if (this.state.redirect) {
    //   redirectVar = <Redirect to={this.state.redirect} />;
    // }
    return (
      // <div className='Auth-form-container login-page'>
      <div className='recommendation-container'>
        {/* {redirectVar} */}
        <MDBRow>
          <br></br>
          <br></br>
          <MDBCol col='6' className='recommendation-form'>
            {/* <form className='Auth-form'> */}
            {/* <div className='Auth-form-content'> */}
            <div className='text-center'>
              {/* <img src={logo} style={{ width: '185px' }} alt='logo' /> */}
              <h1 className='movie-recommend-heading'>
                Get your popcorn ready! Your customized movie lineup awaits — sit back, relax, and enjoy the show!
              </h1>
            </div>
            <br></br>
            <MDBRow style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </MDBRow>
            <MDBRow style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>

              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>

              <div style={{ padding: '15px' }}>
                <Card sx={{ width: 175 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image='https://picsum.photos/150'
                      alt='Image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Title
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Year • Runtime • Genre
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </MDBRow>
            <br></br>
          </MDBCol>
        </MDBRow>
        {/* <div style={{position: "relative"}}> */}
          <div style={{ position: 'absolute', bottom: 10, left: 20 }}>
              <img src={movie1} alt="Left Side Image" style={{ width: '15%', height: 'auto' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 15, left: '82vw' }}>
            <img src={movie2} alt="Right Side Image" style={{ width: '90%', height: 'auto' }} />
          </div>
        {/* </div> */}
        {/* <div className="image-container" style={{position: "relative"}}>
          <img src={movie1} alt="First Image" style={{ position: 'absolute', bottom: '10px', left: '20px', width: '100px', height: 'auto' }} />
          <img src={movie2} alt="Second Image" style={{ position: 'absolute', bottom: '15px', right: '25px', width: '100px', height: 'auto' }} />
        </div> */}
      </div>
    );
  }
}

export default MovieRecommendation;
