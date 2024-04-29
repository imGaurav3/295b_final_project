/* eslint-disable */
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import jwtDecode from "jwt-decode";
// import Button from 'react-bootstrap/Button';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

import music1 from '../../images/Music-rafiki.png'
import music2 from '../../images/Headphone-rafiki.png'


class MusicRecommendation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      musicUrls: [],
    };
  }

  componentDidMount() {
    this.fetchMusicUrls();
  }

  fetchMusicUrls = () => {

    const currentUser = localStorage.getItem("currentUser");
    const user_id = currentUser ? jwtDecode(currentUser).user_id : 'default_user_id';

    // Assuming your API returns a JSON object with an array of URLs
    fetch(`http://127.0.0.1:5000/predict?userid=${user_id}`)
      .then(response => response.json())
      .then(data => {
        // Assuming 'data' is the array of URLs. Adjust the path according to your API response structure
        this.setState({ musicUrls: data });
      })
      .catch(error => {
        console.error('Error fetching music URLs:', error);
      });
  }

  render() {
    // Your existing render method
    return (
      <div>
        <MDBContainer className='recommendation-container'>
          <MDBRow>
            {/* Your existing JSX */}
            <MDBRow style={{ paddingTop: '10px'}}>
              {this.state.musicUrls.map((url, index) => (
                <div
                  key={index}
                  style={{
                    paddingTop: '15px',
                    textAlign: 'center',
                    width: '50vw',
                    margin: 'auto',
                  }}
                >
                  <iframe
                    src={url}
                    style={{ width: '80%', height: '85px' }}
                    frameBorder='0'
                    allowFullScreen=''
                    allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                    loading='lazy'
                  ></iframe>
                </div>
              ))}
            </MDBRow>
          </MDBRow>
        </MDBContainer>
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