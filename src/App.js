import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Main from "./Main";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
