import React from 'react';
import {MDBCol, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {SignedIn} from './signed-in';
import {SignedOut} from './signed-out';
import classes from './index.module.css';
import {isLogin} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';

class HeaderReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      collapseID: 'discover',
      chosen: 0,
      hover: 0,
      login: null
    };
    // i18n
    this.text = HeaderReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div>
        <div>
          <MDBNavbar
            dark
            expand="md"
            fixed="top"
            scrolling
            style={{background: '#31394D'}}
          >
            <MDBCol
              className={classes.yc}
              md="1"
            >
              <MDBNavbarBrand href="/choice">
                职 道
              </MDBNavbarBrand>
            </MDBCol>
            <MDBCol md="2">
              <MDBNavbarNav>
                <MDBNavItem
                  onMouseEnter={
                    () => {
                      this.setState({
                        hover: 1
                      });
                    }
                  }
                  onMouseLeave={
                    () => {
                      this.setState({
                        hover: 0
                      });
                    }
                  }
                  style={this.props.location.pathname.indexOf('/job-for-you') > -1 || this.state.hover === 1 ? {borderBottom: '4px solid #FFFFFF'} : null}
                >
                  <MDBNavLink to="/job-for-you2">
                    职 位
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem
                  onMouseEnter={
                    () => {
                      this.setState({
                        hover: 2
                      });
                    }
                  }
                  onMouseLeave={
                    () => {
                      this.setState({
                        hover: 0
                      });
                    }
                  }
                  style={this.props.location.pathname.indexOf('/discovery') > -1 || this.state.hover === 2 ? {borderBottom: '4px solid #FFFFFF'} : null}
                >
                  <MDBNavLink to="/discovery">
                    探 索
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCol>
            <MDBNavbarNav
              left
              style={{width: '300px'}}
            >
              <div
                className="d-flex flex-row align-items-center"
                onClick={
                  () => {
                    this.props.history.push('/search');
                  }
                }
              >
                <div className="flex-fill">
                  <input
                    className="form-control disabled"
                    type="text"
                    placeholder="搜索"
                    aria-label="Search"
                  />
                </div>
                <div className="flex-fill align-self-center mx-3">
                  <MDBIcon
                    icon="search"
                    size="2x"
                    className="white-text"
                  />
                </div>
              </div>
            </MDBNavbarNav>
            <div className="d-flex flex-row">
              {
                isLogin() ? (
                  <SignedIn />
                ) : (
                  <SignedOut />
                )
              }
            </div>
          </MDBNavbar>
        </div>
        <div style={{height: '78px'}}>
        </div>
      </div>
    );
  }
}

HeaderReact.i18n = [
  {},
  {}
];

HeaderReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Header = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.initial.bodyClientWidth
    };
  }
)(HeaderReact));
