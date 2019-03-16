import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const Title = (props) => (
  <Link to={{
    pathname:'/question/0/answer/0',
  }}>
    <strong style={{color: '#31394D', fontSize: '18px', ...props.basicFont}}>{props.title}</strong>
  </Link>
);

Title.defaultProps = {
  title: '123',
  basicFont:{
    fontFamily: 'PingFang SC',
    lineHeight: 'normal'
  }
};

Title.propTypes = {
  // self
  title: PropTypes.string.isRequired,
  basicFont:PropTypes.object.isRequired,

};

export default Title;
