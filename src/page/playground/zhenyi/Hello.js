import React from 'react';
import classes from './public/cell-wall.module.css';
// import PropTypes from 'prop-types';

// 没有测试,添加了cell-wall

export const Hello = () => (
      
  <div
    className={classes['cell-wall']}
    style={{
      backgroundColor: 'cyan',
      borderStyle: 'dotted',
      borderWidth: '5px',
      lineHeight: '600px',
      marginBottom: '5px',
      height: '600px',
      textAlign: 'center'
    }}
  >
    <div
      className={classes['cell-membrane']}
      style={{
        backgroundColor: 'yellow'
      }}
    >
            cell: content
    </div>
  </div>
);