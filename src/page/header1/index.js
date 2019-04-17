import React from 'react';
import {MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavItem, MDBNavLink} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {SignedIn} from './signed-in';
//import {SignedOut} from './signed-out';
import classes from './index.module.css';
//import {isLogin} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';
import * as device from '../../tool/device-helper';

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
    switch (device.getType()) {
      case device.MOBILE:
        return null;
      case device.DESKTOP:
        return (
          <header>
            <MDBNavbar
              dark
              expand="md"
              fixed="top"
              className="d-flex justify-content-start align-items-center"
              style={{background: '#31394D'}}
            >
              <div className="cell-wall">
                <div className={`cell-membrane ${classes['header-flex']} align-items-center`}>
                  
                  <MDBNavbarBrand className={`py-2 ${classes.yc}`} href="/choice">
                    <MDBIcon className="mr-sm-2" icon="cubes" />
                    职 道
                  </MDBNavbarBrand>
                  
                  <ul className={`d-flex list-inline  pl-md-3 my-0 mr-auto ${classes.nav}`}>
                    <MDBNavItem
                      className={`${classes.navItem} list-inline-item mr-3`}
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
                      <MDBNavLink 
                        to="/job-for-you2"
                        style={this.state.hover===1?{color:'#FAFBFD'}:{color:'#C1C4CA'}}
                      >
                        职场社交
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem
                      className={`${classes.navItem} mr-3`}
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
                      <MDBNavLink 
                        to="/discovery"
                        style={this.state.hover===2?{color:'#FAFBFD'}:{color:'#C1C4CA'}}>
                        智慧招聘
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem
                      className={`${classes.navItem} list-inline-item mr-5`}
                      onMouseEnter={
                        () => {
                          this.setState({
                            hover: 3
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
                      style={this.props.location.pathname.indexOf('/job-for-you') > -1 || this.state.hover === 3 ? {borderBottom: '4px solid #FFFFFF'} : null}
                    >
                      <MDBNavLink 
                        to="/job-for-you2"
                        style={this.state.hover===3?{color:'#FAFBFD'}:{color:'#C1C4CA'}}
                      >
                        人 脉
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem 
                      className="ml-3 d-flex align-items-center"
                      onMouseEnter={
                        () => {
                          this.setState({
                            hover: 4
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
                    >
                      <MDBNavLink
                        to="/job-for-you2"
                        style={this.state.hover===1?{color:'#FAFBFD'}:{color:'#C1C4CA'}}
                      >
                        <div
                          className="d-flex align-items-center"
                          onClick={
                            () => {
                              this.props.history.push('/search');
                            }
                          }

                        >
                          {/*<input
                          className="form-control disabled mr-3"
                          type="text"
                          placeholder="搜索"
                          aria-label="Search"
                        />*/}
                          <MDBIcon
                            icon="search"
                            size="lg"
                            style={this.state.hover===4?{color:'#FAFBFD'}:{color:'#C1C4CA'}}
                          />
                        </div>
                      </MDBNavLink>
                     
                    </MDBNavItem>
                  </ul>
                  <ul className={`d-flex list-inline my-0 ml-auto ${classes.nav}`}>
                    <MDBNavItem className="ml-auto">
                      {/*<div className="d-flex flex-row">
                        {
                          isLogin() ? (
                            <SignedIn />
                          ) : (
                            <SignedOut />
                          )
                        }
                      </div>*/}
                      <div className="d-flex flex-row">
                       
                        <SignedIn />
                          
                      </div>
                    </MDBNavItem>
                  </ul>
                </div>
              </div>
            </MDBNavbar>
            <div
              style={{
                height: '4.08vw'
              }}
            >

            </div>
          </header>
        );
      default:
        return null;
    }
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
};

export const Header = withRouter(HeaderReact);
