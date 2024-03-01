/* eslint-disable */
import React, { PureComponent } from "react";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import url from "../../utils/urlconfig";
import logo from "../../logo.jpg";
import jwtDecode from "jwt-decode";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: "/login",
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
      url: `${url}/login`,
      method: "post",
      data: data,
    })
      .then(async (response) => {
        await localStorage.setItem(
          "currentUser",
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
            redirect: "/userdashboard",
          });
          // if (isadmin === "0") {
            
          // } else if (isadmin === "1") {
          //   await this.setState({
          //     redirect: "/admindashboard",
          //   });
          // }
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="Auth-form-container login-page">
        {redirectVar}
        <form className="Auth-form">
          <div className="Auth-form-content">
            <div className="text-center">
              <img src={logo} style={{ width: "185px" }} alt="logo" />
              <h3 className="bookheading">
                <b>Sign In with your registered email!</b>
              </h3>
            </div>

            <br></br>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="user@example.com"
                onChange={this.emailChangehandler}
              />
            </div>
            <br></br>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                onChange={this.passwordChangeHandler}
              />
            </div>
            <div className="text-center pt-1 mb-5 pb-1">
              <Button variant="danger" onClick={this.userlogin}>
                Sign In
              </Button>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="large fw-bold mt-2 pt-1 mb-2">
                Dont have an account?{" "}
                <a href="/signup" className="link-danger">
                  <b>Create an account!</b>
                </a>
              </p>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="large fw-bold mt-2 pt-1 mb-2">
                Are you an APYY employee?{" "}
                <a href="/adminlogin" className="link-danger">
                  <b>Login Here!</b>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
