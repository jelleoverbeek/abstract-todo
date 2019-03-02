import React from "react";
import "./Branches.css";
import { getBranches } from "./Abstract";
import MenuItem from "./MenuItem";

class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: null,
      loading: true,
      error: null
    };
  }

  loadingIndicator() {
    if (this.state.loading) {
      return <p>Loading branches...</p>;
    }
  }

  errorHandler() {
    if (this.state.error) {
      if (this.state.error.name === "NotFoundError") {
        return <p>No branches found</p>;
      }
    }
  }

  setBranches() {
    if (this.props.projectId) {
      this.setState({
        loading: true
      });

      getBranches(this.props.projectId)
        .then(branches => {
          this.setState({
            branches: branches,
            loading: false
          });
        })
        .catch(error => {
          this.setState({
            loading: false,
            error: error
          });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projectId !== this.props.projectId) {
      this.setBranches();
    }
  }

  componentDidMount() {
    this.setBranches();
  }

  render() {
    if (this.state.branches) {
      return (
        <ul className="Branches">
          {this.state.branches.map((branch, index) => {
            return <MenuItem key={index} name={branch.name} userId={branch.userId} projectId={this.props.projectId} branchId={branch.id} />;
          })}
        </ul>
      );
    } else {
      return (
        <div className="Branches">
          {this.loadingIndicator()}
          {this.errorHandler()}
        </div>
      );
    }
  }
}

export default Branches;
