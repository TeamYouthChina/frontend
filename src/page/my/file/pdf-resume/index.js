import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {FileCard} from '../card/file-card';
import UploadModal from './UploadModal/UploadModal';

import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';

class PdfResumeReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      upload: false
    };
    // i18n
    this.text = PdfResumeReact.i18n[languageHelper()];
  }

  onCreateResume = () => {
    this.setState({
      upload: true
    });
  }

  onQuitUpload = () => {
    this.setState({
      upload: false
    });
  }

  onFinishUpload = () => {
    this.setState({
      upload: false
    });
  }


  render() {
    // console.log(this.state)
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall"
        >
          <div className="cell-membrane" style={{height:'40.6vw'}}>
            <UploadModal upload={this.state.upload} quit={this.onQuitUpload} finish={this.onFinishUpload}/>
            <div className="d-flex justify-content-between">
              <div className={classes.title}>简历</div>
              <div onClick={this.onCreateResume} className={classes.btn}>新建简历</div>
            </div>
           
            <div className={classes['blue-text']}>
              {'< '}我的文件
            </div>
            <div className="d-flex justify-content-between">
              <FileCard/>
              <FileCard/>
              <FileCard/>
            </div>
            <div className="d-flex mt-3 justify-content-between">
              <FileCard/>
              <FileCard/>
              <FileCard/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PdfResumeReact.i18n = [
  {},
  {}
];

PdfResumeReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const PdfResume = PdfResumeReact;
