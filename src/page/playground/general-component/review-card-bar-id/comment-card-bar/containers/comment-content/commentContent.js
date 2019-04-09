import React from 'react';
import PropTypes from 'prop-types';
import {MDBIcon, MDBRow} from 'mdbreact';
import classes from './index.module.css';

export const CommentContent = (props) => (
  <React.Fragment>
    <div>
      <span className={classes.userSpan}>
        {props.user}
      </span>
      <span className={classes.timeSpan}>
        {props.time}个月前
      </span>
      <MDBIcon style={{float: 'right'}} icon="ellipsis-v" />
    </div>
    <MDBRow className={classes.contentRow}>
      {props.content}
    </MDBRow>
  </React.Fragment>
);

CommentContent.propTypes = {
  basicFont: PropTypes.object,

  user: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};
