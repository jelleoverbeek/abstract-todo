import React from "react";
import "./MenuItem.css";
import Avatar from "./Avatar";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import closeIcon from "./img/close-icon.svg";

class MenuItem extends React.Component {
  isProjectCloseLink() {
    return this.props.projectId && !this.props.branchId && this.props.projectActive;
  }

  isProjectLink() {
    return this.props.projectId && !this.props.branchId && !this.props.projectActive;
  }

  isBranchLink() {
    return this.props.projectId && this.props.branchId && !this.props.projectActive;
  }

  getRouteUrl() {
    const isProjectCloseLink = this.isProjectCloseLink();
    const isProjectLink = this.isProjectLink();
    const isBranchLink = this.isBranchLink();

    if (isProjectCloseLink) {
      return `/`;
    } else if (isProjectLink) {
      return `/project/${this.props.projectId}`;
    } else if (isBranchLink) {
      return `/project/${this.props.projectId}/branch/${this.props.branchId}`;
    }
  }

  renderAvatar() {
    if (this.isBranchLink()) {
      return <Avatar userId={this.props.userId} />;
    }
  }

  renderCloseIcon() {
    if (this.isProjectCloseLink()) {
      return <img src={closeIcon} />;
    }
  }

  render() {
    return (
      <NavLink to={this.getRouteUrl()} className="MenuItem" activeClassName="MenuItem--active">
        <span>{this.props.name}</span>
        {this.renderAvatar()}
        {this.renderCloseIcon()}
      </NavLink>
    );
  }
}

export default MenuItem;
