import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Main.css";
import SideMenu from "./SideMenu";
import Comments from "./Comments";
import EmptyState from "./EmptyState";
import Project from "./Project";

class Main extends Component {
  render() {
    return (
      <div className="splitview">
        <SideMenu />
        <main>
          <Route path="/project/:projectId/branch/:branchId" component={Comments} />
          <Route exact path="/" component={EmptyState} />
          <Route exact path="/project/:projectId" component={Project} />
        </main>
      </div>
    );
  }
}

export default Main;
