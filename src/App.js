import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { ApiTokenForm } from "./ApiToken";
import { isConnected } from "./Abstract";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Comments from "./Comments";
import Message from "./Message";
import EmptyState from "./EmptyState";
import Project from "./Project";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abstractConnection: false,
      error: false,
      errorMessage: null
    };
  }

  async checkApiConnection() {
    await isConnected()
      .then(response => {
        if (response.name === "UnauthorizedError") {
          this.setState({
            abstractConnection: false,
            error: response.name,
            errorMessage: response.message
          });
        } else if (response === "RateLimitError") {
          this.setState({
            abstractConnection: true,
            error: response.name,
            errorMessage: response.message
          });
        } else if (typeof response === "object" && response !== null) {
          this.setState({
            abstractConnection: false,
            error: response.name,
            errorMessage: response.message
          });
        } else {
          this.setState({
            abstractConnection: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    this.checkApiConnection();
  }

  componentDidMount() {
    this.checkApiConnection();
  }

  render() {
    if (this.state.error === "UnauthorizedError") {
      return (
        <main>
          <ApiTokenForm />
          <div className="container--small">
            <Message type="error" text={this.state.errorMessage} />
          </div>
        </main>
      );
    } else if (this.state.error) {
      return (
        <main>
          <div className="container--small">
            <Message type="error" text={this.state.errorMessage} />
            <ApiTokenForm />
          </div>
        </main>
      );
    } else {
      return (
        <div className="splitview">
          <SideMenu />
          <main>
            <Route path="/api-token/" component={ApiTokenForm} />
            <Route path="/project/:projectId/branch/:branchId" component={Comments} />
            <Route exact path="/" component={EmptyState} />
            <Route exact path="/project/:projectId" component={Project} />
          </main>
        </div>
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
