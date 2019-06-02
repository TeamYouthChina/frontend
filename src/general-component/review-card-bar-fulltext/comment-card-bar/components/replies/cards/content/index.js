import React from 'react';
import PropTypes from 'prop-types';
import {MDBRow} from 'mdbreact';
import classes from './index.module.css';

const ReplyContent = (props) => (
  <React.Fragment>
    <div>
      <span className={classes.userSpan}>
        {props.user.username}
      </span>
      <span className={classes.timeSpan}>
        {props.time}
      </span>
      {/*<MDBIcon style={{float: 'right'}} icon="ellipsis-v" />*/}
    </div>
    <MDBRow className={classes.contentRow}>
      {props.content}
    </MDBRow>
  </React.Fragment>
);

ReplyContent.propTypes = {
  user: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ReplyContent;
