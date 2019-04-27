import React from 'react';
import {MDBBtn, MDBIcon, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import classes from './index.module.css';

const ReplyFooter = React.memo((props) => (
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
    </MDBRow>
  </React.Fragment>
));

ReplyFooter.displayName = 'ReplyFooter';

ReplyFooter.propTypes = {
  onVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  evaluateStatus: PropTypes.number,
  upvoteCount: PropTypes.number,
  downvoteCount: PropTypes.number,
};

export default ReplyFooter;
