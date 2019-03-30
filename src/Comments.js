import React from "react";
import "./Comments.css";
import { getProject, getBranch, getComments } from "./Abstract";
import CommentGroup from "./CommentGroup";
import Avatar from "./Avatar";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Loader from "./Loader";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentsLoading: true,
      commentAmount: 0,
      project: {},
      projectLoading: true,
      branch: {},
      branchLoading: true,
      error: null,
      projectId: null,
      branchId: null
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  filterByParentId(item) {
    if (item.parentId === null) {
      return true;
    }
    return false;
  }

  setComments() {
    const projectId = this.props.match.params.projectId;
    const branchId = this.props.match.params.branchId;

    getComments(projectId, branchId)
      .then(comments => {
        const commentAmount = comments.length;
        const parentComments = comments.filter(this.filterByParentId);

        this.setState({
          comments: parentComments,
          commentsLoading: false,
          commentAmount: commentAmount
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setProject() {
    const projectId = this.props.match.params.projectId;

    getProject(projectId)
      .then(project => {
        this.setState({
          project: project[0],
          projectLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setBranch() {
    const projectId = this.props.match.params.projectId;
    const branchId = this.props.match.params.branchId;

    getBranch(projectId, branchId)
      .then(branch => {
        this.setState({
          branch: branch,
          branchLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.projectId !== prevProps.match.params.projectId) {
      this.setState({
        branchLoading: true
      });
      this.setBranch();
    }

    if (this.props.match.params.branchId !== prevProps.match.params.branchId) {
      this.setState({
        commentsLoading: true
      });
      this.setBranch();
      this.setComments();
    }
  }

  componentDidMount() {
    this.setBranch();
    this.setComments();
  }

  render() {
    if (!this.state.commentsLoading && !this.state.branchLoading) {
      return (
        <div className="Comments">
          <header>
            <h2>
              {this.state.branch.name} <Avatar userId={this.state.branch.userId} />
            </h2>
            <p className="paragraph--small">{this.state.commentAmount} comments</p>
          </header>
          <ul>
            {this.state.comments.map((comment, index) => {
              return <CommentGroup key={index} comment={comment} />;
            })}
          </ul>
        </div>
      );
    } else {
      return <Loader name="comments" />;
    }
  }
}

export default Comments;
