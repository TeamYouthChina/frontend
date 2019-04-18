import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';


import classes from './UploadModal.module.css';

export default class UploadModal extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  onPressUpload = () => {
    // console.log('上传到服务器！')
    this.props.finish();
  }

  onDrop = files => {
    this.setState({ files });
  };

  render() {
    // console.log(this.state.files);

    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <MDBContainer>
        <MDBModal
          size='lg'
          isOpen={this.props.upload}
          centered
          toggle={this.props.quit}
        >
          <MDBModalHeader toggle={this.props.quit}>
            请选择pdf上传
          </MDBModalHeader>
          <MDBModalBody>
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className={classes.Container}>
                  <div {...getRootProps({ className: classes.Dropzone })}>
                    <input {...getInputProps()} />
                    <p>
                      拖拽到此处或点击选择文件上传
                    </p>
                  </div>
                  <aside>
                    <h5>文件</h5>
                    <ul>{files}</ul>
                  </aside>
                </section>
              )}
            </Dropzone>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={this.props.quit}>
              取消
            </MDBBtn>
            <MDBBtn color='primary' onClick={this.onPressUpload}>
              确定上传
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

UploadModal.propTypes = {
  finish: PropTypes.func,
  quit: PropTypes.func,
  upload: PropTypes.bool
};
