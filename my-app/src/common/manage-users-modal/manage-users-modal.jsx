import React,{Component} from 'react';
import { Modal, Table, Divider,Icon, notification } from 'antd';
import { getLocations } from '../../modules/locations/apiCalls';
import { users } from '../../endpoints';
import { update } from './apiCall';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import './manage-users-modal.scss';

const { Column } = Table;

const openNotification = (type) => {
    notification[type]({
      message: '',
      description: 'You made this user a partner. Now he can add locations and announces!',
    //   style: {backgroundColor: "#FFFAFA", fontFamily: 'Roboto', fontWeight: "bold"}
    });
  };

class ManageUsersModal extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: [],
            index: 0,
            isPartner: true,
            show: false,
        }
    }

    componentWillMount() {
        getLocations(users, data => {
            this.setState({
                users: data
            })
        })
    }
    showModal = (index) => {
        console.log("here", index)
        this.setState({
            show: true,
            index: index
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    makePartner = () => {
        openNotification('success');
        this.setState({
            isPartner: true,
            show: false
        }, () => {
            console.log(this.state)
            update(users + '/' + this.state.users[this.state.index]._id, this.state, (response) => {
                sessionStorage.setItem("isPartner", "true");
            })
        })

    }

    render() {
        const tabelUsers = [];
        this.state.users.map((row, index) => (
            tabelUsers.push({
                key: index,
                username: row.email,
                email: row.username,
            })
        ))
        return (
            <Modal
                title="Manage Users"
                visible={this.props.showManageUsersModal}
                onOk={this.props.handleCancelManageUsersModal}
                onCancel={this.props.handleCancelManageUsersModal}
                >
                 <ConfirmationDialog
                    message="Are you sure you want to make this user a partner?"
                    show={this.state.show}
                    handleClose={this.hideModal}
                    handleAction={this.makePartner}
                    rightButtonTitle="YES">
                </ConfirmationDialog>
                <Table dataSource={tabelUsers} pagination={{ pageSize: 10 }}>
                    <Column title="Username" dataIndex="username"></Column>
                    <Column title="Email" dataIndex="email"></Column>
                    <Column
                    title="Action"
                    key="action"
                    render={(text, tabelUsers) => (
                        <span>
                        <i className="fas fa-user" onClick={() => this.showModal(tabelUsers.key)} ></i>
                        <Divider type="vertical" />
                        <a href="javascript:;">Make a partner</a>
                        </span>
                    )}
                 />
                </Table>
        </Modal>
        )
    }
}

export default ManageUsersModal;
