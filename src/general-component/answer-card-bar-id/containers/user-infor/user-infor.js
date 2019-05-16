import React from 'react';
import PropTypes from 'prop-types';
import {MDBIcon, MDBRow} from 'mdbreact';
import classes from './index.module.css';
import braftEditor from 'braft-editor';

export const UserInfor = (props) => (
  <div>
    <MDBRow className={classes.mdbRow}>
      <div className={classes.title}>
        <img
          className={`rounded-circle ${classes.imgStyle}`}
          src={props.avatar.length > 10 ? props.avatar : 'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'}
          alt="user"
        />
        <span className={classes.user}>
          {props.user}
        </span>
        <span className={classes.description}>
          {props.description}
        </span>
      </div>
    </MDBRow>
    {props.isCollapsed ? (
      <div>
        {/*<span style={{color: '#3E4850', fontSize: '14px', ...basicFont}}>{this.state.backend.user}</span>:*/}
        <ul>
          {/*<li style={{color: '#8D9AAF', fontSize: '14px', ...props.liBasicNoLine, margin: '10px 0px'}}>*/}
          {/*预计阅读时间: {props.readingTime}分钟*/}
          {/*</li>*/}
          <li className={classes.short}>
            {props.short}
          </li>
          <li className={classes.showMore} onClick={props.handleSpanClick}>
            展开更多<MDBIcon style={{marginLeft: '0.391vw'}} icon="arrow-down" />
          </li>
        </ul>
      </div>
    ) : (
      <React.Fragment>
        <p className={classes.richText} dangerouslySetInnerHTML={{__html:props.content === '' ? braftEditor.createEditorState(props.content).toHTML() : braftEditor.createEditorState(JSON.parse(props.content).braftEditorRaw).toHTML()}} />
        <ul>
          <li className={classes.showMore} onClick={props.handleSpanClick}>
            收起<MDBIcon style={{marginLeft: '0.391vw'}} icon="arrow-up" />
          </li>
        </ul>
      </React.Fragment>)}
  </div>
);

UserInfor.propTypes = {
  // self-data
  user: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  // readingTime: PropTypes.number.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  short: PropTypes.string.isRequired,
  // func
  handleSpanClick: PropTypes.func.isRequired,

};

export default UserInfor;
