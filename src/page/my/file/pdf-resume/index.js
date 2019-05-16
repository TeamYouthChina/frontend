import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {FileCard} from '../card/file-card';
import UploadModal from './UploadModal/UploadModal';
import Shape from '../public/Shape.svg';

import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';

class PdfResumeReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      upload: false,
      upFile:null,
      // 单纯模拟key
      fileArray: [0, 1, 2, 3, 4],
    };
    // i18n
    this.text = PdfResumeReact.i18n[languageHelper()];
  }

  componentDidMount(){

  }

  onCreateResume = () => {
    this.setState({
      upload: true
    });
  };

  onQuitUpload = () => {
    this.setState({
      upload: false
    });
  };

  onFinishUpload = () => {
    this.setState({
      upload: false
    });
  };
  // 选择简历
  onSelect = (i) => {
    this.setState(()=>({
      upFile:i
    }));
  };
  // todo,提交简历          
  handleSubmit = () => {
    if(this.state.upFile === null){
      alert('at least one resume');
      return;
    }
    this.props.history.push('/applySuccess');
  };

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
          <div className="cell-membrane">
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
            <div className={classes.fileParent}>
              {this.state.fileArray.map((item, index)=>(
                <div className={classes.fileChild} key={item}>
                  <FileCard 
                    upFile={this.state.upFile} 
                    id={index} 
                    onSelect={this.onSelect}
                  />
                </div>
              ))}
            </div>
            <div className={classes.submitDiv}>
              <button className={classes.submitBtn} onClick={this.handleSubmit}>
                <img className={classes.ImgV} src={Shape} alt="sendFile" />
                {this.state.upFile === null ? '选择简历' : '提交简历' }
              </button>
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
