import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ContainerHeader from '../../../common/container-header/container-header';
import WishlistSelectBoxTabel from './wishlist-selectbox-table';

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


class WishlistHeaderTable extends Component {
    filterCity = ( filterDropDown, selectedItem ) => {
        this.props.filterPageCity(filterDropDown, selectedItem);
    }

    filterPrice = ( filterDropDown, selectedItem ) => {
        this.props.filterPagePrice ( filterDropDown, selectedItem );
    }

    render () {
        return (
            <Fragment >
                <ContainerHeader label="MY WISHLIST" className="fa fa-edit" />
                <DivFiltering>
                    <DivBtnDropDown>
                        <DivSelectBox>
                            <Label>Type: </Label>
                            <WishlistSelectBoxTabel
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
                            <WishlistSelectBoxTabel
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
                            <WishlistSelectBoxTabel
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
                </DivFiltering>
            </Fragment>
        )
    }
}

export default WishlistHeaderTable;