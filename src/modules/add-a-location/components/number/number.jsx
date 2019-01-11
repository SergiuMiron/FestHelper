import React, { Component } from "react";
import "./number.scss";

class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueForInput: this.props.value
    };

    this.decrementItem = this.decrementItem.bind(this);
    this.incrementItem = this.incrementItem.bind(this);
  }

  incrementItem({ target }) {
    const { id, max } = this.props;
    let currentValue = this.state.valueForInput;
    const incrementedValue =  currentValue < max ? currentValue + this.props.increment : max;
    

    this.setState(
      {
        valueForInput: incrementedValue
      },
      () => {
        this.props.handleChange(this.state.valueForInput, id);
      }
    );
  }

  decrementItem({ target }) {
    const { id, min } = this.props;

    let currentValue = this.state.valueForInput;
    const decrementedValue = currentValue > min ? currentValue - this.props.increment : min;
    this.setState(
      {
        valueForInput: decrementedValue
      },
      () => {
        this.props.handleChange(this.state.valueForInput, id);
      }
    );
  }

  handleNumberChange = ({ target }) => {
    const { id, min, max } = this.props;

    let value = parseInt(target.value);
    if (value < min) value = min;
    if (value > max) value = max;

    this.setState(
      {
        valueForInput: value
      },
      () => {
        this.props.handleChange(this.state.valueForInput, id);
      }
    );
  };

  handleNumberBlur = ({ target }) => {
    const { id } = this.props;
    let value = target.value;

    if (!value || value === undefined || value === "") {
      value = 0;
      this.setState(
        {
          valueForInput: value
        },
        () => {
          this.props.handleChange(this.state.valueForInput, id);
        }
      );
    } else {
      this.props.handleChange(this.state.valueForInput, id);
    }
  };

  render() {
    const { id, name, value, className } = this.props;

    return (
      <div className="form-group-items form-group-4-col">
        <p className="name-discipline">{name}</p>
        <div className="relative-wrapper">
          <i className="fas fa-minus" onClick={this.decrementItem} />
          <input
            id={id}
            type="number"
            className={"form-group-input " + className}
            onChange={this.handleNumberChange}
            value={value}
          />
          <i className="fas fa-plus" onClick={this.incrementItem} />
        </div>
      </div>
    );
  }
}

export default Number;
