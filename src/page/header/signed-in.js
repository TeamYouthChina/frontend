import React from 'react';
import {MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavItem} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {languageHelper} from '../../tool/language-helper';
import classes from './index.module.css';
import {get, getAsync, logout} from '../../tool/api-helper';

const defaultAva = 'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png';

class SignedInReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      userAvatar:localStorage.getItem('avatar'),
    };
    // i18n
    this.text = SignedInReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    let userAvatar = this.state.userAvatar;
    if((userAvatar !== defaultAva) && userAvatar.length > 10) {
      get(`/static/${userAvatar}`).then((res)=>{
        userAvatar = res.content;
        this.setState({
          userAvatar
        });
      });
    } else {
      userAvatar = defaultAva;
      this.setState({
        userAvatar
      });
    }
    this.setState({
      render: 1,
      user: await getAsync('/me'),
    });
  }

  render() {
    switch (this.state.render) {
      case 1:
        return (
          <div className="d-flex">
            <div className="flex-fill align-self-center">
              <ul
                className="mr-1 d-flex navbar-nav"
                
              >
                <ul className={`${classes.mouse2} d-flex nav-item align-items-center mr-1`}>
                  <div className="d-flex align-items-center">
                    {/*<MDBIcon*/}
                    {/*icon="user-friends"*/}
                    {/*className="mr-1"*/}
                    {/*/>*/}
                    {/*<div*/}
                    {/*onClick={() => {*/}
                    {/*this.props.history.push('/comingsoon');*/}
                    {/*}}*/}
                    {/*style={{cursor: 'pointer'}}*/}
                    {/*>*/}
                    {/*好友</div>*/}

                    <ul className={`${classes.mouse2} d-flex nav-item align-items-center ml-3`}>
                      <MDBIcon
                        icon="envelope"
                        className="mr-2"
                      />
                      <div
                        onClick={() => {
                          this.props.history.push('/notification');
                        }}
                        style={{cursor: 'pointer'}}
                      >
                        通知</div>
                    </ul>
                  </div>
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
                      width: '3.125vw',
                    }}>
                    <img
                      src={this.state.userAvatar}
                      //src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'
                      className="rounded-circle img-fluid p-0 float-right"
                      alt="Sample avatar"
                      style={{background:'#C1C4CA'}}
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu
                    color="indigo darken-1 mt-5"
                    left
                    style={{zIndex: '-1'}}>
                    <MDBDropdownItem
                      onClick={() => {
                        this.props.history.push('/my');
                      }}
                    >
                      个人主页
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      onClick={() => {
                        logout();
                        this.props.history.push('/login');
                      }}
                    >
                      退出
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </ul>
          </div>
        );
      default:
        return null;
    }
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
