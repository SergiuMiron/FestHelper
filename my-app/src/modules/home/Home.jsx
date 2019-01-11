import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        // localStorage.setItem( 'showLogin', false);
        return ( 
           <Fragment>
                <h1 className="home-title">Welcome to MyApp</h1>
                <div className="home-container">
                    <div className="left-container col-md-6 col-lg-6">
                        <div className="start-reading tile hidden-lg hidden-md hidden-sm">
                            <Link to="/locations">
                            <i className="fa fa-book"></i>
                            <p>Start reading today!</p>
                            </Link>
                        </div>

                        <div className="rules-container tile">
                          <div className="rule-title">
                             BiblioTech Rules,
                          </div>

                          <div>
                              <div className="rules-text">
                                   You need to be good!
                                   You need to be good!
                                   You need to be good!
                                   You need to be good!
                              </div>
                          </div>
                        </div>
                    </div>

                    <div className="right-container col-md-6 col-lg-6 col-xs-12">
                        <div className="riht-columns-container">
                            <div className="buttons-container col-md-6">
                                <div className="start-reading tile hidden-xs">
                                    <Link to="/locations">
                                        <i className="fa fa-book"></i>
                                        <p>
                                            Start reading today!
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </Fragment>
         );
    }
}
 
export default Home;