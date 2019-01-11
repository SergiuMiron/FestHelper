import React, { Component } from "react";
import "./errorMessage.scss";

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    const { message } = this.props;

    return message ? (
      <span className="errorDate" id="errorStartTests">
        {message}
      </span>
    ) : null;
  }
}

export default ErrorMessage;
