import React from 'react';
import {MDBIcon} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {SignedIn} from './signed-in';
import {SignedOut} from './signed-out';
import classes from './index.module.css';
import {isLogin} from '../../tool/api-helper';
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
                  
                  <a 
                    className={'py-2 navbar-brand'}
                    onClick={()=>{
                      this.props.history.push('/best-for-you');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    <img 
                      style={{height:'2.5vw'}}
                      src="https://frontendpic.oss-us-east-1.aliyuncs.com/1.png"
                      className="img-fluid"
                    />
                  </a>
                  
                  <ul className={`d-flex list-inline  pl-md-3 my-0 mr-auto ${classes.nav}`}>
                    <li
                      className={`${classes.navItem} nav-item list-inline-item mr-3`}
                    >
                      <a 
                        className="nav-link"
                        onClick={
                          () => {
                            this.props.history.push('/discovery');
                          }
                        }
                      >
                        职场社交
                      </a>
                    </li>
                    <li
                      className={`${classes.navItem} mr-3 nav-item`}
                    >
                      <a
                        className="nav-link"
                        onClick={
                          () => {
                            this.props.history.push('/job-for-you');
                          }
                        }
                      >
                        智慧招聘
                      </a>
                    </li>
                    <li
                      className={`${classes.navItem} mr-3 nav-item`}
                    >
                      <a
                        className="nav-link"
                        onClick={
                          () => {
                            this.props.history.push('/connection');
                          }
                        }                      >
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
                      {<div className="d-flex flex-row">
                        {
                          isLogin() ? (
                            <SignedIn />
                          ) : (
                            <SignedOut />
                          )
                        }
                      </div>}
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
  location: PropTypes.object.isRequired
};

export const Header = withRouter(HeaderReact);
