import React from "react";
import "./Loader.css";
import { ReactComponent as LoaderIcon } from "./img/loader.svg";

class Loader extends React.Component {
  render() {
    return (
      <div className="Loader">
        <LoaderIcon /> Loading {this.props.name}...
      </div>
    );
  }
}

export default Loader;
