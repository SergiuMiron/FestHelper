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
            maxLocationsPerPage: 3,
            currentPage: 1,
            totalPages: '',
            filterByCity: '',
            itemOfCity: '',
            filterByPrice: '',
            itemOfPrice: '',
            skippedLocations: 0,
            username: localStorage.getItem('username') || ""
        }
    }

    queryParams() {
        const { username, skippedLocations, maxLocationsPerPage, key, order, filterByCity, filterByPrice, itemOfCity, itemOfPrice} = this.state;
        return `${wishlist}?username=${username}&$skip=${skippedLocations}&$limit=${maxLocationsPerPage}${key !== '' ? `&$sort[${key}]=${order}` : ''}${filterByCity !== '' ? `&${filterByCity}=${itemOfCity}`: ''}${filterByPrice !== '' ? `&${filterByPrice}=${itemOfPrice}`: ''}`
    }

    update = () => {
        const url = this.queryParams();
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
            this.setState({
                body: data.data,
                totalPages: Math.ceil(data.total / this.state.maxLocationsPerPage)
            });
            })
            .catch(function (error) {
            });   
    }

    changePage = (noOfSkippedLocations, newCurrentPage) => {
        this.setState({
          skippedLocations: noOfSkippedLocations,
          currentPage: newCurrentPage
        }, () => {
          this.update();
        })
    }

    queryParamsForExcludingPicturesFields () {
         return `${wishlist}?username=${this.state.username}&$select[]=name&$select[]=city&$select[]=price&$select[]=phone&$select[]=startLocation&$select[]=endLocation`;
    }

    componentWillMount() {
        this.update();
        const url = this.queryParamsForExcludingPicturesFields();
        getLocations(url, data => {
            this.setState({
              body: data,
            });
          });
    }

    filterPageCity = (filterDropDown, selectedItem) => {
        selectedItem === 'all'
        ?  this.setState({
              filterByCity: '',
              itemOfCity: '',
              currentPage: 1,
              skippedLocations: 0
          }, () => {
              this.update();
          })
        : this.setState({
          filterByCity: filterDropDown,
          itemOfCity: selectedItem,
          currentPage: 1,
          skippedLocations: 0
        }, () => {
            this.update();
        })
    }

    filterPagePrice = (filterDropDown, selectedItem) => {
        selectedItem === 'all'
        ?  this.setState({
              filterByPrice: '',
              itemOfPrice: '' ,
              currentPage: 1,
              skippedLocations: 0
          }, () => {
              this.update();
          })
        : this.setState({
          filterByPrice: filterDropDown,
          itemOfPrice: selectedItem,
          currentPage: 1,
          skippedLocations: 0 
        }, () => {
            this.update();
        })
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
                <Pagination changePage={this.changePage} 
                            currentPage={this.state.currentPage} 
                            totalPages={this.state.totalPages}
                            maxLocationsPerPage={this.state.maxLocationsPerPage}/>
            </Container>
        )
    }
}

export default Wishlist;