import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Item from './components/item';
import styled from 'styled-components';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import "./header.scss";
import { Menu, Dropdown, Icon, Modal, Button, Avatar,notification } from 'antd';
import FeedbackModal from '../feedback-modal/feedback-modal';

const navbarItems = [
    { href: "/locations", text: "Locations" },
    { href: "/add-a-location", text: "New Location" },
    { href: "/wishlist", text: "My wishlist" },
    // { href: "/home", text: "Page4" }
  ];

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const openNotification = () => {
    notification.success({
      message: '',
      description: 'Succesfully sent. Thank you for your feedback!',
      placement: "bottomRight",
      style: {
        fontWeight: 600,
        fontFamily: 'Roboto',
      },
    });
  };
  
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: localStorage.getItem('username') || "",
            showConfirmationDialog: false,
            showFeedbackModal: false,
         }
    }

    menu = (
        <Menu onClick={() => this.showFeedbackModal()}>
          <Menu.Item key="1">Send your feedback here</Menu.Item>
        </Menu>
    );

    showFeedbackModal = () => {
        this.setState({
            showFeedbackModal:true,
        })
    }

    handleCancelFeedbackModal = () => {
        this.setState({ showFeedbackModal: false });
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
                    src="/assets/wix.jpg" 
                    />
               </Link>

               <ConfirmationDialog
                    message="ARE YOU SURE YOU WANT TO LOGOUT?"
                    rightButtonTitle="LOGOUT"
                    show={this.state.showConfirmationDialog}
                    handleClose={this.hideModal}
                    handleAction={() => this.logOut()}>
                </ConfirmationDialog>
                
                <FeedbackModal showFeedbackModal={this.state.showFeedbackModal}
                            handleCancelFeedbackModal={this.handleCancelFeedbackModal}
                            showNotification={openNotification}>
                </FeedbackModal>

                <div className="login-container">
                    <Avatar src="/assets/picture.png" size={55}/>
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

                <Dropdown overlay={this.menu} trigger={['click']}>
                    <Icon type="bars" style={{ fontSize:'40px', color: '#808080', cursor: 'pointer'}}/>
                </Dropdown>

            </div>
         );
    }
}
 
export default Header;