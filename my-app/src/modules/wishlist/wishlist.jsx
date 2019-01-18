import React, { Component } from 'react';
import styled from 'styled-components'
import WishlistHeaderTable from './wishlist-header-table/wishlist-header-table';
import Table from './wishlist-table/wishlist-table';
import Pagination from '../../common/pagination/pagination';
import { getLocations } from './apiCall';
import { wishlist } from '../../endpoints';

const Container = styled.div`
    display: block;
    margin: 0 auto 180px auto;
    width: 1220px;
    `;

const headings = {
    name: "Name",
    city: "City",
    price: "Price",
    phone: "Phone",
    startDate: "Start date",
    endDate: "End date"
}

class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: [],
            maxLocationPerPage: 3,
            currentPage: 1,
            totalPages: '',
            filterByCity: '',
            itemOfCity: '',
            filterByPrice: '',
            itemOfPrice: '',
            skippedLocations: 0,
        }
    }

    render() {
        return(
            <Container>
                <WishlistHeaderTable filterPageCity={this.filterPageCity} filterPagePrice={this.filterPagePrice}></WishlistHeaderTable>
                 <Table
                    headings={headings}
                    data={this.state.body}
                    setKey={this.setKeyToSortBy}
                    order={this.state.order}
                    sorted={this.state.sorted}
                    updatePagination={this.update}
                    maxQuestionsPerPage={this.state.maxLocationsPerPage}
                    currentPage={this.state.currentPage} />
            </Container>
        )
    }
}

export default Wishlist;