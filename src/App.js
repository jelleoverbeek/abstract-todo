import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { ApiTokenForm } from "./ApiToken";
import { isConnected } from "./Abstract";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Comments from "./Comments";
import Message from "./Message";

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
        } else {
          console.log(response);
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
          <Message type="error" text={this.state.errorMessage} />
        </main>
      );
    } else {
      return (
        <div className="splitview">
          <SideMenu />
          <main>
            <Route path="/api-token/" component={ApiTokenForm} />
            <Route path="/project/:projectId/branch/:branchId" component={Comments} />
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
