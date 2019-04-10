import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';

class SimilarJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = SimilarJobReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div className={classes.content}>
        <p className={classes.name}>相似职位</p>
        <br/>
        <p className="h1 red-text">相似职位API没有</p>
      </div>
    );
  }
}

SimilarJobReact.i18n = [
  {},
  {}
];

SimilarJobReact.propTypes = {
  
};

export const SimilarJob = withRouter(SimilarJobReact);
