import React from 'react';
import {MDBBtn, MDBIcon, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import Comment from '../../../../public/comment.svg';
import classes from './index.module.css';

export const CommentFooter = React.memo((props) => (
  <React.Fragment>
    <MDBRow>
      <MDBBtn className={classes.btnStyle} flat>
        {props.evaluateStatus === 1 ? (
          <span
            onClick={props.onVote}
            className={classes.spanStyle}>
            <MDBIcon className={classes.imgStyle} icon="thumbs-up" />
            {props.upvoteCount}个点赞
          </span>
        ) : (
          <span
            onClick={props.onVote}
            className={classes.spanStyle}>
            <MDBIcon far className={classes.imgStyle} icon="thumbs-up" />
            {props.upvoteCount}个点赞
          </span>
        )}
      </MDBBtn>
      <MDBBtn className={classes.btnStyle} flat>
        {props.evaluateStatus === 2 ? (
          <span
            onClick={props.onDownVote}
            className={classes.spanStyle}>
            <MDBIcon className={classes.imgStyle} icon="thumbs-up" />
            {props.downvoteCount}个反对
          </span>
        ) : (
          <span
            onClick={props.onDownVote}
            className={classes.spanStyle}>
            <MDBIcon far className={classes.imgStyle} icon="thumbs-up" />
            {props.downvoteCount}个反对
          </span>
        )}
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
  onDownVote: PropTypes.func.isRequired,
  replyText: PropTypes.string.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  downvoteCount: PropTypes.number.isRequired,
  addComments: PropTypes.func,
  evaluateStatus: PropTypes.number,
};
