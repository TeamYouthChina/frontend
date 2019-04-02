import React from 'react';
import {MDBNavbarNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
            <MDBNavItem className="align-middle">
              <MDBNavLink to="/login">登 录</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </div>
        <MDBNavbarNav right>
          <MDBNavItem className="mx-2 align-middle">
            <MDBNavLink to="/register">注 册</MDBNavLink>
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

export const SignedOut = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(SignedOutReact));
