import React from 'react';
import PropTypes from 'prop-types';
import {MDBAvatar, MDBBtn, MDBIcon, MDBRow} from 'mdbreact';


const UserInfor = (props) => (
  <div>
    <MDBRow style={{margin: '10px 0px'}}>
      <MDBAvatar style={{height: '100%', margin: '6px 11px 6px 0px'}}>
        <img
          style={{width: '32px', background: '#F4F4F4'}}
          src={props.img}
          alt="123"
          className="rounded-circle"
        />
      </MDBAvatar>
      <ul style={{
        listStyle: 'none',
        padding: '0px',
        margin: '0px'
      }}>
        <li style={{
          listStyle: 'none',
          color: '#31394D',
          fontSize: '16px',
          ...props.basicFont
        }}>
          {props.user}
        </li>
        <li style={{
          listStyle: 'none',
          color: '#8D9AAF',
          fontSize: '14px',
          ...props.basicFont
        }}>
          {props.description}
          <MDBBtn disabled flat style={{
            background: '#F0F3FA',
            borderRadius: '8px',
            padding: '0px',
            margin: '0px',
            marginLeft: '15px',
            marginTop: '-4px',
            textAlign: 'center',
          }}>
            <span style={{
              margin: '1px 14px',
              fontSize: '12px',
              color: '#4F65E1', ...props.basicFont
            }}>
              {props.score}
            </span>
          </MDBBtn>
        </li>
      </ul>
    </MDBRow>

    {props.isCollapsed ? (
      <div>
        {/*<span style={{color: '#3E4850', fontSize: '14px', ...basicFont}}>{this.state.backend.user}</span>:*/}
        <ul style={props.ulBasicNoLine}>
          <li style={{color: '#8D9AAF', fontSize: '14px', ...props.liBasicNoLine, margin: '10px 0px'}}>
            预计阅读时间: {props.readingTime}分钟
          </li>
          <li style={{color: '#31394D', fontSize: '14px', ...props.liBasicNoLine, ...props.basicFont}}>
            {props.short}
          </li>
          <li onClick={props.handleSpanClick} style={{
            color: '#4F65E1',
            fontSize: '14px', ...props.liBasicNoLine, ...props.basicFont,
            margin: '10px 0px 0px 0px'
          }}>
            展开更多<MDBIcon style={{marginLeft: '5px'}} icon="arrow-down" />
          </li>
        </ul>

      </div>
    ) : (
      <span
        // dangerouslySetInnerHTML={{__html: props.editorState}}
        style={{color: '#31394D', fontSize: '14px', ...props.basicFont}}>
        123
      </span>

    )}
  </div>
);

UserInfor.defaultProps = {
  score: 5,
  user: '齐昊',
  description: 'weYouth负责人',
  basicFont: {
    fontFamily: 'PingFang SC',
    lineHeight: 'normal'
  }
};

UserInfor.propTypes = {
  // self-data
  score: PropTypes.number,
  user: PropTypes.string,
  description: PropTypes.string,
  readingTime: PropTypes.number,
  isCollapsed: PropTypes.bool,
  img: PropTypes.string,
  short: PropTypes.string,
  // func
  handleSpanClick: PropTypes.func,
  //style
  basicFont: PropTypes.object,
  editorState: PropTypes.object,
  liBasicNoLine: PropTypes.object,
  ulBasicNoLine: PropTypes.object,
  
};

export default UserInfor;
