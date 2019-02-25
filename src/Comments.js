import React from "react";
import "./Comments.css";
import { getComments } from "./AbstractFunctions";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Comments extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {}

  render() {
    const { match, location, history } = this.props;

    return (
      <div className="Comments">
        {/* <h2>{this.props.branchName}</h2> */}
        <h3>{match.params.projectId}</h3>
        <ul>
          <Comment
            id="154815081580"
            author="Author"
            date="date"
            body="I think we can communicate that they have them already, at least for 10 min ;) That's also what we communicate in the next screen. My opinion is that we shouldn't approach this too literal but more encouraging, and emphasise on the emotion of the user a bit more."
          />
        </ul>
      </div>
    );
  }
}

export default Comments;
