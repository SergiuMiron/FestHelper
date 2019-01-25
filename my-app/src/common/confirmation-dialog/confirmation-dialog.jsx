import React, { Component } from 'react';
import { StyledConfirmationDialog } from './confirmation-dialog.style';
import { Button } from 'antd';

export class ConfirmationDialog extends Component {
    
    render() { 
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

        return ( 
            <StyledConfirmationDialog >
                <div className={showHideClassName}>
                <section className="modal-main">
                    <i className="fas fa-times" onClick={this.props.handleClose}></i>
                    <p>{ this.props.message }</p>
                    <div className="flex-buttons">
                        <Button type="primary" size="small" onClick={this.props.handleClose}>CANCEL</Button>
                        <Button type="primary" size="small" onClick={this.props.handleAction}>LOGOUT</Button>
                    </div>
                </section>
             </div>
            </StyledConfirmationDialog>
         );
    }
}
