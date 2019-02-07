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
import LocationDetails from './modules/location_details/locationDetails';
import Wishlist from './modules/wishlist/wishlist';
import Announces from './modules/announces/announces';
import 'antd/dist/antd.css';

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
                  <Route path="/wishlist" component={Wishlist} />
                  <Route path="/announces" component={Announces} />
                  <Route
                    path="/login"
                    render={() => (
                      <Login
                        hideLogin={this.hideLogin}
                        setLoggedInTrue={this.setLoggedInTrue}
                        forceUpdate={this.forceComponentToUpdate}
                      />
                      )}/>
                  <Route
                      path='/location-details/:id'
                      render={({ match }) => (
                        <LocationDetails match={match}></LocationDetails>
                      )}/>
              </Switch>
            </Fragment>
         </BrowserRouter>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
