import React from 'react';
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbarNav,
  MDBNavItem
} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getType} from '../../tool/device-helper';
import {languageHelper} from '../../tool/language-helper';

class SignedInReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = SignedInReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div className="d-flex flex-row">
        <div className="flex-fill align-self-center">
          <MDBNavbarNav
            right
            className="mr-1 mr-md-3"
            // style={{marginRight: '1em'}}
          >
            <MDBNavItem className="align-middle">
              <MDBIcon
                icon="bell"
                className="white-text"
              />
            </MDBNavItem>
          </MDBNavbarNav>
        </div>
        <MDBNavbarNav
          right
          className="mr-md-3"
        >
          <MDBNavItem
            className="p-0 align-items-center">
            <MDBDropdown>
              <MDBDropdownToggle nav className="py-0">
                <img
                  style={getType(this.props.bodyClientWidth) === 1 ? {width: '30px'} : {width: '50px'}}
                  src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7e/Pikachu_%28Dizzy%29.png/revision/latest?cb=20170410223549"
                  // src="https://s2.ax1x.com/2019/01/27/kuUMYq.jpg"
                  className="rounded-circle z-depth-1-half img-fluid p-0 float-right"
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
        </MDBNavbarNav>
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
  location: PropTypes.object.isRequired,
  bodyClientWidth: PropTypes.object.isRequired
};

export const SignedIn = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.initial.bodyClientWidth
    };
  }
)(SignedInReact));
