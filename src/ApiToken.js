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
      <div className="container--small">
        <h2>API Token</h2>
        <p>
          To access your projects you need to create and supply an API token. You can do this by going to the{" "}
          <a target="_blank" href="https://app.goabstract.com/account/tokens" rel="noopener noreferrer">
            API Tokens
          </a>{" "}
          section in your Personal Settings of Abstract. The token will be stored locally. div.
        </p>
        <form className="form--api-token" onSubmit={this.storeApiToken}>
          <input className="input--big api-token" type="text" placeholder={this.state.token} />
          <PrimaryButton text="Save" />
        </form>
      </div>
    );
  }
}

export { getApiToken, ApiTokenForm };
