import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Main.css";
import SideMenu from "./SideMenu";
import Comments from "./Comments";
import EmptyState from "./EmptyState";
import Project from "./Project";
import Preview from "./Preview";

class Main extends Component {
  render() {
    return (
      <div className="splitview">
        <SideMenu />
        <main>
          <Switch>
            <Route path="/project/:projectId/branch/:branchId" component={Comments} />
            <Route exact path="/project/:projectId" component={Project} />
            <Route exact path="" component={EmptyState} />
          </Switch>
          <Route path="/project/:projectId/branch/:branchId/layer/:layerId" component={Preview} />
        </main>
      </div>
    );
  }
}

export default Main;
