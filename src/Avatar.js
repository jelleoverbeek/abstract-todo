import React from "react";
import "./Avatar.css";
import { getUser } from "./Abstract";
import localforage from "localforage";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: process.env.PUBLIC_URL + "/img/avatar.svg",
      name: ""
    };
  }

  saveUser(user) {
    if (user.avatarUrl.includes("d=404")) {
      user.avatarUrl = process.env.PUBLIC_URL + "/img/avatar.svg";
    }

    const string = JSON.stringify(user);
    localforage.setItem(user.id, string).then(() => {});
  }

  fetchUser(userId) {
    getUser(userId)
      .then(user => {
        this.saveUser(user);
        this.setState({
          avatarUrl: user.avatarUrl,
          name: user.name
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  findUser(userId) {
    localforage.getItem(userId).then(user => {
      user = JSON.parse(user);

      if (user) {
        this.setState({
          avatarUrl: user.avatarUrl,
          name: user.name
        });
      } else {
        this.fetchUser(userId);
      }
    });
  }

  setUser(userId) {
    this.findUser(userId);
  }

  componentDidMount() {
    if (this.props.userId) {
      this.setUser(this.props.userId);
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
