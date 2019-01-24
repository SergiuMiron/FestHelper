import React from "react";
import FadeTransition from "./transition/transition";
import { post } from './apiCalls';
import { users } from '../../endpoints';
import { Redirect } from 'react-router-dom';
import "./login.scss";
import "./timer.scss";

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }

  render() {

    return (
      <div className="root-container">

        <div className="box-controller">
          <div
            className={"controller " + (this.state.isLoginOpen
            ? "selected-controller"
            : "")}
            onClick={this
            .showLoginBox
            .bind(this)}>
            Login
          </div>
          <div
            className={"controller " + (this.state.isRegisterOpen
            ? "selected-controller"
            : "")}
            onClick={this
            .showRegisterBox
            .bind(this)}>
            Register
          </div>
        </div>
 
        <FadeTransition isOpen={this.state.isLoginOpen} duration={500}>
          <div className="box-container">
            <LoginBox forceUpdate={this.props.forceUpdate}/>
          </div>
        </FadeTransition>
        <FadeTransition isOpen={this.state.isRegisterOpen} duration={500}>
          <div className="box-container">
            <RegisterBox hideLogin={this.props.hideLogin}
                         setLoggedInTrue={this.props.setLoggedInTrue} ></RegisterBox>
          </div>
        </FadeTransition>

      </div>
    );

  }

}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      username: "",
      password: "",
      loginError: false,
      redirectToHome: false
    };
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }

  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  submitLogin = (e) => {

      var self = this;

      if (this.state.username === "") {
        this.showValidationErr("username", "Username Cannot be empty!");
        return;
      }

      if (this.state.password === "") {
        this.showValidationErr("password", "Password Cannot be empty!");
        return;
      }

      var promise = new Promise ( (resolve,reject) => {
        const feathers = require('@feathersjs/feathers');
        const rest = require('@feathersjs/rest-client');
        const auth = require('@feathersjs/authentication-client');

        const superagent = require('superagent');
        const localStorage = require('localstorage-memory');

        const feathersClient = feathers();

        feathersClient.configure(rest('http://localhost:8081').superagent(superagent))
          .configure(auth({ storage: localStorage }));

          feathersClient.authenticate({
            strategy: 'local',
            email: this.state.username,
            password: this.state.password
          })
          .then(response => {
            // console.log('Authenticated!', response);
            sessionStorage.setItem("loginError", "false");
            return feathersClient.passport.verifyJWT(response.accessToken);
          })
          .then(payload => {
            // console.log('JWT Payload', payload);
            return feathersClient.service('users').get(payload.userId);
          })
          .then(user => {
            feathersClient.set('user', user);
            resolve();
            console.log('User', feathersClient.get('user'));
          })
          .catch(function(error){
            sessionStorage.setItem("loginError", "true");
            reject();
            console.error('Error authenticating!', error);
          });
      })

      promise.then(function() {
        if ( JSON.parse(sessionStorage.getItem("loginError")) === false ) {
                self.clearValidationErr("username");
                localStorage.setItem( 'isLoggedIn', true )
                localStorage.setItem('username', self.state.username)
                self.hideLogin();
                self.setState({
                  redirectToHome: true
                });
                self.props.forceUpdate();
        }
      
      }, err => {
        if ( JSON.parse(sessionStorage.getItem("loginError")) === true) {
          this.setState({
            redirectToHome: false
          })
          this.showValidationErr("username", "Username or password is invalid");
        }
      })
  }

  hideLogin = () => {
    localStorage.setItem( 'showLogin', false )
  }

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
    this.clearValidationErr("username");
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
    this.clearValidationErr("password");
  }

  render() {

    let usernameErr = null,
      passwordErr = null,
      loginErr = null;

    for (let err of this.state.errors) {
      if (err.elm === "username") {
        usernameErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if(err.elm === "login") {
        loginErr = err.msg
      }
    }
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onUsernameChange}/>
              <small className="danger-error">{usernameErr
                ? usernameErr
                : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onPasswordChange}/>
              <small className="danger-error">{passwordErr
                ? passwordErr
                : ""}</small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
           <small className="danger-error">{loginErr
                ? loginErr
                : ""}</small>

            {this.state.redirectToHome && (
                      <Redirect to='/home'/>
                    )}

        </div>
      </div>
    );
  }

}

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      pwdState: null,
      redirectToHome: false,
      username: "",
      email: "",
      password: "",
    };
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }

  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  onUsernameChange = (e) => {
    this.setState({username: e.target.value});
    this.clearValidationErr("username");
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value});
    this.clearValidationErr("email");
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value});
    this.clearValidationErr("password");

    this.setState({pwdState: "weak"});
    if (e.target.value.length > 8) {
      this.setState({pwdState: "medium"});
    } else if (e.target.value.length > 12) {
      this.setState({pwdState: "strong"});
    }

  }

  openPopup(e) {
  }

  submitRegister = (e) => {

    if (this.state.username === "") {
      this.showValidationErr("username", "Username Cannot be empty!");
      return;
    }
    if (this.state.email === "") {
      this.showValidationErr("email", "Email Cannot be empty!");
      return;
    }
    if (this.state.password === "") {
      this.showValidationErr("password", "Password Cannot be empty!");
      return;
    }

    post(users, this.state, (response) => {
      console.log("response", response)
        if(response.status == 201) {
          localStorage.setItem( 'username', this.state.username);
        this.props.hideLogin();
        this.setState({
          redirectToHome: true,
        })
        this.props.setLoggedInTrue();
        this.clearValidationErr("username");
        } else {
          this.showValidationErr("username", "Username or Email already exists")
        }

    })

  }

  render() {

    let usernameErr = null,
      passwordErr = null,
      emailErr = null;

    for (let err of this.state.errors) {
      if (err.elm === "username") {
        usernameErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if (err.elm === "email") {
        emailErr = err.msg;
      }
    }

    let pwdWeak = false,
      pwdMedium = false,
      pwdStrong = false;

    if (this.state.pwdState === "weak") {
      pwdWeak = true;
    } else if (this.state.pwdState === "medium") {
      pwdWeak = true;
      pwdMedium = true;
    } else if (this.state.pwdState === "strong") {
      pwdWeak = true;
      pwdMedium = true;
      pwdStrong = true;
    }

    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onUsernameChange}/>
            <small className="danger-error">{usernameErr
                ? usernameErr
                : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this.onEmailChange}/>
            <small className="danger-error">{emailErr
                ? emailErr
                : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onPasswordChange}/>

            {this.state.password && <div className="password-state">
              <div
                className={"pwd pwd-weak " + (pwdWeak
                ? "show"
                : "")}></div>
              <div
                className={"pwd pwd-medium " + (pwdMedium
                ? "show"
                : "")}></div>
              <div
                className={"pwd pwd-strong " + (pwdStrong
                ? "show"
                : "")}></div>
            </div>}

          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this.submitRegister}>
            Register
          </button>

          {this.state.redirectToHome && (
          <Redirect to='/home'/>
        )}

        </div>
      </div>

    );

  }

}