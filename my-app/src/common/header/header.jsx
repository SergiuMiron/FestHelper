import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Item from './components/item';
import styled from 'styled-components';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import "./header.scss"

const navbarItems = [
    { href: "/locations", text: "Locations" },
    { href: "/add-a-location", text: "New Location" },
    // { href: "/home", text: "Page3" },
    // { href: "/home", text: "Page4" }
  ];

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
  
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: localStorage.getItem('username') || "",
            showConfirmationDialog: false,
         }
    }

    logOut = () => {
        localStorage.setItem( 'isLoggedIn', false )
        localStorage.setItem( 'username', "" )
        window.location.reload();
    }

    showModal = () => {
        this.setState({
            showConfirmationDialog: true,
        });
    };

    hideModal = () => {
        this.setState({ showConfirmationDialog: false });
    };

    render() { 

        return ( 
            <div className="navbar">
               <Link to="/home">    
                    <img
                    className="navbar-logo"
                    alt="Logo"
                    src="/assets/snow.png"
                    />
               </Link>

               <ConfirmationDialog
                    message="ARE YOU SURE YOU WANT TO LOGOUT?"
                    rightButtonTitle="LOGOUT"
                    show={this.state.showConfirmationDialog}
                    handleClose={this.hideModal}
                    handleAction={() => this.logOut()}>
                </ConfirmationDialog>

                <div className="login-container">
                    <i className="fas fa-user-circle" ></i>
                {this.props.isLoggedIn && this.state.username !== "" ? <Fragment>
                                                                            <div>Welcome, {localStorage.getItem('username')}</div>
                                                                            <i className="fas fa-sign-out-alt" onClick={() => this.showModal()}></i>
                                                                        </Fragment>
                                                                        : 
                                                                        <StyledLink to="/login">
                                                                            <div onClick={() => this.props.showLogin()}>Login/register</div>
                                                                        </StyledLink>}
                </div>

               <div className="navbar-right-side">
                    <ul className="navbar__list">
                        {navbarItems.map((item, index) => (
                        <Item key={index} {...item} />
                    ))}
                    </ul>
               </div>
            </div>
         );
    }
}
 
export default Header;