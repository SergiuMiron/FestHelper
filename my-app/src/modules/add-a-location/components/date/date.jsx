import React, { Component, Fragment } from "react";
import "./date.scss";
import ErrorMessage from "../errorMessage/errorMessage";

class InputDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  render() {
    const {
      id,
      name,
      onChange,
      onBlur,
      className,
      min,
      errorMessage
    } = this.props;

    return (
      <Fragment>
        <label htmlFor={name} className="campaign-label">
          {name}
        </label>
        <div className="inputDiv">
          <input
            id={id}
            type="date"
            name={name}
            min={min}
            max="2099-01-01"
            className={
              errorMessage !== ""
                ? className + " error-border "
                : "campaign-input"
            }
            onChange={onChange}
            onBlur={onBlur}
          />
          {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
        </div>
        
      </Fragment>
    );
  }
}

export default InputDate;
