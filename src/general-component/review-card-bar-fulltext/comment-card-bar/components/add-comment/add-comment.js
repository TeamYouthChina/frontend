import React from 'react';
import {MDBBtn, MDBRow} from 'mdbreact';
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
    this.textArea.addEventListener('compositionstart',()=>{
      this.isChinese = true;
    });
    this.textArea.addEventListener('compositionend',(e)=>{
      this.isChinese = false;
      this.handleInput(e);
    });
  }

  handleInput = (e) =>{
    if(this.state.leftCount > 0) {
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
        {/*<MDBAvatar className={classes.avatar}>*/}
        {/*<img*/}
        {/*src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}*/}
        {/*alt="user-avatar"*/}
        {/*className={`rounded-circle ${classes.imgStyle}`}*/}
        {/*/>*/}
        {/*</MDBAvatar>*/}
        <div className={classes.addComment}>
          <textarea
            ref={text => this.textArea = text}
            className={classes.inputStyle}
            placeholder="发表你的评论..."
            onKeyDown={this.handleInput}
            style={{maxlength:150}}
          />
          <div className={classes.countNum}>
            {this.state.leftCount}&nbsp;/&nbsp;150
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
