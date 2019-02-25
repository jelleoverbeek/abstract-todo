import React from "react";
import "./Header.css";
import IconButton from "./IconButton";

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <IconButton text="Sync" />
        <IconButton text="Settings" />
      </header>
    );
  }
}
export default Header;
