import React from "react";
import "./Button.css";
import "./ProjectsMenu.css";
import Avatar from "./Avatar";
import { getAllProjects, getBranches } from "./AbstractFunctions";

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
  constructor(props) {
    super(props);
    this.state = {
      branches: []
    };
  }

  componentDidMount() {
    getBranches(this.props.id)
      .then(branches => {
        console.log(branches);
        this.setState({
          branches: branches
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Project">
        <h6>{this.props.name}</h6>
        <ul>
          {this.state.branches.map((branch, index) => {
            return <MenuItem key={index} name={branch.name} userId={branch.userId} />;
          })}
        </ul>
      </div>
    );
  }
}

class ProjectsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    getAllProjects()
      .then(projects => {
        console.log(projects);
        this.setState({
          projects: projects
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <aside className="ProjectsMenu">
        <h2>Projects</h2>
        {this.state.projects.map((project, index) => {
          return <Project key={index} name={project.name} id={project.id} />;
        })}
      </aside>
    );
  }
}

export default ProjectsMenu;
