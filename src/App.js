import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { ApiTokenForm } from "./ApiToken";
import { isConnected } from "./Abstract";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Comments from "./Comments";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abstractConnection: false
    };
  }

  isApiTokenValid() {
    isConnected()
      .then(response => {
        if (response == "API Error") {
          console.error("API Error");
          this.setState({
            abstractConnection: false
          });
        } else {
          this.setState({
            abstractConnection: true
          });
          console.log("Connected!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.isApiTokenValid();
  }

  render() {
    if (this.state.abstractConnection) {
      return (
        <div className="splitview">
          <SideMenu />
          <main>
            <Route path="/api-token/" component={ApiTokenForm} />
            <Route path="/comments/:projectId/:branchId" component={Comments} />
          </main>
        </div>
      );
    } else {
      return (
        <main>
          <ApiTokenForm />
        </main>
      );
    }
  }
}

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
