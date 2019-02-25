import React, { Component } from "react";
import "./App.css";
// import ApiTokenForm from "./ApiToken";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Comments from "./Comments";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="splitview">
          <SideMenu />
          <main>
            {/* <ApiTokenForm /> */}
            <Comments branchName="Success celebration" />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
