import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {FileCard} from '../card-yuwei/file-card';
import UploadModal from './UploadModal/UploadModal';

import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';
import {get,getAsync} from '../../../../tool/api-helper';


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

  async componentDidMount() {

    this.setState({
      backend: await getAsync(`/resumes/pdf/${localStorage.getItem('id')}`)
    });

  }

  onCreateResume = () => {
    this.setState({
      upload: true,
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
    get(`/resumes/pdf/${localStorage.getItem('id')}`).then((response)=>{
      this.setState({
        backend:response
      });
    });
  }
  onFresh = () => {
    get(`/resumes/pdf/${localStorage.getItem('id')}`).then((response)=>{
      this.setState({
        backend:response
      });
    });
  }
  render() {
    // console.log(this.state)
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    // console.log(this.state.backend)
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ?(
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

            <div
              className={classes['blue-text']}
              onClick={()=>{
                this.props.history.push('/my/file');
              }}
              style={{cursor:'pointer'}}
            >
              {'< '}我的文件
            </div>
            <div className="d-flex flex-wrap justify-content-between">
              {/*{this.state.backend.content.map((item, index) => {*/}
              {/*return (*/}
              {/*<div style={{marginBottom: '1vw'}} key={index}>*/}
              {/*<FileCard*/}
              {/*id={item.id}*/}
              {/*name={item.name}*/}
              {/*fileId={item.fileId}*/}
              {/*/>*/}
              {/*</div>*/}
              {/*);*/}
              {/*})}*/}
            </div>
            <div className="d-flex mt-3 justify-content-between">
              <FileCard
                id={this.state.backend.content.id}
                name={this.state.backend.content.name}
                fileId={this.state.backend.content.fileId}
                onFresh={this.onFresh}
              />
              <FileCard
                id={this.state.backend.content.id}
                name={this.state.backend.content.name}
                fileId={this.state.backend.content.fileId}
              />
              <FileCard
                id={this.state.backend.content.id}
                name={this.state.backend.content.name}
                fileId={this.state.backend.content.fileId}
              />
            </div>
          </div>
        </div>
      </div>
    ):(
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

            <div
              className={classes['blue-text']}
              onClick={()=>{
                this.props.history.push('/my/file');
              }}
              style={{cursor:'pointer'}}
            >
              {'< '}我的文件
            </div>
            <div className={classes.noresume}>新建一个简历吧！</div>
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
