import React, { Component } from "react";
import "./Button.css";
import "./IconButton.css";

class PrimaryButton extends React.Component {
  render() {
    return <button className="button--icon">{this.props.text}</button>;
  }
}

export default PrimaryButton;
