import React from 'react';
import PropTypes from 'prop-types';
import {MDBIcon, MDBRow} from 'mdbreact';
import classes from './index.module.css';

/**
 * @description 评论标题和编辑删除部分
 * */
export const CommentContent = React.memo((props) => (
  <React.Fragment>
    <div className={classes.wrapper}>
      <div>
        <span className={classes.userSpan}>
          {props.user}
        </span>
        <span className={classes.timeSpan}>
          {props.time}
        </span>
      </div>
      {String(props.userId) === window.localStorage.id && (
        <div onClick={props.onShowList} className={classes.iconStyle}>
          <MDBIcon icon="ellipsis-h" />
          {props.showList && (
            <ul className={classes.iconUl}>
              <li onClick={props.onGoDelete}>
                删除内容
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
    <MDBRow className={classes.contentRow}>
      {props.content}
    </MDBRow>

  </React.Fragment>
));
CommentContent.displayName = 'CommentContent';

CommentContent.propTypes = {
  basicFont: PropTypes.object,
  user: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  showList: PropTypes.bool.isRequired,
  onShowList: PropTypes.func.isRequired,
  onGoDelete: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
