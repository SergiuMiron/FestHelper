import React, { Component } from 'react';
import { StyledConfirmationDialog } from './confirmation-dialog.style';
import Button from "../../common/button/button"

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
                        <Button title='CANCEL' size='Small' background='white' action= { this.props.handleClose }></Button>
                        <Button title={this.props.rightButtonTitle} size='Small' action={ this.props.handleAction}></Button>
                    </div>
                </section>
             </div>
            </StyledConfirmationDialog>
         );
    }
}
