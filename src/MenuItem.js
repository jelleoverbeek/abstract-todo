import React from "react";
import "./MenuItem.css";
import Avatar from "./Avatar";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class MenuItem extends React.Component {
  render() {
    return (
      <NavLink to={`/projects/${this.props.projectId}`} className="MenuItem" activeClassName="MenuItem--active">
        <span>{this.props.name}</span>
        <Avatar userId={this.props.userId} />
      </NavLink>
    );
  }
}

export default MenuItem;
