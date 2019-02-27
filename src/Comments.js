import React from "react";
import "./Comments.css";
import { getComments } from "./Abstract";
import CommentGroup from "./CommentGroup";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      loading: true,
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
    getComments(this.props.match.params.projectId, this.props.match.params.branchId)
      .then(comments => {
        const parentComments = comments.filter(this.filterByParentId);

        this.setState({
          comments: parentComments,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.branchId !== prevProps.match.params.branchId) {
      this.setComments();
    }
  }

  componentDidMount() {
    this.setComments();
  }

  render() {
    const { match, location, history } = this.props;

    if (this.state.comments) {
      return (
        <div className="Comments">
          <h3>Project: {this.props.match.params.projectId}</h3>
          <h3>Branch: {this.props.match.params.branchId}</h3>
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
