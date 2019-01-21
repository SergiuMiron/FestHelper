import React, { Component } from 'react';
import { PaginationWrapper, NavigationElement, ComponentWrapper } from './pagination.style'

class Pagination extends Component {

    pageClicked = evt => {
        const { changePage, maxLocationsPerPage, totalPages, currentPage } = this.props;

        let newCurrentPage = currentPage;
        let noOfSkippedQuestions;
        const clickedButton = evt.target.innerHTML;
        
        if (clickedButton === "First") {
            noOfSkippedQuestions = 0;
            newCurrentPage = 1
            
        } else if (clickedButton === "Prev") {
            if(currentPage > 1) {
                noOfSkippedQuestions = maxLocationsPerPage * (currentPage - 2);
                newCurrentPage = currentPage - 1;
            }else {
                return;
            }

        } else if (clickedButton === "Next") {
            if(currentPage < totalPages) {
                noOfSkippedQuestions = maxLocationsPerPage * (currentPage);
                newCurrentPage = currentPage + 1;  
            }else {
                return;
            }
            
        } else if (clickedButton === "Last") {
            noOfSkippedQuestions = maxLocationsPerPage * (totalPages - 1);
            newCurrentPage = totalPages;  

        } else {
            const clk = parseInt(clickedButton);
            noOfSkippedQuestions = (clk - 1) * maxLocationsPerPage;
            newCurrentPage = clk;
        }
        newCurrentPage = Number(newCurrentPage);
        changePage(noOfSkippedQuestions, newCurrentPage);
    }

    setCurrentPage = (crrPage) => {
        const currentPage = Number(crrPage);
        this.setState({
            currentPage: currentPage,
        })
    }
    
    getStartPage = (startPage) => {
        const { totalPages, currentPage } = this.props
 
        let crrPage = currentPage;

        if (crrPage === 1 || crrPage === 2){
            startPage = 1;
            
        } else if (crrPage === totalPages - 1 || crrPage === totalPages){
            startPage = totalPages - 3;

        } else {
            startPage = crrPage - 1;
        }
        return startPage;
    }

    renderPageNb() {
        const { totalPages, currentPage } = this.props;
        let pageNb = [];
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > 4){
            startPage = this.getStartPage(startPage);
            endPage = startPage + 3;
        }

        for(let index = startPage; index <= endPage ; index++) {
            pageNb.push(<NavigationElement key={index.toString()} onClick={this.pageClicked}  type={currentPage === index ? 'current' : 'normal'}>{index}</NavigationElement>);
        } 
        return pageNb;
    }

    render() {
        console.log("Max locations " , this.props.maxLocationsPerPage)
        const { totalPages, currentPage } = this.props;
        return (
                <ComponentWrapper>
                    <PaginationWrapper>
                        <NavigationElement onClick={this.pageClicked}  type={currentPage === 1 ? 'disabled' : 'normal'}>First</NavigationElement>
                        <NavigationElement onClick={this.pageClicked}  type={currentPage === 1 ? 'disabled' : 'normal'}>Prev</NavigationElement>
                        {this.renderPageNb()}
                        <NavigationElement onClick={this.pageClicked} type={currentPage === totalPages ? 'disabled' : 'normal'}>Next</NavigationElement>
                        <NavigationElement onClick={this.pageClicked} type={currentPage === totalPages ? 'disabled' : 'normal'}>Last</NavigationElement>
                    </PaginationWrapper>
                </ComponentWrapper>
        )
    }
}

export default Pagination;