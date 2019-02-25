import React from "react";
import "./Button.css";
import "./MenuItem.css";
import Avatar from "./Avatar";

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <button className="MenuItem">
          <span>{this.props.name}</span>
          <Avatar userId={this.props.userId} />
        </button>
      </li>
    );
  }
}

export default MenuItem;
