import React from 'react';
import {MDBIcon} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

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
            <nav
              className="navbar fixed-top  d-flex justify-content-start align-items-center"
              style={{background: '#31394D'}}
            >
              <div className="cell-wall">
                <div className={`cell-membrane ${classes['header-flex']} align-items-center`}>
                  
                  <a className={`py-2 ${classes.yc} navbar-brand`} href="/choice">
                    <MDBIcon className="mr-sm-2" icon="cubes" />
                    职 道
                  </a>
                  
                  <ul className={`d-flex list-inline  pl-md-3 my-0 mr-auto ${classes.nav}`}>
                    <li
                      className={`${classes.navItem} nav-item list-inline-item mr-3`}
                    >
                      <a 
                        className="nav-link"
                        to="/job-for-you2"
                        
                      >
                        职场社交
                      </a>
                    </li>
                    <li
                      className={`${classes.navItem} mr-3 nav-item`}
                    >
                      <a
                        className="nav-link"  
                        to="/discovery"
                      >
                        智慧招聘
                      </a>
                    </li>
                    <li
                      className={`${classes.navItem} mr-3 nav-item`}
                    >
                      <a
                        className="nav-link"
                        to="/job-for-you2"
                      >
                        人 脉
                      </a>
                    </li>
                    <ul
                      className={`${classes.navItem} nav-item list-inline-item mr-2`}
                    >
                     
                    </ul>
                    <ul 
                      className="ml-3 d-flex nav-item align-items-center"
                    >
                      <a
                        className="nav-link"
                        to="/job-for-you2"
                        
                      >
                        <div
                          className="d-flex align-items-center"
                          onClick={
                            () => {
                              this.props.history.push('/search');
                            }
                          }

                        >
                         
                          <MDBIcon
                            icon="search"
                            size="lg"
                            style={this.state.hover===4?{color:'#FAFBFD'}:{color:'#C1C4CA'}}
                          />
                        </div>
                      </a>
                     
                    </ul>
                  </ul>
                  <ul className={`d-flex list-inline my-0 ml-auto ${classes.nav}`}>
                    <ul className="ml-auto nav-item">
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
                    </ul>
                  </ul>
                </div>
              </div>
            </nav>
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
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Header = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(HeaderReact));
