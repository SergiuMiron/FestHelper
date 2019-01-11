import React, { Component } from 'react';

import './pop-up.style.scss';

class PopUp extends Component {

    constructor(props) {
        super(props)
        
        this.timer = null;

        this.state = {
            visible: true
        }

    }

    componentDidMount() {
        this.setTimer();
      }
    
      setTimer() {
        if (this.timer != null) {
            clearTimeout(this.timer)
        }
    
        this.timer = setTimeout(() =>{
            clearTimeout(this.timer)
            this.props.onClose();
            this.setState({ visible: false });
        }, this.props.delay);
      }
    
      componentWillUnmount() {
        clearTimeout(this.timer);
      }
    

    render() {
        this.fontAwesomeIcon = this.props.status === true ? "fa-check-circle" : "fa-times-circle"
        return (
            <div>
                 {this.state.visible ? 
                <div id="banner" className="banner">
                <div className="banner-container">
                    <i className={"fas " + this.fontAwesomeIcon}></i>
                    <span id="banner-text">{this.props.message}</span>
                </div>
            </div> 
            : null
            }
            </div>
        )
    }
}

PopUp.defaultProps = {
    message: "Default message"
}

export default PopUp;