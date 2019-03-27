import React from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';

class CompanyJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CompanyJobReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div className={classes.content}>
        <p className={classes.name}>在招职位</p>
        <br/>
        <p className="h1 red-text">该公司在招职位API没有</p>
      </div>
    );
  }
}

CompanyJobReact.i18n = [
  {},
  {}
];

CompanyJobReact.propTypes = {
  
};

export const CompanyJob = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(CompanyJobReact));
