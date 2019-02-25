import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import ApiTokenForm from "./ApiToken";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Comments from "./Comments";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="splitview">
            <SideMenu />
            <main>
              {/* <ApiTokenForm /> */}
              {/* <Comments branchName="Success celebration" /> */}
              <Route path="/api-token/" component={ApiTokenForm} />
              <Route path="/project/:projectId" component={Comments} />
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
