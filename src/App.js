import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './modules/home/Home'
import AddALocation from './modules/add-a-location/add-a-location';
import Locations from './modules/locations/Locations';
import Header from './common/header/header';
import { ThemeProvider } from "styled-components";
import Theme from './config/theme';
import {Login} from './modules/login/login';

// const feathers = require('@feathersjs/feathers');
// const rest = require('@feathersjs/rest-client');
// const auth = require('@feathersjs/authentication-client');

// const superagent = require('superagent');
// const localStorage = require('localstorage-memory');

// const feathersClient = feathers();

// feathersClient.configure(rest('http://localhost:8081').superagent(superagent))
//   .configure(auth({ storage: localStorage }));

//   feathersClient.authenticate({
//     strategy: 'local',
//     email: 'myemail',
//     password: 'mypassword'
//   })
//   .then(response => {
//     console.log('Authenticated!', response);
//     return feathersClient.passport.verifyJWT(response.accessToken);
//   })
//   .then(payload => {
//     console.log('JWT Payload', payload);
//     return feathersClient.service('users').get(payload.userId);
//   })
//   .then(user => {
//     feathersClient.set('user', user);
//     console.log('User', feathersClient.get('user'));
//   })
//   .catch(function(error){
//     console.error('Error authenticating!', error);
//   });


class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      showLogin: JSON.parse(localStorage.getItem('showLogin')) || false,
      isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    }
  }

  showLogin = () => {
    
    localStorage.setItem( 'showLogin', true );
    this.setState({
      showLogin: true,
    })
  }

  hideLogin = () => {
    localStorage.setItem( 'showLogin', false )
    this.setState({
      showLogin: false,
    })
  }

  setLoggedInTrue = () => {
    localStorage.setItem( 'isLoggedIn', true )
    this.setState({
      isLoggedIn: true,
    })
  }

  forceComponentToUpdate = () => {
    this.forceUpdate();
  }

  render() {
    // localStorage.setItem( 'showLogin', "false");
    return (
      <ThemeProvider theme={Theme}>
         <div className="App">
         <BrowserRouter>
            <Fragment>
              { JSON.parse(localStorage.getItem('showLogin')) === false ?  <Header showLogin={this.showLogin}
                                                 isLoggedIn={JSON.parse(localStorage.getItem('isLoggedIn'))}></Header> : null} 
              <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/locations" component={Locations} />
                  <Route path="/add-a-location" component={AddALocation} />
                  <Route
                    path="/login"
                    render={() => (
                      <Login
                        hideLogin={this.hideLogin}
                        setLoggedInTrue={this.setLoggedInTrue}
                        forceUpdate={this.forceComponentToUpdate}
                      />
              )}
            />
              </Switch>
            </Fragment>
         </BrowserRouter>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
