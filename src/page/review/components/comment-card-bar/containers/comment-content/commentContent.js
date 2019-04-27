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
      <span onClick={props.onShowList} className={classes.iconSpan}>
        <MDBIcon icon="ellipsis-v" />
        {props.showList && (
          <ul onClick={props.onDeleteComment} className={classes.deleteUl}>
            <li>
              删除
            </li>
          </ul>
        )}
      </span>
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
  showList: PropTypes.bool.isRequired,
  onShowList: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};
