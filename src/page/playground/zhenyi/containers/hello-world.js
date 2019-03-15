import React from 'react';
import PropTypes from 'prop-types';

const HelloWorld = (props) => {
  // console.log(props)
  return (
    <p>{props.testValue}</p>
  );
	
};

HelloWorld.propTypes = {
  
  testValue: PropTypes.string.isRequired,
};

export default HelloWorld;
