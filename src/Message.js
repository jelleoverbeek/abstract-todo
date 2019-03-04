import React from "react";
import "./Message.css";

class Message extends React.Component {
  messageType() {
    return "Message message--" + this.props.type;
  }

  render() {
    return <div className={this.messageType()}>{this.props.text}</div>;
  }
}

export default Message;
