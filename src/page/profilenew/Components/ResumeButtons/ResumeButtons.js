import React from 'react';

import classes from './ResumeButtons.module.css';

const resumeButtons = () => {
  return (
    <div className={classes.ResumeButtons}>
      <button>upload pdf</button>
      <button>generate resume</button>
    </div>
  );
};

export default resumeButtons;
