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
                            <Label>City: </Label>
                            <WishlistSelectBoxTabel
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
                            <WishlistSelectBoxTabel
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
                    </DivBtnDropDown>
                </DivFiltering>
            </Fragment>
        )
    }
}

export default WishlistHeaderTable;