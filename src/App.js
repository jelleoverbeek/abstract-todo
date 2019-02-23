import React, { Component } from "react";
import "./App.css";
import ApiTokenForm from "./ApiToken";
import Header from "./Header";
import ProjectsMenu from "./ProjectsMenu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ProjectsMenu />
        <div className="container--small">{/* <ApiTokenForm /> */}</div>
      </div>
    );
  }
}

export default App;
