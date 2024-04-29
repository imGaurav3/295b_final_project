/* eslint-disable */
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
// import Button from 'react-bootstrap/Button';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import axios from 'axios'; // Import axios for making HTTP requests

// import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import movie1 from '../../images/Film-rolls-amico.png';
import movie2 from '../../images/3D-glasses-bro.png';

class MovieRecommendation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      movies: [], // Store fetched movie data here
      // redirect: '/movie',
    };
  }

  componentDidMount() {
    const movieUrls = [
      'https://api.themoviedb.org/3/movie/565770?api_key=de8a7853bbd000984d6455656338eb6d',
      'https://api.themoviedb.org/3/movie/980489?api_key=de8a7853bbd000984d6455656338eb6d',
      'https://api.themoviedb.org/3/movie/968051?api_key=de8a7853bbd000984d6455656338eb6d',
      'https://api.themoviedb.org/3/movie/615656?api_key=de8a7853bbd000984d6455656338eb6d',
      'https://api.themoviedb.org/3/movie/1008042?api_key=de8a7853bbd000984d6455656338eb6d',
      'https://api.themoviedb.org/3/movie/762430?api_key=de8a7853bbd000984d6455656338eb6d',
      // 'https://api.themoviedb.org/3/movie/678512?api_key=de8a7853bbd000984d6455656338eb6d',
      // 'https://api.themoviedb.org/3/movie/385687?api_key=de8a7853bbd000984d6455656338eb6d',
      // 'https://api.themoviedb.org/3/movie/951491?api_key=de8a7853bbd000984d6455656338eb6d',
      // 'https://api.themoviedb.org/3/movie/1172009?api_key=de8a7853bbd000984d6455656338eb6d',
    ];

    // Fetch movie data for each URL
    Promise.all(movieUrls.map((url) => axios.get(url)))
      .then((responses) => {
        // Extract movie data from each response
        const movies = responses.map((response) => {
          const {
            original_title,
            release_date,
            runtime,
            genres,
            poster_path,
            overview,
            tagline,
          } = response.data;
          const imageUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
          return {
            original_title,
            release_date,
            runtime,
            genres,
            overview,
            tagline,
            imageUrl,
          };
        });

        // Update the state with all the fetched movie data
        this.setState({ movies });
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }

  render() {
    // let redirectVar = null;
    // if (this.state.redirect) {
    //   redirectVar = <Redirect to={this.state.redirect} />;
    // }

    const { movies } = this.state;

    return (
      <div
        className='recommendation-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {movies.map((movie, index) => (
          <Card
            key={index}
            style={{
              width: '800px',
              height: 'auto',
              margin: '10px',
              display: 'flex',
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            <CardMedia
              component='img'
              image={movie.imageUrl}
              alt='Movie Poster'
              style={{ width: '200px', objectFit: 'cover' }}
            />
            <CardContent style={{ flex: 1, color: 'white' }}>
              <Typography gutterBottom variant='h5' component='div'>
                {movie.original_title}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                style={{ color: 'white' }}
              >
                Release Date: {movie.release_date}
                <br />
                Runtime: {movie.runtime} min
                <br />
                Genres: {movie.genres.map((genre) => genre.name).join(', ')}
                <br />
                <br />
                <b>{movie.tagline}</b>
                <br />
                <br />
                {movie.overview}
                <br />
              </Typography>
            </CardContent>
          </Card>
        ))}
        <div style={{ position: 'fixed', bottom: 10, left: 20 }}>
          <img
            src={movie1}
            alt='Left Side Image'
            style={{ width: '15%', height: 'auto' }}
          />
        </div>
        <div style={{ position: 'fixed', bottom: 15, left: '82vw' }}>
          <img
            src={movie2}
            alt='Right Side Image'
            style={{ width: '90%', height: 'auto' }}
          />
        </div>
      </div>
    );
  }
}

export default MovieRecommendation;
