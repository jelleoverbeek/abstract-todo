import React from "react";
import "./Avatar.css";

class Avatar extends React.Component {
  render() {
    if (this.props.url) {
      return <img className="Avatar Avatar--24" src={this.props.url} alt={this.props.name} title={this.props.name} />;
    } else {
      return "";
    }
  }
}

export default Avatar;
