import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBIcon} from 'mdbreact';
import classes from './index.module.css';

const Title = (props) => (
  <div className={classes.wrapper}>
    <Link  to={{
      pathname:`/question/${props.questionId}/answer/${props.answerId}`,
    }}>
      <strong className={classes.title}>{props.title}</strong>
    </Link>
    <MDBIcon className={classes.iconStyle} icon="ellipsis-h"/>
  </div>
  
);

Title.propTypes = {
  // self
  title: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  answerId: PropTypes.number.isRequired,
};

export default Title;
