import React, { Component, Fragment } from 'react';
import StyleTable from './wishlist-table.style';
import Td from '../../../common/tabel/Td';
import Th from '../../../common/tabel/Th';
import Theme from '../../../config/theme';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { ConfirmationDialog } from '../../../common/confirmation-dialog/confirmation-dialog';
import { deleteLocation } from '../apiCall';
import { wishlist } from '../../../endpoints';
import PopUp from '../../../common/pop-up/pop-up';
import { Collapse } from 'antd';
import "./wishlist-table.scss";

const Panel = Collapse.Panel;

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            keys: Object.keys(props.headings),
            labels: Object.values(props.headings),
            show: false,
            index: 0,
            popup: false,
            actionResult: '',
            messageForPopup: ''
         }
    }

    showModal = (index) => {
        this.setState({
            show: true,
            index: index
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    deleteLocation = () => {
        this.setState({ show: false });

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        deleteLocation(wishlist, this.props.data[this.state.index]._id, (response) => {
            this.setState({
                actionResult: response.ok,
                popup: true
            });

            this.state.actionResult === true ? this.setState({ messageForPopup : "Location succesfully deleted!" })
            : this.setState({ messageForPopup : "Location have not been deleted!" })

            this.props.updatePagination();
        });

        this.props.data.splice(this.state.index, 1)
        this.setState({
            data: this.props.data
        })
    }

    closePopup = () => {
        this.setState({
            actionResult: '',
            popup: false
        })
    }

    render() {
        return ( 
            <Fragment>
                 {this.state.popup ? 
                       <PopUp status={this.state.actionResult} 
                              onClose={this.closePopup} 
                              message={this.state.messageForPopup} 
                              delay={3000}></PopUp> 
                      : null }
                 <ConfirmationDialog
                    message="ARE YOU SURE YOU WANT TO DELETE THIS LOCATION?"
                    show={this.state.show}
                    handleClose={this.hideModal}
                    handleAction={this.deleteLocation}
                    rightButtonTitle="DELETE">
                </ConfirmationDialog>
                <StyleTable>
                    <thead>
                        <tr>
                            <Th textAlign='left'>No.</Th>
                            {this.state.keys.map(key => <Th  textAlign='left'>{this.props.headings[key]}
                            </Th>)}
                            <Th textAlign='center'>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((row, index) => (
                                <tr>
                                    <Td textAlign='left'>{this.props.maxQuestionsPerPage * (this.props.currentPage - 1) + index   + 1}</Td>
                                    <Td textAlign='left' textOverflow="ellipsis" maxWidth='325px'>{row.name}</Td>
                                    <Td textAlign='left' maxWidth='160px'>{row.city}</Td>
                                    <Td textAlign='left'>{row.price}</Td>
                                    <Td textAlign='left' color={Theme[`${row.difficulty}Color`]}> 0{row.phone}</Td>
                                    <Td textAlign='left'>{<Moment format="MM.DD.YYYY">{row.startLocation}</Moment>}</Td>
                                    <Td textAlign='left'>{<Moment format="MM.DD.YYYY">{row.endLocation}</Moment>}</Td>
                                    <Td textAlign="center" maxWidth='80px'>
                                        <Link to ={"/location-details/"+row.idOfLocation}>
                                        <i className="fas fa-pencil-alt"></i>
                                        </Link>
                                        <i className="fas fa-trash" onClick={() => this.showModal(index)} ></i>
                                    </Td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </StyleTable>

                <div className="table-accordeon">
                        <Collapse accordion>
                            { this.props.data.map((row, index) => (
                                <Panel header={row.name}>
                                    <div className="table-accordeon-details">
                                        <div>City:  {row.city}</div>
                                        <div>Phone: 0{row.phone} </div>
                                        <div>Price:  {row.price}</div>
                                        <div className="margin-right"><span>Available date:</span>{<Moment format="MM.DD.YYYY">{row.startLocation}</Moment>}
                                         - {<Moment format="MM.DD.YYYY">{row.startLocation}</Moment>}</div>
                                        <div><span>Actions:</span> 
                                            <Link to ={"/location-details/"+row.idOfLocation}>
                                            <i className="fas fa-pencil-alt"></i>
                                            </Link>
                                            <i className="fas fa-trash" onClick={() => this.showModal(index)} ></i> </div>
                                    </div>
                                </Panel>
                            )) }
                        </Collapse>
                </div>
            </Fragment>
        );
    }
}
 
export default Table;