/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable */
import React, { PureComponent } from 'react';
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

class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      useremail: '',
      // usercontact: '',
      // userweight: '',
      // userheight: '',
      password: '',
      confirmPassword: '',
      dob: '', // Add this line for the DOB
      //redirect: "/"
    };
  }

  // username change handler to update state variable with the text entered by the user
  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  // email change handler to update state variable with the text entered by the user
  emailChangehandler = (e) => {
    this.setState({
      useremail: e.target.value,
    });
  };

  // contact change handler to update state variable with the text entered by the user
  // contactChangehandler = (e) => {
  //   this.setState({
  //     usercontact: e.target.value,
  //   });
  // };

  // weight change handler to update state variable with the text entered by the user
  // weightChangehandler = (e) => {
  //   this.setState({
  //     userweight: e.target.value,
  //   });
  // };

  // height change handler to update state variable with the text entered by the user
  // heightChangehandler = (e) => {
  //   this.setState({
  //     userheight: e.target.value,
  //   });
  // };

  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  confirmPasswordChangeHandler = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };
  dobChangeHandler = (e) => {
    this.setState({
      dob: e.target.value,
    });
  };

  registerUser = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert('Passwords do not match.');
      return; // Prevent the form from being submitted
    }
    const data = {
      name: this.state.username,
      email: this.state.useremail,
      // contact: this.state.usercontact,
      // weight: this.state.userweight,
      // height: this.state.userheight,
      password: this.state.password,
      dob: this.state.dob,
    };
    axios({
      url: `${url}/user/signup`,
      method: 'post',
      data: data,
    })
      .then(async (response) => {
        await localStorage.setItem(
          'currentUser',
          JSON.stringify(response.data.jwt)
        );
        //setting admin value 1: is admin, 0: not an admin
        //await localStorage.setItem('admin', jwtDecode(JSON.stringify(response.data.jwt)).isadmin);
        //getting admin value from local storage and printing it!
        //console.log("-----",localStorage.getItem('admin'));
        //var isadmin = localStorage.getItem('admin');
        if (response.status === 200) {
          await this.setState({
            redirect: '/userdashboard',
          });
        }
      })
      .catch(function(error) {
        alert(error);
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to={this.state.redirect} />;
    }
    return (
      <div className='signup-page'>
        {redirectVar}
        <MDBContainer className='my-5 signup-form-left'>
          <MDBRow>
            <MDBCol col='6' className='mb-5'>
              {/* <div className='d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4'> */}
                <div className='text-white px-3 py-4 p-md-5'>
                  {/* <h4 className='mb-4'>
                    Need to track your gym activities? We got it all covered!{' '}
                  </h4>
                  <p className='small mb-0'>
                    Register with us to start your fitness journey!!
                  </p> */}
                  <img src={pic} style={{ width: '485px', paddingRight: '20px' }} alt='logo' />
                </div>
              {/* </div> */}
            </MDBCol>

            <MDBCol col='6' className='mb-5' style={{ paddingRight: "20px"}}>
              <div className='d-flex flex-column ms-5'>
                <div className='text-center'>
                  {/* <img src={logo} style={{ width: '185px' }} alt='logo' /> */}
                  <h1 className='bookheading'>
                    {/* Sign up to begin, because your mood deserves an upgrade! */}
                    Sign up and give your mood the upgrade it deserves!
                  </h1>
                </div>
                <br></br>

                <label htmlFor='username' className='signup-labels'>Full Name</label>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='username'
                    placeholder='Enter your full name'
                    color='#F7F7FF'
                    style={{ backgroundColor: '#3A3A3B', color: '#F7F7FF', border: '0.5px solid #767676', borderRadius: '5px' }}
                    onChange={this.usernameChangeHandler}
                  />
                </div>

                <label htmlFor='useremail' className='signup-labels'>Email</label>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    name='useremail'
                    placeholder='Enter your email address'
                    color='#F7F7FF'
                    onChange={this.emailChangehandler}
                    style={{ backgroundColor: '#3A3A3B', color: '#F7F7FF', border: '0.5px solid #767676', borderRadius: '5px' }}
                  />
                </div>
                {/* <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='usercontact'
                    placeholder='contact no'
                    onChange={this.contactChangehandler}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='userweight'
                    placeholder='weight in lbs'
                    onChange={this.weightChangehandler}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='userheight'
                    placeholder='height in cms'
                    onChange={this.heightChangehandler}
                  />
                </div> */}

                <label htmlFor='password' className='signup-labels'>Password</label>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    placeholder='Create a strong password'
                    color='#F7F7FF'
                    onChange={this.passwordChangeHandler}
                    style={{ backgroundColor: '#3A3A3B', color: '#F7F7FF', border: '0.5px solid #767676', borderRadius: '5px' }}
                  />
                </div>

                <label htmlFor='confirmPassword' className='signup-labels'>Confirm Password</label>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    name='confirmPassword'
                    placeholder='Confirm your password'
                    onChange={this.confirmPasswordChangeHandler}
                    color='#F7F7FF'
                    style={{ backgroundColor: '#3A3A3B', color: '#F7F7FF', border: '0.5px solid #767676', borderRadius: '5px' }}
                  />
                </div>

                <label htmlFor='dob' className='signup-labels'>Date of Birth</label>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control'
                    name='dob'
                    placeholder='Date of Birth'
                    onChange={this.dobChangeHandler}
                    style={{ backgroundColor: '#3A3A3B', color: '#F7F7FF', border: '0.5px solid #767676', borderRadius: '5px' }}
                  />
                </div>
                <div className='text-center pt-1 mb-5 pb-1'>
                  <Button onClick={this.registerUser} style={{ backgroundColor: '#A388C5', color: '#F7F7FF', borderRadius: '5px' }}>
                    Sign Me Up!
                  </Button>
                </div>

                <div className='d-flex flex-row align-items-center justify-content-center pb-4 mb-4'>
                  <p className='large fw-bold mt-2 pt-1 mb-2'>
                    Already have an account?{' '}
                    <a href='/login' className='link-danger'>
                      <b>Sign In!</b>
                    </a>
                  </p>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
// Export The  Component
export default Signup;
