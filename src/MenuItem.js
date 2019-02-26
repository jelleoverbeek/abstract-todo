import React from "react";
import "./Button.css";
import "./MenuItem.css";
import Avatar from "./Avatar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <Link to={`/comments/${this.props.projectId}/${this.props.branchId}`}>
          <button className="MenuItem">
            <span>{this.props.name}</span>
            <Avatar userId={this.props.userId} />
          </button>
        </Link>
      </li>
    );
  }
}

export default MenuItem;
