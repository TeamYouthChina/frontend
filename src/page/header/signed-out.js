import React from 'react';
import {MDBNavbarNav, MDBNavItem} from 'mdbreact';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';

class SignedOutReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = SignedOutReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div className="d-flex flex-row">
        <div className="flex-fill">
          <MDBNavbarNav>
            <MDBNavItem className={`${classes.mouse2} align-middle`}>
              登录
            </MDBNavItem>
          </MDBNavbarNav>
        </div>
        <MDBNavbarNav right>
          <MDBNavItem className={`${classes.mouse2} align-middle ml-3`}>
            注册
          </MDBNavItem>
        </MDBNavbarNav>
      </div>
    );
  }
}

SignedOutReact.i18n = [
  {},
  {}
];

SignedOutReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const SignedOut = withRouter(SignedOutReact);
