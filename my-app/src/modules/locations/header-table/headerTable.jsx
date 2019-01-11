import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Button from '../../../common/button/button';
import ContainerHeader from '../../../common/container-header/container-header';
import SelectBoxTabel from './selectBoxTable';
import { Link } from "react-router-dom";

class HeaderTable extends Component {

    filterCity = ( filterDropDown, selectedItem ) => {
        this.props.filterPageCity(filterDropDown, selectedItem);
    }

    filterPrice = ( filterDropDown, selectedItem ) => {
        this.props.filterPagePrice ( filterDropDown, selectedItem );
    }

    render () {
        return (
            <Fragment >
                <ContainerHeader label="ALL LOCATIONS" className="fa fa-edit" />
                <DivFiltering>
                    <DivBtnDropDown>
                        <DivSelectBox>
                            <Label>Type: </Label>
                            <SelectBoxTabel
                            name = 'city'
                            items = {[
                                { value: 'All', id: 1 },
                                { value: 'Brasov', id: 2 },
                                { value: 'Slanic-Moldova', id: 3 },
                                { value: 'Code', id: 4 },
                            ]}
                            filterCity = { this.filterCity }
                            />
                        </DivSelectBox>
                        <DivSelectBox>
                            <Label>Discipline:</Label>
                            <SelectBoxTabel
                            name = 'price'
                            items = {[
                                { value: 'All', id: 5 },
                                { value: 900, id: 6 },
                                { value: 250, id: 7 },
                                { value: 'Ui', id: 8 },
                                { value: 'Am', id: 9 },
                                { value: 'Testing', id: 10 },
                                { value: 'Android', id: 11 },
                                { value: 'Ios', id: 12 },
                            ]}
                            filterPrice = { this.filterPrice }
                            />
                        </DivSelectBox>
                        <DivSelectBox>
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
                        </DivSelectBox>
                        
                    </DivBtnDropDown>
                    <DivButton >
                        <Link to ={"/create-question"}>
                           <Button size='Medium' textTransform='capitalize' title='+ Create a New Location' action= { this.setRedirect }></Button>
                        </Link>
                    </DivButton>
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
    `;
const Label = styled.label`
    font-size: 14px;
    position: relative;
    font-weight: 500;
    padding-right: 3px;
    color: ${props => props.theme.secondaryColor};
    `;
const DivSelectBox = styled.div`
    display: flex;
    position: relative;
    align-items:baseline;
    `;
