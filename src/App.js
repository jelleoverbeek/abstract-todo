import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { isConnected } from "./Abstract";
import "./App.css";
import Message from "./Message";
import Header from "./Header";
import Main from "./Main";
import { ApiTokenForm } from "./ApiToken";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abstractConnection: false,
      firstBoot: false,
      error: false,
      errorMessage: null
    };
  }

  isFirstBoot() {
    const apiToken = localStorage.getItem("ABSTRACT_TOKEN");
    if (apiToken === null) {
      this.setState({
        firstBoot: true
      });
    }
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
    const firstBoot = this.isFirstBoot();
    if (!firstBoot) {
      this.checkApiConnection();
    }
  }

  componentDidMount() {
    const firstBoot = this.isFirstBoot();
    if (!firstBoot) {
      this.checkApiConnection();
    }
  }

  render() {
    if (this.state.firstBoot) {
      return (
        <div className="container--small">
          <ApiTokenForm />
        </div>
      );
    } else if (this.state.error === "UnauthorizedError") {
      return (
        <div className="container--small">
          <Message type="error" text={this.state.errorMessage} />
          <ApiTokenForm />
        </div>
      );
    } else if (this.state.error) {
      return (
        <div className="container--small">
          <Message type="error" text={this.state.errorMessage} />
          <ApiTokenForm />
        </div>
      );
    } else {
      return (
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route
                path="/api-token/"
                render={() => {
                  return <ApiTokenForm title="Settings" />;
                }}
              />
              <Route path="/" component={Main} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
