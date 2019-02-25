import React from "react";
import "./Project.css";
import { getBranches } from "./AbstractFunctions";
import MenuItem from "./MenuItem";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: []
    };
  }

  componentDidMount() {
    getBranches(this.props.id)
      .then(branches => {
        console.log(branches);
        this.setState({
          branches: branches
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Project">
        <h6>{this.props.name}</h6>
        <ul>
          {this.state.branches.map((branch, index) => {
            return <MenuItem key={index} name={branch.name} userId={branch.userId} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Project;
