import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import heart from '../../assets/heart.svg';

export const CollectionCard = (props) => (
  <div
    className={classes.collectionSidebar}>
    <img src={heart} className={classes.collectionIcon} alt="icon" />
    <span className={classes.title}>我收藏的公司</span>
    <button className={classes.collectionBtn}>{props.number}</button>
  </div>
);

CollectionCard.propTypes = {
  number: PropTypes.number.isRequired
};
