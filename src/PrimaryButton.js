import React from "react";
import "./Button.css";
import "./PrimaryButton.css";

class PrimaryButton extends React.Component {
  render() {
    return <button className="button--primary button--big">{this.props.text}</button>;
  }
}

export default PrimaryButton;
