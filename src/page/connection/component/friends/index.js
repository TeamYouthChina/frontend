import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {Link} from 'react-router-dom';
import roundedFigure from '../../assets/roundedFigure.png';

export const FriendSideBar = (props) => (
  <div className={classes.friendCard}>
    <Link to="/video/create">
      <div className={classes.friendCardRow}>
        <img style={{height: '1.56vw', width: '2.81vw'}} src={roundedFigure} alt="figure" />
        好友 ({props.number[0]})
      </div>
    </Link>
    <Link to="/my/collection/company">
      <div className={classes.friendCardRow}>
        <img style={{height: '1.56vw', width: '2.81vw'}} src={roundedFigure} alt="figure" />
        公司 ({props.number[1]})
      </div>
    </Link>
  </div>
);

FriendSideBar.propTypes = {
  number: PropTypes.array.isRequired
};
