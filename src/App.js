import React, { Component } from "react";
import "./App.css";
// import ApiTokenForm from "./ApiToken";
import Header from "./Header";
import SideMenu from "./SideMenu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SideMenu />
        <div className="container--small">{/* <ApiTokenForm /> */}</div>
      </div>
    );
  }
}

export default App;
