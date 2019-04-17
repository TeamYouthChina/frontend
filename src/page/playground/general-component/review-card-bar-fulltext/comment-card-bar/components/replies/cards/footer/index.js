import React from 'react';
import {MDBBtn, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

import ThumbUp from '../../../../../public/thumb-up.svg';
import classes from './index.module.css';

const ReplyFooter = React.memo((props) => (
  <React.Fragment>
    <MDBRow>
      <MDBBtn className={classes.btnStyle} flat>
        <img className={classes.imgStyle} src={ThumbUp} alt="agree" />
        <span 
          onClick={props.onVote} 
          className={props.evaluateStatus === 1 ? classes.spanStyleActive : classes.spanStyle}>
          {props.upvoteCount}个点赞
        </span>
      </MDBBtn>
    </MDBRow>
  </React.Fragment>
));

ReplyFooter.displayName = 'ReplyFooter';

ReplyFooter.propTypes = {
  onVote: PropTypes.func.isRequired,
  evaluateStatus: PropTypes.number,
  upvoteCount: PropTypes.number,
};

export default ReplyFooter;
