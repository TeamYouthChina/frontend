import React from 'react';
import PropTypes from 'prop-types';
import {languageHelper} from '../../../../tool/language-helper';
import classes from './index.module.css';

class LoadingReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = LoadingReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.spinner}>
              <div className={classes.cube1}></div>
              <div className={classes.cube2}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoadingReact.i18n = [
  {},
  {}
];

LoadingReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const LoadingComponent = LoadingReact;
