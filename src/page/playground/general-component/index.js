import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class GeneralComponentReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = GeneralComponentReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.space}>
              <p>answer-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>answer-card-bar-unauth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>article-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>company-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>header-2</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>job-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>review-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>review-card-bar-unauth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>user-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>user-card-square-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>video-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>video-card-bar-unauth</p>
              {/* insert component here */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GeneralComponentReact.i18n = [
  {},
  {}
];

GeneralComponentReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const GeneralComponent = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(GeneralComponentReact);
