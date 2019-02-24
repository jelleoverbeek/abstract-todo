import React from "react";
import "./Button.css";
import "./ProjectsMenu.css";
import Avatar from "./Avatar";

let db = window.require("diskdb");
db = db.connect("./src/db", ["projects", "branches"]);

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

class Project extends React.Component {
  render() {
    const branchesData = db.branches.find({ projectId: this.props.id });
    return (
      <div className="Project">
        <h6>{this.props.name}</h6>
        <ul>
          {branchesData.map((branch, index) => {
            return <MenuItem key={index} name={branch.name} userId={branch.userId} />;
          })}
        </ul>
      </div>
    );
  }
}

class ProjectsMenu extends React.Component {
  render() {
    const projectsData = db.projects.find();

    return (
      <aside className="ProjectsMenu">
        <h2>Projects</h2>
        {projectsData.map((project, index) => {
          return <Project key={index} name={project.name} id={project.id} />;
        })}
      </aside>
    );
  }
}

export default ProjectsMenu;
