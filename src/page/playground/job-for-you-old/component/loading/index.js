import React from 'react';
import classes from './index.module.css';

export const Loading = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <p className={classes.content}>Loading ...</p>
    </div>
  );
};
