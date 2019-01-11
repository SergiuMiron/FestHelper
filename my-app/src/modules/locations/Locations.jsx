import React, { Component } from 'react';
import styled from 'styled-components';
import { getLocations } from './apiCalls';
import { locations } from '../../endpoints';
import Table from './table/table';
import Pagination from '../../common/pagination/pagination';
import HeaderTable from './header-table/headerTable';

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
};

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            body: [],
            maxLocationsPerPage: 3,
            currentPage: 1,
            totalPages: '',
            filterByCity:  '',
            itemOfCity: '',
            filterByPrice:  '',
            itemOfPrice: '',
            skippedLocations: 0,
        }
    }

    queryParams() {
        const { skippedLocations, maxLocationsPerPage, key, order, filterByCity, filterByPrice, itemOfCity, itemOfPrice} = this.state;
        return `${locations}?$skip=${skippedLocations}&$limit=${maxLocationsPerPage}${key !== '' ? `&$sort[${key}]=${order}` : ''}${filterByCity !== '' ? `&${filterByCity}=${itemOfCity}`: ''}${filterByPrice !== '' ? `&${filterByPrice}=${itemOfPrice}`: ''}`
    }

    changePage = (noOfSkippedLocations, newCurrentPage) => {
        this.setState({
          skippedLocations: noOfSkippedLocations,
          currentPage: newCurrentPage
        }, () => {
          this.update();
        })
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

    componentWillMount() {
        this.update();
        getLocations(locations, data => {
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
        // console.log("currentPage", this.state.currentPage);
        // console.log("totalPages", this.state.totalPages);
        // console.log("maxLocations per page", this.state.maxLocationsPerPage)
        return ( 
            <Container>
                <HeaderTable filterPageCity={this.filterPageCity} filterPagePrice={this.filterPagePrice}/>
               <Table
                    headings={headings}
                    data={this.state.body}
                    setKey={this.setKeyToSortBy}
                    order={this.state.order}
                    sorted={this.state.sorted}
                    updatePagination={this.update}
                    maxQuestionsPerPage={this.state.maxLocationsPerPage}
                    currentPage={this.state.currentPage}
            />
             <Pagination changePage={this.changePage} currentPage={this.state.currentPage} totalPages={this.state.totalPages} maxLocationsPerPage={this.state.maxLocationsPerPage} />
            </Container>
         );
    }
}
 
export default Locations;