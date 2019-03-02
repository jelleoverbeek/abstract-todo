import React from "react";
import "./Project.css";
import Branches from "./Branches";
// import MenuItem from "./MenuItem";
import Avatar from "./Avatar";
import { BrowserRouter as Router, Route, NavLink, matchPath } from "react-router-dom";

// const renderMergedProps = (component, ...rest) => {
//   const finalProps = Object.assign({}, ...rest);
//   return React.createElement(component, finalProps);
// };

// const PropsRoute = ({ component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={routeProps => {
//         return renderMergedProps(component, routeProps, rest);
//       }}
//     />
//   );
// };

class Project extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeProject: false
  //   };
  // }

  setActive() {
    // <PropsRoute path="/project/:projectId/" component={Branches} projectId={this.props.project.id} />
    return <Branches projectId={this.props.project.id} />;
  }

  componentDidMount() {}

  render() {
    return (
      <li className="Project">
        {/* <NavLink
          to={`/project/${this.props.project.id}/`}
          className="MenuItem"
          activeClassName="MenuItem--active"
          onClick={event => {
            this.setActive();
          }}
        >
          <span>{this.props.branch.name}</span>
        </NavLink> */}
      </li>
    );
  }
}

export default Project;
