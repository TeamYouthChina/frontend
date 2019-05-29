import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.css';
import logo from './logo.png';
import {languageHelper} from '../../../tool/language-helper';
import {withRouter} from 'react-router-dom';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import {deleteHttp, getAsync} from '../../../tool/api-helper';


class FileCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal1: false,
      modal2: false,
      done:false,
    };
    // i18n
    this.text = FileCardReact.i18n[languageHelper()];
  }
  toggle = nr => (e) => {
    // 阻止事件冒泡
    e.stopPropagation();
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
        className={this.props.ifActive ? classes.contentActive : classes.content}
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
          <div className={`d-flex mt-3 ${classes.upLayer}`}>
            <div 
              className={`${classes['blue-text']} mr-3`}
              onClick={this.toggle(1)}
              style={{cursor:'pointer'}}
            >
              预览
            </div>
            <div 
              className={`${classes['blue-text']} mr-3`}
            >
              <a href={this.state.backend.content} style={{color: '#4F65E1'}}>下载</a>
              
              
            </div>
            <div
              className={classes['blue-text']}
              onClick={this.toggle(2)}
            >
              删除
            </div>
          </div>
        </div>

        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg">
          <MDBModalHeader toggle={this.toggle(1)}>我的简历</MDBModalHeader>
          <MDBModalBody style={{height:'78vw'}} className="d-flex justify-content-center">
            <div style={{padding:'1vw 5vw'}}>
              {/*<MobilePDFReader url={pdf} style={{width:'55vw',boxSizing:'content-box',border:'white',borderShadow:'none'}}/>*/}
              <object
                style={{width:'60vw',height:'75vw'}}
                data={this.state.backend.content}
                type="application/pdf"
              >
                <embed 
                  src={this.state.backend.content} 
                  type="application/pdf" />
              </object>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" size="sm" onClick={this.toggle(1)}>关闭</MDBBtn>
            <MDBBtn color="primary"  size="sm">导出</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} centered size="sm">
          <MDBModalHeader toggle={this.toggle(2)}>提示</MDBModalHeader>
          <MDBModalBody>
          确定删除简历{this.props.name}么？
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn size="sm" color="secondary" onClick={this.toggle(2)}>关闭</MDBBtn>
            <MDBBtn size="sm" color="primary"
              onClick={()=>{
                deleteHttp(`/resumes/pdf/${this.props.id}`).then(()=>{
                  this.setState({
                    modal2:false
                  });
                  this.props.onFresh();
                  
                });}
              }     
            >
              删除
            </MDBBtn>
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
  ifActive:PropTypes.bool.isRequired,
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

