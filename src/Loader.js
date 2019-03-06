import React from "react";
import "./Loader.css";
import loaderImg from "./img/loader.svg";

class Loader extends React.Component {
  render() {
    return (
      <div className="Loader">
        <img src={loaderImg} /> Loading {this.props.name}...
      </div>
    );
  }
}

export default Loader;
