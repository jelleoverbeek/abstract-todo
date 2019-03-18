import React from "react";
import "./Preview.css";
import { getPreviewBlob, getFileInfo, getLayerInfo } from "./Abstract";
import Loader from "./Loader";
import Message from "./Message";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fileName: null,
      layerName: null,
      previewBlob: null,
      errorMessage: null
    };
  }

  abstractCommentLink(props) {
    const params = props.match.params;
    const comment = {
      projectId: params.projectId,
      branchId: params.branchId,
      fileId: params.fileId,
      pageId: params.pageId,
      layerId: params.layerId,
      commitSha: params.sha,
      id: params.commentId
    };

    return `https://app.goabstract.com/projects/${comment.projectId}/branches/${comment.branchId}/commits/${comment.commitSha}/files/${comment.fileId}/layers/${
      comment.layerId
    }?commentId=${comment.id}`;
  }

  setPreviewImg(props) {
    const params = props.match.params;
    const filterObj = {
      projectId: params.projectId,
      branchId: params.branchId,
      fileId: params.fileId,
      pageId: params.pageId,
      layerId: params.layerId,
      sha: params.sha
    };

    this.setState({
      loading: true
    });

    getFileInfo(filterObj)
      .then(fileInfo => {
        this.setState({
          fileName: fileInfo.name
        });

        getLayerInfo(filterObj)
          .then(layerInfo => {
            this.setState({
              layerName: layerInfo.name
            });

            getPreviewBlob(filterObj, layerInfo.lastChangedAtSha)
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
      })
      .catch(error => {
        let errorMessage = "";

        if (error.name === "NotFoundError") {
          errorMessage = "Preview not found, is this an activity comment?";
        } else {
          errorMessage = error.name;
        }

        this.setState({
          loading: false,
          errorMessage: errorMessage
        });

        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.setPreviewImg(this.props);
    }
  }

  componentDidMount() {
    this.setPreviewImg(this.props);
  }

  render() {
    if (!this.state.loading && !this.state.errorMessage) {
      return (
        <div className="Preview">
          <h6 className="layer-name">{this.state.layerName}</h6>
          <span className="file-name">{this.state.fileName}.sketch</span>
          <a target="_blank" rel="noopener noreferrer" href={this.abstractCommentLink(this.props)}>
            <img src={this.state.previewBlob} />
          </a>
        </div>
      );
    } else if (this.state.errorMessage) {
      return (
        <div className="Preview">
          <Message type="error" text={this.state.errorMessage} />
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
