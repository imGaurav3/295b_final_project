import React, { PureComponent } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import movie1 from '../../images/Film-rolls-amico.png';
import movie2 from '../../images/3D-glasses-bro.png';
import url_flask from '../../utils/urlflaskconfig';
import jwtDecode from "jwt-decode";

class MovieRecommendation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    // First call to your API to get the movie URLs

    const currentUser = localStorage.getItem("currentUser");
    const user_id = currentUser ? jwtDecode(currentUser).user_id : 'default_user_id';

    axios.get(`${url_flask}/recommend/movie?userid=${user_id}`)
      .then(response => {
        // Assuming the response is an array of URLs
        const movieUrls = response.data;

        // Fetch movie data for each URL from TMDB API
        Promise.all(movieUrls.map(url => axios.get(url)))
          .then(responses => {
            const movies = responses.map(({ data }) => ({
              original_title: data.original_title,
              release_date: data.release_date,
              runtime: data.runtime,
              genres: data.genres,
              poster_path: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
              overview: data.overview,
              tagline: data.tagline,
            }));

            // Update the state with all the fetched movie data
            this.setState({ movies });
          })
          .catch(error => console.error('Error fetching detailed movie data:', error));
      })
      .catch(error => console.error('Error fetching movie URLs:', error));
  }

  render() {
    const { movies } = this.state;

    return (
      <div className='recommendation-container' style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        {movies.map((movie, index) => (
          <Card key={index} style={{
              width: '800px',
              height: 'auto',
              margin: '10px',
              display: 'flex',
              backgroundColor: 'black',
              color: 'white'
            }}>
            <CardMedia
              component='img'
              image={movie.poster_path}
              alt='Movie Poster'
              style={{ width: '200px', objectFit: 'cover' }}
            />
            <CardContent style={{ flex: 1, color: 'white' }}>
              <Typography gutterBottom variant='h5' component='div'>
                {movie.original_title}
              </Typography>
              <Typography variant='body2' color='text.secondary' style={{ color: 'white' }}>
                Release Date: {movie.release_date}<br />
                Runtime: {movie.runtime} min<br />
                Genres: {movie.genres.map(genre => genre.name).join(', ')}<br /><br />
                <b>{movie.tagline}</b><br /><br />
                {movie.overview}<br />
              </Typography>
            </CardContent>
          </Card>
        ))}
        <div style={{ position: 'fixed', bottom: 10, left: 20 }}>
          <img src={movie1} alt='Left Side Image' style={{ width: '15%', height: 'auto' }} />
        </div>
        <div style={{ position: 'fixed', bottom: 15, left: '82vw' }}>
          <img src={movie2} alt='Right Side Image' style={{ width: '90%', height: 'auto' }} />
        </div>
      </div>
    );
  }
}

export default MovieRecommendation;
