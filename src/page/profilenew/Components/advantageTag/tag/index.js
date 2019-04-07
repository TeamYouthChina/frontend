import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';

export const Tag = (props) => {
  return (
    <button className={classes.btn}>
      {props.content}
    </button>
  );
};

Tag.propTypes = {
  content: PropTypes.string.isRequired
};
