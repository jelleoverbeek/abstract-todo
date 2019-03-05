import React from "react";
import PrimaryButton from "./PrimaryButton";
import "./ApiToken.css";

const { getCurrentWindow } = window.require("electron").remote;

function getApiToken() {
  return localStorage.getItem("ABSTRACT_TOKEN");
}

class ApiTokenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  storeApiToken(event) {
    event.preventDefault();
    const token = event.target.querySelector(".api-token").value;
    localStorage.setItem("ABSTRACT_TOKEN", token);
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

        <h3>
          1. Create and copy a token from{" "}
          <a target="_blank" href="https://app.goabstract.com/account/tokens" rel="noopener noreferrer">
            this page
          </a>
        </h3>
        <p className="paragraph--small">Give the token a description. For example: Abstract To Do’s </p>

        <h3>2. Paste it here</h3>
        <p className="paragraph--small">The API token will be saved in locally. In your LocalStorage.</p>

        <form className="form--api-token" onSubmit={this.storeApiToken}>
          <input className="input--big api-token" type="text" placeholder="Paste API token" />
          <PrimaryButton text="Save" />
        </form>
      </div>
    );
  }
}

export { getApiToken, ApiTokenForm };
