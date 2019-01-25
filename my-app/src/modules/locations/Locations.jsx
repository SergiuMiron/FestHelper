import React, { Component } from 'react';
import styled from 'styled-components';
import { getLocations } from './apiCalls';
import { locations } from '../../endpoints';
import Table from './table/table';
import Pagination from '../../common/pagination/pagination';
import HeaderTable from './header-table/headerTable';
import { Empty,Button,Spin,Icon } from 'antd';
import { Link } from "react-router-dom";
import './locations.scss';

const Container = styled.div`       
    display: block;
    // margin: 0 auto 180px auto;
    margin: auto;
    width: 80%;
    `;

const headings = {
    name: "Name",
    city: "City",
    price: "Price",
    phone: "Phone",
    startDate: "Start date",
    endDate: "End date"
};

const antIcon = <Icon type="loading" style={{ fontSize: 50, }} spin />;

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
            loading: true,
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

    queryParamsForExcludingPicturesFields () {
        return `${locations}?$select[]=name&$select[]=city&$select[]=price&$select[]=phone&$select[]=startLocation&$select[]=endLocation`;
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
    componentDidMount() {
        setTimeout(
            function() {
                this.setState({loading: false});
            }
            .bind(this),
            500
        );
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
        return ( 
            this.state.loading ? 
                <div className="spinner">
                    <Spin indicator={antIcon}
                        size="large"
                        spinning={this.state.loading}
                        tip="Loading..."
                        wrapperClassName="spinner"></Spin>
                </div>
                : 
                this.state.body.length > 0 ? 
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
                     :  <Empty  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                            description="There are no locations available at the moment">
                            <Link to ={"/add-a-location"}>
                                <Button type="primary">
                                    Go add a new location!
                                </Button>
                            </Link>
                       </Empty> 
        );
    }
}
 
export default Locations;