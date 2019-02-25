import React from "react";
import "./Comments.css";
import { getComments } from "./AbstractFunctions";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: "",
      name: ""
    };
  }

  componentDidMount() {
    if (this.props.userId) {
      getUser(this.props.userId)
        .then(user => {
          this.setState({
            avatarUrl: user.avatarUrl,
            name: user.name
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    if (this.props.userId) {
      return <img className="Avatar Avatar--24" src={this.state.avatarUrl} alt={this.state.name} title={this.state.name} />;
    } else {
      return "";
    }
  }
}

export default Avatar;
