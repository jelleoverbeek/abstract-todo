import React from "react";
import "./Preview.css";
import { getPreviewBlob, getFileInfo } from "./Abstract";
import Loader from "./Loader";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      previewBlob: null
    };
  }

  getActiveComment() {
    const commentString = localStorage.getItem("ACTIVE_COMMENT");
    const comment = JSON.parse(commentString);

    return comment;
  }

  setPreviewImg() {
    this.setState({
      loading: true
    });

    const comment = this.getActiveComment();

    getFileInfo(comment)
      .then(fileInfo => {
        getPreviewBlob(comment, fileInfo.lastChangedAtSha)
          .then(preview => {
            this.setState({
              previewBlob: preview,
              loading: false
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.setPreviewImg();
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.setPreviewImg();
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="Preview">
          <h4>Name</h4>
          <h6>Filename.sketch</h6>
          <img src={this.state.previewBlob} />
        </div>
      );
    } else {
      return (
        <div className="Preview">
          <Loader name="Preview" />
        </div>
      );
    }
  }
}

export default Preview;
