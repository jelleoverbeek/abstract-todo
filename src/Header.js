import React from "react";
import "./Header.css";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { ReactComponent as SettingsIcon } from "./img/settings-icon.svg";

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <Switch>
          <Route
            path="/api-token/"
            render={() => {
              return (
                <NavLink to={`/`} className="settings-icon icon--active">
                  <SettingsIcon />
                </NavLink>
              );
            }}
          />
          <Route
            path="/"
            render={() => {
              return (
                <NavLink to={`/api-token/`} className="settings-icon" activeClassName="icon--active">
                  <SettingsIcon />
                </NavLink>
              );
            }}
          />
        </Switch>
      </header>
    );
  }
}
export default Header;
