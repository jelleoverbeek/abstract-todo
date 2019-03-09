import React from "react";
import "./EmptyState.css";

class EmptyState extends React.Component {
  render() {
    return (
      <div className="EmptyState">
        <h4>No project selected</h4>
        <p className="paragraph--small">Select a project to load branches</p>
      </div>
    );
  }
}

export default EmptyState;
