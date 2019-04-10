import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import amazon from '../amazon.svg';
import classes from './index.module.css';
import {IfCollect} from '../if-collect';
import {languageHelper} from '../../../tool/language-helper';

class KnowCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = KnowCompanyReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div>
        <div className={classes.content}>
          <div className="d-flex justify-content-between">
            <div className={classes.name}>了解公司</div>
            <div> 
              <IfCollect/>
              <div className="red-text h6">API没有</div>
            </div>
          </div>
          <div>
            <img src={amazon}/>
            <span className={classes.company}>{this.props.backend.content.organization.name}</span>
          </div>
          <div className={classes.note}>{this.props.backend.content.organization.note}</div>
        </div>
        
      </div>
    );
  }
}

KnowCompanyReact.i18n = [
  {},
  {}
];

KnowCompanyReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const KnowCompany = withRouter(KnowCompanyReact);
