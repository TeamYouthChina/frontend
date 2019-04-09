import React from 'react';
import {MDBBtn, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

import { AddComment } from '../../components/add-comment/add-comment';
import ThumbUp from '../../../public/thumb-up.svg';
import Comment from '../../../public/comment.svg';
import classes from './index.module.css';

export const CommentFooter = (props) => (
  <React.Fragment>
    <MDBRow style={props.stickyRow}>
      <MDBBtn className={classes.btnStyle} flat>
        <img className={classes.imgStyle} src={ThumbUp} alt="agree" />
        <span className={classes.spanStyle}>支持</span>
      </MDBBtn>
      <MDBBtn className={classes.btnStyle2} onClick={props.giveReplies} flat>
        <img className={classes.imgStyle} src={Comment} alt="comment" />
        {props.replyText}
      </MDBBtn>
    </MDBRow>
    {props.showGive ? (
      <AddComment
        addComments={props.addComments}
      />
    ) : null}
  </React.Fragment>
);


CommentFooter.propTypes = {
  giveReplies: PropTypes.func.isRequired,
  replyText: PropTypes.string.isRequired,
  addComments: PropTypes.func,
  showGive: PropTypes.bool.isRequired,
  stickyRow: PropTypes.object,
};
