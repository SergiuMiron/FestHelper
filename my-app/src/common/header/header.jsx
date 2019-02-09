import React, { Component, Fragment } from 'react';
import { Link,Redirect } from "react-router-dom";
import Item from './components/item';
import styled from 'styled-components';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import "./header.scss";
import { Menu, Dropdown, Icon, Avatar,notification } from 'antd';
import FeedbackModal from '../feedback-modal/feedback-modal';
import ManageUsersModal from '../manage-users-modal/manage-users-modal';

const navbarItems = [
    { href: "/locations", text: "Locations" },
    { href: "/add-a-location", text: "New Location" },
    { href: "/wishlist", text: "My wishlist" },
    { href: "/announces", text: "Announces"},
    // { href: "/home", text: "Page4" }
  ];

const onClick = ({ key }) => {
    return <Redirect to='/add-a-location'></Redirect>
};

const menu = (
<Menu onClick={onClick}>
    <Menu.Item ><a href="/locations">Locations</a></Menu.Item>
    <Menu.Item ><a href="/add-a-location">New Location</a></Menu.Item>
    <Menu.Item><a href="/wishlist">Wishlist</a></Menu.Item>
    <Menu.Item><a href="/announces">Announces</a></Menu.Item>
</Menu>
);

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
      style: {backgroundColor: "#FFFAFA", fontFamily: 'Roboto', fontWeight: "bold"}
    });
  };
  
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: localStorage.getItem('username') || "",
            showConfirmationDialog: false,
            showFeedbackModal: false,
            showManageUsersModal: false,
         }
    }

    menu = (
        <Menu onClick={() => this.showFeedbackModal()}>
          <Menu.SubMenu title="Send your feedback here" onTitleClick={() => this.showFeedbackModal()}></Menu.SubMenu>
          <Menu.SubMenu title="Manage users" onTitleClick={() => this.showManageUsersModal()}></Menu.SubMenu>
        </Menu>
    );

    showManageUsersModal = () => {
        this.setState({
            showManageUsersModal: true
        })
    }

    showFeedbackModal = () => {
        this.setState({
            showFeedbackModal:true,
        })
    }

    handleCancelFeedbackModal = () => {
        this.setState({ showFeedbackModal: false });
    }

    handleCancelManageUsersModal = () => {
        this.setState({
            showManageUsersModal: false
        })
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
                
                <FeedbackModal showFeedbackModal={this.state.showFeedbackModal}
                            handleCancelFeedbackModal={this.handleCancelFeedbackModal}
                            showNotification={openNotification}>
                </FeedbackModal>

                <ManageUsersModal showManageUsersModal={this.state.showManageUsersModal}
                            handleCancelManageUsersModal={this.handleCancelManageUsersModal}
                            showNotification={openNotification}>
                </ManageUsersModal>

                <div className="navbar-toggle">
                    <Dropdown overlay={menu}>
                         <Icon type="bars" style={{ fontSize:'40px', color: '#808080', cursor: 'pointer'}}/>
                    </Dropdown>
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