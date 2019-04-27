import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import heart from '../../assets/heart.svg';
import {Link} from 'react-router-dom';

export const CollectionCard = (props) => (
  <Link
    to={{
      pathname: `/my/collection/${props.url}`,
    }}
  >
    <div
      className={classes.collectionSidebar}>
      <img src={heart} className={classes.collectionIcon} alt="icon" />
      <span className={classes.title}>我收藏的{props.collectionType}</span>
      <button className={classes.collectionBtn}>{props.number}</button>
    </div>
  </Link>
);

CollectionCard.propTypes = {
  collectionType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};
