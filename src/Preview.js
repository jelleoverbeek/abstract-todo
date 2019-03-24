import React from "react";
import "./Preview.css";
import { getPreviewBlob, getFileInfo, getLayerInfo, getComment } from "./Abstract";
import Loader from "./Loader";
import Message from "./Message";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fileName: null,
      layerName: null,
      layerWidth: null,
      layerHeight: null,
      isAnnotation: false,
      annotation: {
        y: null,
        x: null,
        width: null,
        height: null
      },
      annotationSquare: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
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

  setAnnotationState() {
    getComment(this.props.match.params.commentId)
      .then(commentInfo => {
        if (commentInfo.annotation) {
          this.setState({
            isAnnotation: true,
            annotation: commentInfo.annotation
          });
        } else {
          this.setState({
            isAnnotation: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  calcPercentage(amount, total) {
    return (amount / total) * 100;
  }

  setAnnotationSquare() {
    this.state.annotationSquare.left = this.calcPercentage(this.state.annotation.x, this.state.layerWidth);
    this.state.annotationSquare.right = 100 - this.calcPercentage(this.state.annotation.x + this.state.annotation.width, this.state.layerWidth);
    this.state.annotationSquare.top = this.calcPercentage(this.state.annotation.y, this.state.layerHeight);
    this.state.annotationSquare.bottom = 100 - this.calcPercentage(this.state.annotation.y + this.state.annotation.height, this.state.layerHeight);

    this.state.annotationSquare.left += "%";
    this.state.annotationSquare.right += "%";
    this.state.annotationSquare.top += "%";
    this.state.annotationSquare.bottom += "%";
  }

  renderAnnotation() {
    const style = {
      top: this.state.annotationSquare.top,
      right: this.state.annotationSquare.right,
      bottom: this.state.annotationSquare.bottom,
      left: this.state.annotationSquare.left
    };

    return <div className="annotation" style={style} />;
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
              layerName: layerInfo.name,
              layerWidth: layerInfo.width,
              layerHeight: layerInfo.height
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.annotation !== this.state.annotation || prevState.layerWidth !== this.state.layerWidth) {
      this.setAnnotationSquare();
    }

    if (prevProps.match.url !== this.props.match.url) {
      this.setAnnotationState();
      this.setPreviewImg(this.props);
    }
  }

  componentDidMount() {
    this.setAnnotationState();
    this.setPreviewImg(this.props);
  }

  render() {
    if (!this.state.loading && !this.state.errorMessage) {
      return (
        <div className="Preview">
          <h6 className="layer-name">{this.state.layerName}</h6>
          <span className="file-name">{this.state.fileName}.sketch</span>
          <a target="_blank" rel="noopener noreferrer" href={this.abstractCommentLink(this.props)} className="preview-link">
            <img src={this.state.previewBlob} />
            {this.state.isAnnotation ? this.renderAnnotation() : ""}
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
