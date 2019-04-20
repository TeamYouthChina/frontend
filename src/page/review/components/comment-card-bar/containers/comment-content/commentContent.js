import React from 'react';
import PropTypes from 'prop-types';
import {MDBIcon} from 'mdbreact';
import classes from './index.module.css';

export const CommentContent = (props) => (
  <React.Fragment>
    <div>
      <span className={classes.userSpan}>
        {props.user}
      </span>
      <span className={classes.timeSpan}>
        {props.time}
      </span>
      <MDBIcon style={{float: 'right'}} icon="ellipsis-v" />
    </div>
    <p className={classes.contentRow}>
      {props.content}
    </p>
  </React.Fragment>
);

CommentContent.propTypes = {
  basicFont: PropTypes.object,

  user: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
