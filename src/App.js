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
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/api-token/" component={ApiTokenForm} />
              <Route path="/" component={Main} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
