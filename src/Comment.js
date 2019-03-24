import React from "react";
import "./Comment.css";
import Avatar from "./Avatar";
import localforage from "localforage";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { ReactComponent as AbstractLogo } from "./img/abstract-logo.svg";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "active",
      type: "",
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

  setCommentType() {
    if (this.props.comment.layerId && !this.props.comment.annotation) {
      this.setState({
        type: "layer"
      });
    } else if (this.props.comment.layerId && this.props.comment.annotation) {
      this.setState({
        type: "annotation"
      });
    } else {
      this.setState({
        type: "activity"
      });
    }
  }

  openInAbstractAction() {
    return (
      <a target="_blank" rel="noopener noreferrer" href={this.abstractCommentLink(this.props.comment)}>
        <AbstractLogo />
      </a>
    );
  }

  renderActions() {
    if (this.state.type === "layer" || this.state.type === "annotation") {
      return this.openInAbstractAction();
    }
  }

  setCommentClassName() {
    if (this.state.type === "layer") {
      return "Comment Comment--layer";
    } else if (this.state.type === "annotation") {
      return "Comment Comment--annotation";
    } else if (this.state.type === "activity") {
      return "Comment Comment--activity";
    }
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

  openPreviewLink() {
    if (this.state.type !== "activity") {
      // prettier-ignore
      const url = 
      `/project/${this.props.comment.projectId
      }/branch/${this.props.comment.branchId
      }/file/${this.props.comment.fileId
      }/page/${this.props.comment.pageId
      }/layer/${this.props.comment.layerId
      }/sha/${this.props.comment.commitSha
      }/commentId/${this.props.comment.id}`;

      return <NavLink to={url}>Open preview</NavLink>;
    }
  }

  componentDidMount() {
    this.setCommentType();
    this.setCommentStatus(this.props.comment.id);
  }

  render() {
    return (
      <Route
        render={({ history }) => (
          <div
            className={this.setCommentClassName()}
            onClick={() => {
              if (this.props.comment.fileId) {
                // prettier-ignore
                const url = 
                `/project/${this.props.comment.projectId
                }/branch/${this.props.comment.branchId
                }/file/${this.props.comment.fileId
                }/page/${this.props.comment.pageId
                }/layer/${this.props.comment.layerId
                }/sha/${this.props.comment.commitSha
                }/commentId/${this.props.comment.id}`;

                history.push(url);
              }
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
                {this.state.type === "activity" ? <span className="Comment-type">&nbsp;—&nbsp;Activity comment</span> : ""}
              </header>
              <p>{this.props.comment.body}</p>
            </div>
            <div className="actions">{this.renderActions()}</div>
          </div>
        )}
      />
    );
  }
}

export default Comment;
