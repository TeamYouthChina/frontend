import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
          <p className={classes.note}>
            {this.props.backend.content.note}
          </p>
          <br/>
          <p>
            <span className={classes.titlebolder}> 所属行业</span>
            <span className={classes.title}> 所属行业</span>
          </p>
          <br/>
          <p>
            <span className={classes.titlebolder}> 公司规模</span>
            <span className={classes.title}> 公司规模</span>
          </p>
          <br/>
          <p>
            <span className={classes.titlebolder}> 公司类型</span>
            <span className={classes.title}> 公司类型</span>
          </p>
          <br/>
          <p>
            <span className={classes.titlebolder}> 创立时间</span>
            <span className={classes.title}> 创立时间</span>
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
  
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const CompanyDesci = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(CompanyDescriReact));
