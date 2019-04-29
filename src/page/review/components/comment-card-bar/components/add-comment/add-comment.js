import React from 'react';
import {MDBAvatar, MDBBtn, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import classes from './index.module.css';

export class AddComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftCount: 150
    };
    this.isChinese = false;
    this.maxLength = 150;
  }
  
  componentDidMount() {
    this.textArea.addEventListener('compositionstart',this.compositionstart);
    this.textArea.addEventListener('compositionend',this.compositionend);
  }
  
  componentDidUnmount() {
    this.textArea.removeEventListener('compositionstart',this.compositionstart);
    this.textArea.removeEventListener('compositionend',this.compositionend);
  }

  compositionstart = () =>{
    this.isChinese = true;
  }
  
  compositionend = (e) =>{
    this.isChinese = false;
    this.handleInput(e);
  }
  
  //截取150个字
  handleInput = (e) =>{
    if(this.state.leftCount > -1) {
      if(!this.isChinese){
        let count = this.maxLength - e.target.value.length;
        this.setState(()=>({
          leftCount: count <= 0 ? 0 : count
        }));
      }
    } else {
      this.textArea.value = this.textArea.value.slice(0,150);
    }
  };

  submitComment = (e) => {
    e.stopPropagation();
    this.props.addComments(this.textArea.value);
    this.textArea.value = '';
  };

  render() {
    return (
      <MDBRow className={classes.mdbRow}>
        <MDBAvatar className={classes.avatar}>
          <img
            src={'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'}
            alt="user-avatar"
            className={`rounded-circle ${classes.imgStyle}`}
          />
        </MDBAvatar>
        <div className={classes.addComment}>
          <textarea
            ref={text => this.textArea = text}
            className={classes.inputStyle}
            placeholder="发表你的评论..."
            onKeyDown={this.handleInput}
            style={{maxlength:150}}
          />
          <div className={classes.countNum}>
            {this.state.leftCount}
          </div>
        </div>
        <MDBBtn className={classes.btnStyle} onClick={this.submitComment}>
          发布
        </MDBBtn>
      </MDBRow>
    );
  }
}

AddComment.propTypes = {
  addComments: PropTypes.func.isRequired,
};
