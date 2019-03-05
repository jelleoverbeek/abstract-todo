import React from "react";
import "./Avatar.css";
import { getUser } from "./Abstract";

var db = window.require("diskdb");
db = db.connect("./src/db", ["users"]);

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: "",
      name: ""
    };
  }

  findUser(userId) {
    const query = {
      id: userId
    };

    const user = db.users.findOne(query);

    if (user) {
      return user;
    }
    return false;
  }

  fetchUser(userId) {
    getUser(userId)
      .then(user => {
        db.users.save(user);

        this.setState({
          avatarUrl: user.avatarUrl,
          name: user.name
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (this.props.userId) {
      const user = this.findUser(this.props.userId);

      if (!user) {
        this.fetchUser(this.props.userId);
      } else {
        this.setState({
          avatarUrl: user.avatarUrl,
          name: user.name
        });
      }
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
