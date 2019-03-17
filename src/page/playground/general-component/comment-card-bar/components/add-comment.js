import React from 'react';
import {MDBAvatar, MDBBtn, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

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
      <MDBRow style={{margin: '0px', display: 'flex'}}>
        <MDBAvatar style={{height: '100%', margin: '6px 11px 6px 0px', flexGrow: '0'}}>
          <img
            style={{width: '32px', background: '#F4F4F4'}}
            src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
            alt=""
            className="rounded-circle"
          />
        </MDBAvatar>
        <div style={{marginTop: '5px', flexGrow: '1',}}>
          <input style={{
            width: '100%',
            background: '#FFFFFF',
            border: '1px solid #DBE5F7',
            boxSizing: 'border-box',
            borderRadius: '2px',
            padding: '8px 0px 8px 20px',
            fontSize: '14px',
            color: '#B3C1DB',
            height: '37px',
            ...this.props.basicFont,
          }} 
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
        <MDBBtn onClick={(e) => {
          e.stopPropagation();
          this.props.addComments(this.state.inputValue);
          this.setState({
            inputValue:''
          });
        }} flat style={{
          flexGrow: '0',
          background: '#C4C4C4',
          padding: '8px 20px',
          color: '#FFFFFF', ...this.props.basicFont,
          margin: '6px 6px 5px 6px',
        }}>
          发布
        </MDBBtn>
      </MDBRow>
    );
  }
}

AddComment.propTypes = {
  basicFont: PropTypes.object.isRequired,
  addComments: PropTypes.func.isRequired,
};
