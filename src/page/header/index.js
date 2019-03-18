import React from 'react';
import {MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavItem, MDBNavLink} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {SignedIn} from './signed-in';
import {SignedOut} from './signed-out';
import classes from './index.module.css';
import {isLogin} from '../../tool/api-helper';
import {getType} from '../../tool/device-helper';
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
            className="d-flex justify-content-start"
            style={{background: '#31394D'}}
          >
            {/*<MDBCol*/}
            {/*className={classes.yc}*/}
            {/*md="1"*/}
            {/*size="2"*/}
            {/*>*/}
            <MDBNavbarBrand className={`mx-sm-4 ${classes.yc}`} href="/choice">
              <MDBIcon className="mr-sm-2" icon="cubes" />
              {getType(this.props.bodyClientWidth) === 2 ? '职 道' : null}
            </MDBNavbarBrand>
            {/*</MDBCol>*/}
            {/*<MDBCol className="d-flex text-align-center" size="8" md="2">*/}
            <ul className={`d-flex list-inline  pl-md-3 my-0 mr-auto ${classes.nav}`}>
              <MDBNavItem
                className={`${classes.navItem} list-inline-item`}
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
                  {getType(this.props.bodyClientWidth) === 2 ? '职 位' : <MDBIcon icon="briefcase" />}
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem
                className={classes.navItem}
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
                  {getType(this.props.bodyClientWidth) === 2 ? '探 索' : <MDBIcon icon="globe-americas" />}
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem className="ml-3 d-flex align-items-center">
                {getType(this.props.bodyClientWidth) === 2 ?
                  <div
                    className="d-flex align-items-center"
                    onClick={
                      () => {
                        this.props.history.push('/search');
                      }
                    }
                  >
                    <input
                      className="form-control disabled mr-3"
                      type="text"
                      placeholder="搜索"
                      aria-label="Search"
                    />
                    <MDBIcon icon="search" size="lg" className="white-text" />
                  </div> :
                  <div
                    className="d-flex align-items-center"
                    onClick={
                      () => {
                        this.props.history.push('/search');
                      }
                    }
                  >
                    <MDBIcon icon="search" className="white-text" />
                  </div>
                }
              </MDBNavItem>
            </ul>
            <ul className={`d-flex list-inline my-0 ml-auto ${classes.nav}`}>
              <MDBNavItem className="ml-auto">
                <div className="d-flex flex-row">
                  {
                    isLogin() ? (
                      <SignedIn />
                    ) : (
                      <SignedOut />
                    )
                  }
                </div>
              </MDBNavItem>
            </ul>
            {/*</MDBCol>*/}
            {/*<MDBNavbarNav*/}
            {/*left*/}
            {/*style={{width: '300px'}}*/}
            {/*>*/}
            {/*<div*/}
            {/*className="d-flex flex-row align-items-center"*/}
            {/*onClick={*/}
            {/*() => {*/}
            {/*this.props.history.push('/search');*/}
            {/*}*/}
            {/*}*/}
            {/*>*/}
            {/*<div className="flex-fill">*/}
            {/*<input*/}
            {/*className="form-control disabled"*/}
            {/*type="text"*/}
            {/*placeholder="搜索"*/}
            {/*aria-label="Search"*/}
            {/*/>*/}
            {/*</div>*/}
            {/*<div className="flex-fill align-self-center mx-3">*/}
            {/*<MDBIcon*/}
            {/*icon="search"*/}
            {/*size="lg"*/}
            {/*className="white-text"*/}
            {/*/>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</MDBNavbarNav>*/}
          </MDBNavbar>
        </div>
        {
          getType(this.props.bodyClientWidth) === 1 ?
            <div style={{height: '55px'}}>
            </div> :
            <div style={{height: '80px'}}>
            </div>
        }
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
  location: PropTypes.object.isRequired,
  bodyClientWidth: PropTypes.object.isRequired
};

export const Header = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.initial.bodyClientWidth
    };
  }
)(HeaderReact));
