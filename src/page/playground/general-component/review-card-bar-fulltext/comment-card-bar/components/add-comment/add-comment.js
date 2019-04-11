import React from 'react';
import {MDBAvatar, MDBBtn, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import classes from './index.module.css';

export class AddComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    this.setState({
      inputValue: value
    });
  }

  render() {
    return (
      <MDBRow className={classes.mdbRow}>
        <MDBAvatar className={classes.avatar}>
          <img
            src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
            alt="user-avatar"
            className={`rounded-circle ${classes.imgStyle}`}
          />
        </MDBAvatar>
        <div className={classes.addComment}>
          <input className={classes.inputStyle}
            placeholder="发表你的评论..." 
            onChange={(e) => (this.handleInput(e))} value={this.state.inputValue} 
            onKeyDown={(e)=>{
              if(e.keyCode === 13) {
                e.stopPropagation();
                this.props.addComments(this.state.inputValue);
                this.setState({
                  inputValue:''
                });
              }
            }}
          />
        </div>
        <MDBBtn className={classes.btnStyle} onClick={(e) => {
          e.stopPropagation();
          this.props.addComments(this.state.inputValue);
          this.setState({
            inputValue:''
          });
        }}>
          发布
        </MDBBtn>
      </MDBRow>
    );
  }
}

AddComment.propTypes = {
  addComments: PropTypes.func.isRequired,
};
