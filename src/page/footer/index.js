import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';

export class FooterReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = FooterReact.i18n[languageHelper()];
  }

  render() {
    return (
      <footer
        className={classes.footerBackGround}
      >
        <div className="cell-wall">
          <div className="cell-membrane">
            <div
              style={{backgroundColor: '#31394D'}}
              className={classes.footer}
            >
              <span className={classes.footerCopyright}>&copy; {new Date().getFullYear()} Copyright:{' '}</span>
              <a className={classes.footerLink} href="http://weyouth.co/">weyouth.co</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

FooterReact.i18n = [
  {},
  {}
];

FooterReact.propTypes = {
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Footer = withRouter(FooterReact);
