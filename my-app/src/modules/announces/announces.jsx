import React, { Component, Fragment } from 'react';
import { Card, Col, Icon, Avatar, Tooltip, Drawer, Row, Divider,Table, Tag,  } from 'antd';
import { getLocations } from '../locations/apiCalls';
import { announces } from '../../endpoints';
import LinesEllipsis from 'react-lines-ellipsis'
import { ConfirmationDialog } from '../../common/confirmation-dialog/confirmation-dialog';
import { deleteLocation } from '../locations/apiCalls';
import PopUp from '../../common/pop-up/pop-up';
import './announces.scss';

const { Meta } = Card;
const { Column, ColumnGroup } = Table;

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };

  const DescriptionItem = ({ title, content }) => (
    <div
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: 'inline-block',
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
 );

class Announces extends Component{
    constructor(props){
        super(props)

        this.state = {
            announces: [],
            visible: false,
            data: [],
            show: false,
            index: 0,
            popup: false,
            actionResult: '',
            messageForPopup: ""
        }
    }

    componentWillMount() {

        getLocations(announces, data => {
            this.setState({
                announces: data
            }, () => {
                
            })
        })
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

    showDrawer= () => {
        this.setState({
            visible: true,
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    deleteAnnounce = () => {
        this.setState({ show: false });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        console.log("first", this.state.index)
        console.log("1", this.state.announces[this.state.index])
        deleteLocation(announces, this.state.announces[this.state.index]._id, (response) => {
            this.setState({
                actionResult: response.ok,
                popup: true
            });

            this.state.actionResult === true ? this.setState({ messageForPopup : "Announce succesfully deleted!" })
            : this.setState({ messageForPopup : "Announce have not been deleted!" })
        })

        this.state.announces.splice(this.state.index, 1)
        this.setState({
            announces: this.state.announces
        })
    }

    closePopup = () => {
        this.setState({
            actionResult: '',
            popup: false
        })
    }

    render() {
        const columns = [{
            title: 'Author',
            dataIndex: 'author',
          }, {
            title: 'Phone',
            dataIndex: 'phone',
          }, {
            title: 'Description',
            dataIndex: 'description',
          }
        ];

        const something = [];
        this.state.announces.map((row, index) => (
            something.push({
                key: index,
                author: row.username,
                phone: "0" + row.phone,
                description: row.description,
                festival: row.festival
            })
        ))
        return (
            
            <div className="announces-table-container">
                 {this.state.popup ? 
                       <PopUp status={this.state.actionResult} 
                              onClose={this.closePopup} 
                              message={this.state.messageForPopup} 
                              delay={3000}></PopUp> 
                      : null }
                <ConfirmationDialog
                    message="ARE YOU SURE YOU WANT TO DELETE THIS ANNOUNCE?"
                    show={this.state.show}
                    handleClose={this.hideModal}
                    handleAction={this.deleteAnnounce}
                    rightButtonTitle="DELETE">
                </ConfirmationDialog>
                <Table expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} dataSource={something}>
                <Column title="Author" dataIndex="author"></Column>
                <Column title="Phone" dataIndex="phone"></Column>
                <Column title="Festival interested in" dataIndex="festival"></Column>
                {localStorage.getItem("username") === "admin" ? 
                     <Column
                     title="Action"
                     key="action"
                     render={(text, something) => (
                         <span>
                        <i className="fas fa-trash" onClick={() => this.showModal(something.key)} ></i>
                         <Divider type="vertical" />
                         <a href="javascript:;">Delete</a>
                         </span>
                     )}
                  /> : null
            }
                </Table>
            </div>
        )
    }
}

export default Announces;