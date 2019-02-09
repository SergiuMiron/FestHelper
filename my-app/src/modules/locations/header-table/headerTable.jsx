import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ContainerHeader from '../../../common/container-header/container-header';
import SelectBoxTabel from './selectBoxTable';
import { Link } from "react-router-dom";
import { Button, Modal, notification } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import Textarea from '../../../common/textarea/textarea';
import { postLocation } from '../../add-a-location/apiCalls';
import { announces } from '../../../endpoints';
import Input from '../../add-a-location/components/input/input';

const openNotification = () => {
    notification.success({
      message: '',
      description: 'Your announce have been added. Thank you!',
      placement: "topRight",
      style: {backgroundColor: "#FFFAFA", fontFamily: 'Roboto', fontWeight: "bold"}
    });
  };

class HeaderTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            visible: false,
            description: "",
            phone: "",
            festival: "",
            festivalError: "",
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    }

    handleOk = () => {
        let newAnnounce = {};
        newAnnounce['phone'] = this.state.phone;
        newAnnounce['description'] = this.state.description;
        newAnnounce['username'] = localStorage.getItem('username');
        newAnnounce['festival'] = this.state.festival;

        this.setState({ loading: true });
        setTimeout(() => {
          postLocation(announces,newAnnounce, (response) => {
              console.log(response);
          })
          this.setState({ loading: false, visible: false });
          openNotification();
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handlePhoneNumber = (value) => {
        this.setState({
          phone: value
        })
      }

    onDescriptionChange = event => {
        const { target } = event;
        this.setState({
            [target.name]: target.value
    });
    };

    filterCity = ( filterDropDown, selectedItem ) => {
        this.props.filterPageCity(filterDropDown, selectedItem);
    }

    filterPrice = ( filterDropDown, selectedItem ) => {
        console.log(filterDropDown, selectedItem)
        this.props.filterPagePrice ( filterDropDown, selectedItem );
    }

    onFestivalInputChange = ({target}) => {
        this.setState({
            festival: target.value
        })
    }

    render () {
        return (
            <Fragment >
                <Modal
                    visible={this.state.visible}
                    title="You're alone and searching for people to share an apartament with? Post an announcement!"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                        Submit
                        </Button>,
                    ]}
                    >
                    <p className="section-label required">Phone number</p>
                      <ReactPhoneInput defaultCountry={'ro'} 
                                       value={this.state.phone}
                                       onlyCountries={['ro']}
                                       onChange={this.handlePhoneNumber}
                                       disableCountryCode={true}
                                       placeholder="Insert your phone number here"/>

                    <div className="festival-input">
                        <Input id="festival"
                            name="Festival during this time"
                            onChange={this.onFestivalInputChange}
                            error={this.state.festivalError}></Input>
                    </div>

                    <p className="section-label">Description</p>
                        <Textarea id="descriptionId" 
                                value={this.state.description} 
                                onChange={this.onDescriptionChange} 
                                name="description" />
                </Modal>
                <ContainerHeader label="ALL LOCATIONS" className="fa fa-edit" />
                <DivFiltering>
                    <DivBtnDropDown>
                        <DivSelectBox>
                            <Label>City: </Label>
                            <SelectBoxTabel
                            name = 'city'
                            items = {[
                                { value: 'All', id: 1 },
                                { value: 'Cluj', id: 2 },
                                { value: 'Iasi', id: 3 },
                                { value: 'Constanta', id: 4 },
                                { value: 'Bucuresti', id: 5 },
                            ]}
                            filterCity = { this.filterCity }
                            />
                        </DivSelectBox>
                        <DivSelectBox>
                            <Label>Festival:</Label>
                            <SelectBoxTabel
                            name = 'festival'
                            items = {[
                                { value: 'All', id: 5 },
                                { value: 'Untold', id: 6 },
                                { value: 'Neversea', id: 7 },
                                { value: 'Summer Well', id: 8 },
                                { value: 'Electric Castle', id: 9 },
                                { value: 'Sunwaves', id: 10 },
                            ]}
                            filterPrice = { this.filterPrice }
                            />
                        </DivSelectBox>
                        {/* <DivSelectBox>
                            <Label>Difficulty:</Label>
                            <SelectBoxTabel
                            name = 'difficulty'
                            items = {[
                                { value: 'All', id: 13 },
                                { value: 'Easy', id: 14 },
                                { value: 'Medium', id: 15 },
                                { value: 'Hard', id: 16 },
                            ]}
                            filterDifficulty = { this.filterDifficulty }
                            />
                        </DivSelectBox> */}
                        
                    </DivBtnDropDown>
                    {localStorage.getItem("username") !== "" && sessionStorage.getItem("isPartner") === "true" ?
                    <Fragment>
                        <DivButton >
                            <Link to ={"/add-a-location"}>
                            <Button type="primary" size="large">
                                        Add a new location!
                            </Button>
                            </Link>
                            </DivButton>
                            <DivButton>
                                <Button type="primary" size="large" onClick={this.showModal}>
                                            Search for roommates?
                                </Button>
                        </DivButton>
                    </Fragment>
                    : null
                    }
                    
                </DivFiltering>
            </Fragment>
        )
    }
}

export default HeaderTable;


const DivFiltering = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 100px;

    @media only screen and (max-width: 1024px) {
       display: block;
    }
    `;
const DivBtnDropDown = styled.div`
    align-items: baseline;
    display: flex;
    justify-content: space-between;
    position: relative;
    `;
const DivButton = styled.div`
    display: flex;
    align-items: baseline;
    margin: 0px;

    @media only screen and (max-width: 1024px) {
        margin-top: 20px;
    }
    `;
const Label = styled.label`
    font-size: 14px;
    position: relative;
    font-weight: 500;
    padding-right: 3px;
    color: ${props => props.theme.secondaryColor};

    @media only screen and (max-width: 1024px) {
        font-size: 10px;
    }
    `;
const DivSelectBox = styled.div`
    display: flex;
    position: relative;
    align-items:baseline;

    @media only screen and (max-width: 1024px) {
        display: block;
    }
    `;
