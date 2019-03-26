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
      <MDBRow style={{margin: '0', display: 'flex'}}>
        <MDBAvatar style={{height: '100%', margin: '.469vw .859vw .469vw 0'}}>
          <img
            style={{width: '2.5vw', background: '#F4F4F4'}}
            src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
            alt="123"
            className="rounded-circle"
          />
        </MDBAvatar>
        <div style={{marginTop: '.391vw', flexGrow: '1',}}>
          <input style={{
            width: '100%',
            background: '#FFFFFF',
            border: '0.078vw solid #DBE5F7',
            boxSizing: 'border-box',
            borderRadius: '.156vw',
            padding: '.624vw 0 .624vw 1.562vw',
            fontSize: '1.091vw',
            color: '#B3C1DB',
            height: '2.891vw',
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
          padding: '.625vw 1.562vw',
          color: '#FFFFFF', ...this.props.basicFont,
          margin: '.468vw 0 .391vw .468vw',
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
