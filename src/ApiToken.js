import React from "react";
import PrimaryButton from "./PrimaryButton";
import "./ApiToken.css";

class ApiTokenForm extends React.Component {
  render() {
    return (
      <div>
        <h2>API Token</h2>
        <p>
          To access your projects you need to create and supply an API token. You can do this by going to the{" "}
          <a target="_blank" href="https://app.goabstract.com/account/tokens">
            API Tokens
          </a>{" "}
          section in your Personal Settings of Abstract. The token will be stored locally. div.
        </p>
        <form className="form--api-token">
          <input className="input--big" type="text" placeholder="Paste token here" />
          <PrimaryButton text="Save" />
        </form>
      </div>
    );
  }
}

export default ApiTokenForm;
