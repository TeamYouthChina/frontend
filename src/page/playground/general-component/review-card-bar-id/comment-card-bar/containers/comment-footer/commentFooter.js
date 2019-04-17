import React from 'react';
import {MDBBtn, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

import ThumbUp from '../../../public/thumb-up.svg';
import Comment from '../../../public/comment.svg';
import classes from './index.module.css';

export const CommentFooter = React.memo((props) => (
  <React.Fragment>
    <MDBRow>
      <MDBBtn className={classes.btnStyle} flat>
        <img className={classes.imgStyle} src={ThumbUp} alt="agree" />
        <span onClick={props.onVote} className={props.evaluateStatus === 1 ? classes.spanStyleActive : classes.spanStyle}>{props.upvoteCount}个点赞</span>
      </MDBBtn>
      <MDBBtn className={classes.btnStyle2} onClick={props.onShowReply} flat>
        <img className={classes.imgStyle} src={Comment} alt="comment" />
        {props.replyText}
      </MDBBtn>
    </MDBRow>
  </React.Fragment>
));

CommentFooter.displayName = 'CommentFooter';

CommentFooter.propTypes = {
  onShowReply: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  replyText: PropTypes.string.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  addComments: PropTypes.func,
  evaluateStatus: PropTypes.number,
};
