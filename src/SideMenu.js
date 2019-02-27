import React from "react";
import "./SideMenu.css";
import { getAllProjects } from "./Abstract";
import Project from "./Project";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    getAllProjects()
      .then(projects => {
        // console.log(projects);
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
      <aside className="SideMenu">
        <h2>Projects</h2>
        {this.state.projects.map((project, index) => {
          return <Project key={index} name={project.name} id={project.id} />;
        })}
      </aside>
    );
  }
}

export default SideMenu;
