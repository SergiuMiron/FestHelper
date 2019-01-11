import React from "react";
import { StyledButton } from "./button.style";

const Button = ({
  title = "",
  disabled,
  size,
  background,
  action = () => {}
}) => (
  <StyledButton
    type="button"
    disabled={disabled}
    size={size}
    background={background}
    className={`btn ${disabled ? "disabled" : ""}`}
    onClick={action}
  >
    {" "}
    {title}
  </StyledButton>
);

export default Button;
