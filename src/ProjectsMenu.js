import React from "react";
import "./Button.css";
import "./ProjectsMenu.css";
import Avatar from "./Avatar";

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <button className="MenuItem">
          {this.props.name}
          <Avatar url={this.props.avatarUrl} name={this.props.author} />
        </button>
      </li>
    );
  }
}

class Project extends React.Component {
  render() {
    return (
      <div className="Project">
        <h6>{this.props.name}</h6>
        <ul>
          <MenuItem name="Success celebration" avatarUrl="https://jelle.im/assets/img/avatar@2x.png" author="Jelle Overbeek" />
          <MenuItem name="Success celebration" avatarUrl="https://jelle.im/assets/img/avatar@2x.png" author="Jelle Overbeek" />
          <MenuItem name="Master" />
        </ul>
      </div>
    );
  }
}

class ProjectsMenu extends React.Component {
  render() {
    return (
      <aside className="ProjectsMenu">
        <h2>Projects</h2>
        <Project name="My Listings" />
        <Project name="Cart" />
        <Project name="Cart" />
        <Project name="Cart" />
        <Project name="Cart" />
      </aside>
    );
  }
}

export default ProjectsMenu;
