import React from "react";
import "./Comment.css";
import Avatar from "./Avatar";

class Comment extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       comment: ""
  //     };
  //   }

  //   componentDidMount() {}

  render() {
    return (
      <li className="Comment">
        <form>
          <input type="checkbox" />
        </form>
        <div>
          <header>
            <Avatar userId={this.props.userId} />
            <address rel="author">{this.props.author}</address>
            <time datetime={this.props.date}>&nbsp;—&nbsp;{this.props.date}</time>
          </header>
          <p>{this.props.body}</p>
        </div>
      </li>
    );
  }
}

export default Comment;
