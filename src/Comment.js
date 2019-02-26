import React from "react";
import "./Comment.css";
import Avatar from "./Avatar";

class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        <form>
          <input type="checkbox" />
        </form>
        <div>
          <header>
            <Avatar userId={this.props.comment.userId} />
            <address rel="author">{this.props.comment.user.name}</address>
            <time dateTime={this.props.date}>&nbsp;—&nbsp;{this.props.comment.createdAt}</time>
          </header>
          <p>{this.props.comment.body}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
