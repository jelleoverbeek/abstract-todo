import React, { Component } from "react";
import "./Header.css";
import IconButton from "./IconButton";

class Header extends React.Component {
  render() {
    return (
      <header>
        <IconButton text="Sync" />
        <IconButton text="Settings" />
      </header>
    );
  }
}
export default Header;
