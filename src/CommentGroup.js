import React from "react";
import "./CommentGroup.css";
import { getComment } from "./AbstractFunctions";
import Comment from "./Comment";

class CommentGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childComments: null
    };
  }

  hasChildComments() {
    if (this.props.comment.replyIds.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    if (this.hasChildComments()) {
      const commentsArray = [];

      this.props.comment.replyIds.forEach(commentId => {
        getComment(commentId)
          .then(comment => {
            commentsArray.push(comment);

            this.setState({
              childComments: commentsArray
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }

  render() {
    if (this.state.childComments) {
      return (
        <li className="CommentGroup">
          <Comment comment={this.props.comment} />
          <ul>
            {this.state.childComments.map((comment, index) => {
              return <Comment key={index} comment={comment} />;
            })}
          </ul>
        </li>
      );
    } else {
      return (
        <li className="CommentGroup">
          <Comment comment={this.props.comment} />
        </li>
      );
    }
  }
}

export default CommentGroup;
