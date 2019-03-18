import React from "react";
import "./Comment.css";
import Avatar from "./Avatar";
import localforage from "localforage";
// import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { ReactComponent as AbstractLogo } from "./img/abstract-logo.svg";

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

  setActiveLayerRoute() {
    if (this.props.history) {
      this.props.history.push("/");
    }
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
      <Route
        render={({ history }) => (
          <div
            className="Comment"
            onClick={() => {
              const url = `/project/${this.props.comment.projectId}/branch/${this.props.comment.branchId}/file/${this.props.comment.fileId}/page/${
                this.props.comment.pageId
              }/layer/${this.props.comment.layerId}/sha/${this.props.comment.commitSha}/comment/${this.props.comment.id}`;
              history.push(url);
            }}
          >
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
                <AbstractLogo />
              </a>
            </div>
          </div>
        )}
      />
    );
  }
}

export default Comment;
