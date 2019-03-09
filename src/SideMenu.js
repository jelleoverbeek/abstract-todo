import React from "react";
import "./SideMenu.css";
import { getAllProjects } from "./Abstract";
import Branches from "./Branches";
import MenuItem from "./MenuItem";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      activeProjectId: null,
      activeProject: null
    };
  }

  setProjects() {
    getAllProjects()
      .then(projects => {
        this.setState({
          projects: projects
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setActive(project) {
    this.setState({
      activeProjectId: project.id,
      activeProject: project
    });
  }

  isProjectActive() {
    if (this.state.activeProjectId) {
      return true;
    }
    return false;
  }

  getActiveProjectId() {
    if (this.isProjectActive()) {
      return this.state.activeProjectId;
    }
    return null;
  }

  clearActiveProject() {
    this.setState({
      activeProjectId: null,
      activeProject: null
    });
  }

  renderProjectsList() {
    if (this.isProjectActive()) {
      return (
        <ul className="Projects">
          <li
            onClick={event => {
              this.clearActiveProject();
            }}
          >
            <MenuItem
              projectId={this.state.activeProject.id}
              name={this.state.activeProject.name}
              projectActive={true}
              projectColor={this.state.activeProject.color}
            />
          </li>
        </ul>
      );
    } else if (this.state.projects.length) {
      return (
        <ul className="Projects">
          {this.state.projects.map((project, index) => {
            return (
              <li
                key={index}
                onClick={event => {
                  this.setActive(project);
                }}
              >
                <MenuItem projectId={project.id} name={project.name} projectColor={project.color} />
              </li>
            );
          })}
        </ul>
      );
    }
  }

  renderBranchesList() {
    if (this.isProjectActive()) {
      return (
        <div className="Branches">
          <h3>Branches</h3>
          <Branches projectId={this.state.activeProjectId} />
        </div>
      );
    }
  }

  componentDidMount() {
    this.setProjects();
  }

  render() {
    return (
      <aside className="SideMenu">
        <h3>Projects</h3>
        {this.renderProjectsList()}
        {this.renderBranchesList()}
      </aside>
    );
  }
}

export default SideMenu;
