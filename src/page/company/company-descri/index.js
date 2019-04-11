import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';

class CompanyDescriReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CompanyDescriReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div>
        <div className={classes.content}>
          <p className={classes.name}>
            概况
          </p>
          <br/>
          <pre className={classes.note}>
            {this.props.backend.content.note}
          </pre>
          <br/>
          <p>
            <span className={classes.titlebolder}> 所属行业</span>
            <span className={classes.title}> 所属行业</span>
          </p>
          
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

CompanyDescriReact.i18n = [
  {},
  {}
];

CompanyDescriReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CompanyDesci = withRouter(CompanyDescriReact);
