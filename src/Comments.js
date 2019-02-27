import React from "react";
import "./Comments.css";
import { getProject, getBranch, getComments } from "./Abstract";
import CommentGroup from "./CommentGroup";
import Avatar from "./Avatar";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentsLoading: true,
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
        const parentComments = comments.filter(this.filterByParentId);

        this.setState({
          // comments: [...this.state.comments, parentComments],
          comments: parentComments,
          commentsLoading: false
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
        console.log(project[0]);
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
        console.log(branch);
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
            <h2>{this.state.branch.name}</h2>
            <p className="author">
              <Avatar userId={this.state.branch.userId} />
              {this.state.branch.userName}
            </p>
          </header>
          <ul>
            {this.state.comments.map((comment, index) => {
              return <CommentGroup key={index} comment={comment} />;
            })}
          </ul>
        </div>
      );
    } else {
      return <p>Loading comments...</p>;
    }
  }
}

export default Comments;
