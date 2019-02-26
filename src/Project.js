import React from "react";
import "./Project.css";
import { getBranches } from "./AbstractFunctions";
import MenuItem from "./MenuItem";

class Project extends React.Component {
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

  componentDidMount() {
    getBranches(this.props.id)
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

  render() {
    if (this.state.branches) {
      return (
        <div className="Project">
          <h6>{this.props.name}</h6>
          <ul>
            {this.state.branches.map((branch, index) => {
              return <MenuItem key={index} name={branch.name} userId={branch.userId} projectId={this.props.id} branchId={branch.id} />;
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="Project">
          <h6>{this.props.name}</h6>
          {this.loadingIndicator()}
          {this.errorHandler()}
        </div>
      );
    }
  }
}

export default Project;
