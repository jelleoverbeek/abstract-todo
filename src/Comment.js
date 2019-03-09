import React from "react";
import "./Comment.css";
import Avatar from "./Avatar";
import abstractLogo from "./img/abstract-logo.svg";
import localforage from "localforage";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "active",
      checked: false
    };
  }

  abstractCommentLink(comment) {
    return `https://app.goabstract.com/projects/${comment.projectId}/branches/${comment.branchId}/commits/${comment.commitSha}/files/${comment.fileId}/layers/${
      comment.layerId
    }?commentId=${comment.id}`;
  }

  saveComment(commentId, status) {
    localforage.setItem(commentId, status).then(response => {});
  }

  setCommentStatus(commentId) {
    localforage.getItem(commentId).then(status => {
      if (status === "done") {
        this.setState({
          status: status,
          checked: true
        });
      } else {
        this.setState({
          status: "active",
          checked: false
        });
      }
    });
  }

  handleChange(e, _this) {
    const commentId = _this.props.comment.id;

    if (e.target.checked) {
      _this.saveComment(commentId, "done");

      _this.setState({
        status: "done",
        checked: true
      });
    } else {
      _this.saveComment(commentId, "active");

      _this.setState({
        status: "active",
        checked: false
      });
    }
  }

  componentDidMount() {
    this.setCommentStatus(this.props.comment.id);
  }

  render() {
    return (
      <div className="Comment">
        <form>
          <input type="checkbox" checked={this.state.checked} onChange={e => this.handleChange(e, this)} />
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
