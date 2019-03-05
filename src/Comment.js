import React from "react";
import "./Comment.css";
import Avatar from "./Avatar";
import abstractLogo from "./img/abstract-logo.svg";
var db = window.require("diskdb");
db = db.connect("./src/db", ["comments"]);

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "active"
    };
  }

  abstractCommentLink(comment) {
    return `https://app.goabstract.com/projects/${comment.projectId}/branches/${comment.branchId}/commits/${comment.commitSha}/files/${comment.fileId}/layers/${
      comment.layerId
    }?commentId=${comment.id}`;
  }

  findComment(query) {
    const comment = db.comments.findOne(query);

    if (comment) {
      return comment;
    }
    return "Comment not found";
  }

  saveComment(commentId, doneStatus) {
    const commentObj = {
      id: commentId,
      status: doneStatus
    };

    const query = {
      id: commentObj.id
    };

    const comment = this.findComment(query);

    if (comment === "Comment not found") {
      db.comments.save(commentObj);
    } else {
      db.comments.update(query, commentObj);
    }
  }

  getCommentStatus(commentId) {
    const comment = this.findComment({ id: commentId });

    if (comment !== "Comment not found") {
      return comment.status;
    } else {
      return "active";
    }
  }

  handleClick(e, _this) {
    const commentId = _this.props.comment.id;

    if (e.target.checked) {
      _this.saveComment(commentId, "done");

      _this.setState({
        status: "done"
      });
    } else {
      _this.saveComment(commentId, "active");

      _this.setState({
        status: "active"
      });
    }
  }

  isDone() {
    if (this.getCommentStatus(this.props.comment.id) === "done") {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.setState({
      status: this.getCommentStatus(this.props.comment.id)
    });
  }

  render() {
    return (
      <div className="Comment">
        <form>
          <input type="checkbox" defaultChecked={this.isDone()} onClick={e => this.handleClick(e, this)} />
        </form>
        <div>
          <header>
            <Avatar userId={this.props.comment.userId} />
            <address rel="author">{this.props.comment.user.name}</address>
            <time dateTime={this.props.date}>&nbsp;—&nbsp;{this.props.comment.createdAt}</time>
          </header>
          <p>{this.props.comment.body}</p>
        </div>
        <div className="actions">
          <a target="_blank" rel="noopener noreferrer" href={this.abstractCommentLink(this.props.comment)}>
            <img src={abstractLogo} />
          </a>
        </div>
      </div>
    );
  }
}

export default Comment;
