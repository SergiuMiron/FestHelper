import React, { Component } from "react";
import "./input.scss";
import ErrorMessage from "../errorMessage/errorMessage";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const { id, name, value, onChange, onBlur, error } = this.props;


    return (
      <div className="form-group-items">
        <p className="section-label required">{name}</p>
        <div className="inputDiv">
          <input
            id={id}
            type="text"
            className={error !== "" ? "form-group-input names error-border" : "form-group-input names"}
            onBlur={onBlur}
            onChange={onChange}
            autoComplete="off"
            value={value}
            required
          />

          {error !== "" && <ErrorMessage message="Field must not be empty!" />}

        </div>
      </div>
    );
  }
}

export default Input;
