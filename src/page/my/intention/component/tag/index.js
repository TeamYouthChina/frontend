import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import classes from './index.module.css';
import {languageHelper} from '../../../../../tool/language-helper';
import {deleteHttp} from '../../../../../tool/api-helper';

class TagReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      hover:false,
      modal1:false
    };
    // i18n
    this.text = TagReact.i18n[languageHelper()];
    // style
    
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onMouseEnter(){
    this.setState({
      hover: true,
    });
  }

  onMouseLeave(){
    this.setState({
      hover: false,
    });
  }
  toggle = nr => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  render() {
    // // if(this.props.isFinish){
    // //   let body={
    // //     label_code:this.props.tag,
    // //     target_id:13,
    // //     target_type:100
    // //   };
    // //   this.props.submit(body);
    // }
    return (
      <div
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.state.hover?(
          <div className={`${classes.type2} d-flex` }>
            <div className="mr-2">
              {this.props.tag}
            </div>
            <div>
              <MDBIcon  
                icon="times"
                onClick={()=>{
                  if (this.props.length===1) {
                    this.setState({
                      modal1:true
                    });
                  }
                  else {
                    deleteHttp(`/labels/${this.props.label_code}/100/${localStorage.getItem('id')}`).then(()=>{
                      this.props.fresh();
                    });}
                }}
              />
            </div>
          </div>
        ):(
          <div className={classes.type1}>
            {this.props.tag}
          </div>
        )}
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="sm" centered>
          <MDBModalHeader toggle={this.toggle(1)}>提示</MDBModalHeader>
          <MDBModalBody>
            <h6>您必须保留至少一个标签</h6>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" size="sm" onClick={this.toggle(1)}>关闭</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        
      </div>
    );
  }
}

TagReact.i18n = [
  {},
  {}
];

TagReact.propTypes = {
  // self
  id:PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  label_code: PropTypes.string.isRequired,
  isFinish:PropTypes.bool.isRequired,
  fresh:PropTypes.func.isRequired,
  length:PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Tag = withRouter(TagReact);
