/* eslint-disable */
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import url from '../../utils/urlconfig';
import logo from '../../logo.jpg';
import jwtDecode from 'jwt-decode';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import pic from '../../images/signup-page-img.png';
import Navbar from '../NavBar/Navbar';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: '/login/',
    };
  }

  // email change handler to update state variable with the text entered by the user
  emailChangehandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  userlogin = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios({
      url: `${url}/login/`,
      method: 'post',
      data: data,
    })
      .then(async (response) => {
        await localStorage.setItem(
          'currentUser',
          JSON.stringify(response.data.jwt)
        );
        // await localStorage.setItem(
        //   "admin",
        //   jwtDecode(JSON.stringify(response.data.jwt)).isadmin
        // );
        //getting admin value from local storage and printing it!
        //console.log("-----", localStorage.getItem("admin"));
        //var isadmin = localStorage.getItem("admin");
        if (response.status === 200) {
          await this.setState({
            redirect: '/signinquestions',
          });
          // if (isadmin === "0") {

          // } else if (isadmin === "1") {
          //   await this.setState({
          //     redirect: "/admindashboard",
          //   });
          // }
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
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        {/* <Navbar /> */}
        <MDBContainer className='Auth-form-container login-page'>
          {redirectVar}
          <MDBRow>
            <br></br>
            <MDBCol col='6' className='mb-5 my-5 login-form-right'>
              <div className='text-white px-3 py-4 p-md-5'>
                <img
                  src={pic}
                  style={{ width: '485px', paddingRight: '20px' }}
                  alt='logo'
                />
              </div>
            </MDBCol>
            <MDBCol col='6' className='mb-5 my-5 login-form-right'>
              {/* <form className='Auth-form'> */}
              {/* <div className='Auth-form-content'> */}
                <div className='text-center'>
                  {/* <img src={logo} style={{ width: '185px' }} alt='logo' /> */}
                  <h1 className='bookheading'>
                    Sign in to elevate your day with tailored entertainment!
                  </h1>
                </div>

                <br></br>
                <label htmlFor='useremail' className='signin-labels'>
                  Email
                </label>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    placeholder='user@example.com'
                    color='#F7F7FF'
                    style={{
                      backgroundColor: '#3A3A3B',
                      color: '#F7F7FF',
                      border: '0.5px solid #767676',
                      borderRadius: '5px',
                    }}
                    onChange={this.emailChangehandler}
                  />
                </div>
                <label htmlFor='password' className='signin-labels'>
                  Password
                </label>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    placeholder='password'
                    color='#F7F7FF'
                    style={{
                      backgroundColor: '#3A3A3B',
                      color: '#F7F7FF',
                      border: '0.5px solid #767676',
                      borderRadius: '5px',
                    }}
                    onChange={this.passwordChangeHandler}
                  />
                </div>
                <div href='/signinquestions' className='text-center pt-1 mb-2 pb-1'>
                  <Button
                    onClick={this.userlogin}
                    style={{
                      backgroundColor: '#A388C5',
                      color: '#F7F7FF',
                      borderRadius: '5px',
                    }}
                    //href='/signinquestions'
                  >
                    Sign In
                  </Button>
                </div>

                <div className='d-flex flex-row align-items-center justify-content-center pb-4 mb-4'>
                  <p className='signin-labels large fw-bold pt-1 mb-2'>
                    Dont have an account?{' '}
                    <a href='/signup' className='link-danger signin-link'>
                      <b>Create an account!</b>
                    </a>
                  </p>
                </div>
                {/* <div className='d-flex flex-row align-items-center justify-content-center pb-4 mb-4'>
                    <p className='large fw-bold mt-2 pt-1 mb-2'>
                      Are you an APYY employee?{' '}
                      <a href='/adminlogin' className='link-danger'>
                        <b>Login Here!</b>
                      </a>
                    </p>
                  </div> */}
              {/* </div> */}
              {/* </form> */}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Login;
