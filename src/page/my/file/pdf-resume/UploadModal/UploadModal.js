import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from 'mdbreact';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';

// import { postAsync } from '../../../../../tool/api-helper';
import classes from './UploadModal.module.css';

export default class UploadModal extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      resumeName: '',
    };
  }

  onPressUpload = async () => {
    if(this.state.files.length === 0) {
      alert('你没有选择任何文件');
      return;
    }
    let theFile = new FormData();
    theFile.append('file', this.state.files[0]);
    const option = {
      method: 'POST',
      body: theFile,
      headers: new Headers({
        'x-authentication': Cookies.get('token'),
      }),
    };

    await fetch('http://test.zzc-tongji.com/api/v1/static', option)
      .then(response => response.json());
    // .catch(error => console.error('Error:', error));
    // .then(async response => {
    //   await postAsync('/resume/pdf', {resume: response.content, name: this.state.resumeName});
    // });
    this.props.finish();
  };

  onDrop = files => {
    this.setState({ files });
  };

  onPressCancel = () => {
    this.setState({
      files: [],
    });
    this.props.quit();
  };

  onResumeNameChange = newName => {
    // console.log(newName)
    this.setState({
      ...this.state,
      resumeName: newName,
    });
  };

  deleteFile = key => {
    let newFiles = this.state.files.filter(file => file.name !== key);
    this.setState({
      ...this.state,
      files: newFiles,
    });
  };

  render() {
    // console.log(this.state.files);

    const files = this.state.files.map(file => (
      <li key={file.name}>
        <p>
          {file.name} - {file.size} bytes{' '}
          <span
            onClick={() => {
              this.deleteFile(file.name);
            }}
          >
            删除
          </span>
        </p>
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
            <MDBInput
              label='给你的简历Î起个名吧!'
              outline
              getValue={this.onResumeNameChange}
            />
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className={classes.Container}>
                  <div {...getRootProps({ className: classes.Dropzone })}>
                    <input {...getInputProps()} />
                    <p>拖拽到此处或点击选择文件上传</p>
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
            <MDBBtn color='secondary' onClick={this.onPressCancel}>
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
  upload: PropTypes.bool,
};
