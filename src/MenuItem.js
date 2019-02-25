import React from "react";
import "./Button.css";
import "./MenuItem.css";
import Avatar from "./Avatar";
import { BrowserRouter as Link } from "react-router-dom";

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <Link to={`/project/${this.props.projectId}`}>
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
