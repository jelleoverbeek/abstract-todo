import React from "react";
import PrimaryButton from "./PrimaryButton";
import { BrowserRouter } from "react-router-dom";
import "./ApiToken.css";
import "./Button.css";

const { getCurrentWindow } = window.require("electron").remote;

function getApiToken() {
  return localStorage.getItem("ABSTRACT_TOKEN");
}

class ApiTokenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      redirect: false
    };
  }

  storeApiToken(event) {
    event.preventDefault();
    const token = event.target.querySelector(".api-token").value;
    localStorage.setItem("ABSTRACT_TOKEN", token);
    if (this.props.history) {
      this.props.history.push("/");
    }
    getCurrentWindow().reload();
  }

  componentDidMount() {
    this.setState({
      token: getApiToken()
    });
  }

  render() {
    return (
      <div className="container--small container--api-token">
        <h1>Let’s get you up and running</h1>
        <p className="subtitle">To load your Abstract projects the app needs an API token.</p>

        <div className="panel">
          <h3>1. Create an API token</h3>
          <p className="paragraph--small">Give the token a description. For example: Abstract To Do’s </p>
          <a target="_blank" className="button button--secondary" rel="noopener noreferrer" href="https://app.goabstract.com/account/tokens">
            Open Abstract and create token
          </a>
        </div>

        <div className="panel">
          <h3>2. Paste it here</h3>
          <p className="paragraph--small">The API token will be saved in locally. In your LocalStorage.</p>

          <form
            className="form--api-token"
            onSubmit={ev => {
              this.storeApiToken(ev, this);
            }}
          >
            <input className="input--big api-token" type="text" placeholder="Paste API token" defaultValue={getApiToken()} />
            <PrimaryButton text="Save" />
          </form>
        </div>
      </div>
    );
  }
}

export { getApiToken, ApiTokenForm };
