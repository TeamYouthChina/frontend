import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {Link} from 'react-router-dom';

export const InvitationSideBar = (props) => (
  <div className={classes.invitationCard}>
    <div className={classes.title}>
      邀请管理
    </div>
    <div className={classes.content}>
      {props.content}
    </div>
    <Link to="/">
      <div className={classes.manageAll}>
        管理全部邀请
      </div>
    </Link>
  </div>
);

InvitationSideBar.propTypes = {
  content: PropTypes.string.isRequired
};
