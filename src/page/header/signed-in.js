import React from 'react';
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavItem
} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as deviceHelper from '../../tool/device-helper';
import {languageHelper} from '../../tool/language-helper';
import classes from './index.module.css';

class SignedInReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      hover:0
    };
    // i18n
    this.text = SignedInReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div className="d-flex flex-row">
        <div className="flex-fill align-self-center">
          <ul
            className="mr-1 d-flex navbar-nav"
          >
            <ul className="d-flex nav-item align-items-center mr-1">
              <div className="d-flex align-items-center">
                <MDBIcon
                  icon="user-friends"
                  style={{color:'#C1C4CA'}}
                  
                  className="mr-2"
                />
                <div
                  className={classes.mouse2}
                >
                  好友
                </div>
                
                <ul className="d-flex nav-item align-items-center">

                  <MDBIcon
                    icon="envelope"
                    style={{color:'#C1C4CA'}}
                    className="mr-2"
                  />
                  <div
                    style={{
                      fontFamily:'PingFang SC',
                      fontSize:'1.25vw',
                      color:'#C1C4CA'
                    }}
                  >消息</div>
                </ul></div>
              <div>
                
              </div>
            </ul>
            
           
            
          </ul>
        </div>
        <ul
          className="navbar-nav"
        >
          <MDBNavItem
            className="pl-5 ml-4 align-items-center"
          >
            <MDBDropdown>
              <MDBDropdownToggle
                nav
                className="py-0"
                style={{
                  width:'3.125vw',
                }}>
                <img
                  style={deviceHelper.getType() === deviceHelper.MOBILE ? {width: '30px'} : {width: '50px'}}
                  //src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7e/Pikachu_%28Dizzy%29.png/revision/latest?cb=20170410223549"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                  className="rounded-circle img-fluid p-0 float-right w-100"
                  alt="Sample avatar"
                />
              </MDBDropdownToggle>
              <MDBDropdownMenu
                color="indigo darken-1"
                basic
                left
                style={{marginTop: '52px'}}>
                <MDBDropdownItem href="/applicant">个人主页</MDBDropdownItem>
                <MDBDropdownItem href="/">我的消息</MDBDropdownItem>
                <MDBDropdownItem href="/logout">退出</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </ul>
      </div>
    );
  }
}

SignedInReact.i18n = [
  {},
  {}
];

SignedInReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const SignedIn = withRouter(SignedInReact);
