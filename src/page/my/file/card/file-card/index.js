import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.css';
import logo from './logo.png';
import {languageHelper} from '../../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import {MobilePDFReader } from 'react-read-pdf';
import pdf from '../../pdf-resume/PdfReview/sample.pdf';
import {deleteHttp, getAsync} from '../../../../../tool/api-helper';


class FileCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal4: false,
      done:false,
    };
    // i18n
    this.text = FileCardReact.i18n[languageHelper()];
  }
  toggle = nr => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  async componentDidMount() {

    this.setState({
      backend: await getAsync(`/static/${this.props.fileId}`)
    });

  }

  render() {

    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ?(
      <div 
        className={classes.content}
        onClick={()=>{
          //this.props.history.push(`/my/collection/${this.props.url}`);
        }}
      >
        <div>
          <img 
            src={logo}
            style={{
              width:'6.8vw'
            }}
            className="img-fluid"
          />
        </div>
        <div className="ml-2">

          <div className={classes.title}>{this.props.name}</div>
          <div className={`${classes.text}`}>中文</div>

          {/*<div className={`mt-1 ${classes.text}`}>上次修改：2019年3月3号</div>*/}
          <div className="d-flex mt-3">
            <div 
              className={`${classes['blue-text']} mr-3`}
              onClick={this.toggle(4)}
              style={{cursor:'pointer'}}
            >
              预览
            </div>
            <div 
              className={`${classes['blue-text']} mr-3`}
            >
              导出
            </div>
            <div
              className={classes['blue-text']}
              onClick={()=>{
                deleteHttp(`/resumes/pdf/${this.props.id}`).then(()=>{
                  this.props.onFresh();
                });}
              }
            >
              删除
            </div>
          </div>
        </div>

        <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
          <MDBModalHeader toggle={this.toggle(4)}>我的简历</MDBModalHeader>
          <MDBModalBody style={{height:'78vw'}}>
            <div style={{padding:'5vw'}}>
              <MobilePDFReader url={pdf} style={{width:'55vw',boxSizing:'content-box',border:'white',borderShadow:'none'}}/>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(4)}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

      </div>
    ):null;
  }
}

FileCardReact.i18n = [
  {},
  {}
  
];

FileCardReact.propTypes = {
  // self
  id:PropTypes.number.isRequired,
  fileId:PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFresh:PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  language:PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const FileCard = withRouter(FileCardReact);

