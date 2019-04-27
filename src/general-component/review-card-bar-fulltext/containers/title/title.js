import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBIcon} from 'mdbreact';
import classes from './index.module.css';

const Title = (props) => (
  <div className={classes.wrapper}>
    <Link  to={{
      pathname:'/question/0/answer/0',
    }}>
      <strong className={classes.title}>{props.title}</strong>
    </Link>
    <MDBIcon className={classes.iconStyle} icon="ellipsis-h"/>
  </div>
  
);

Title.propTypes = {
  // self
  title: PropTypes.string.isRequired,
};

export default Title;
