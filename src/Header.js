import React from "react";
import "./Header.css";
import IconButton from "./IconButton";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <Link to={`/api-token/`}>
          <IconButton text="Settings" />
        </Link>
      </header>
    );
  }
}
export default Header;
