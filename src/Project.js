import React from "react";
import "./Project.css";

class Project extends React.Component {
  render() {
    return (
      <div className="Project">
        <h4>No branch selected</h4>
        <p className="paragraph--small">Select a branch to load comments</p>
      </div>
    );
  }
}

export default Project;
