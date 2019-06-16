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
import {Redirect, withRouter} from 'react-router-dom';
import * as deviceHelper from '../../../tool/device-helper';
import {languageHelper} from '../../../tool/language-helper';
import classes from './index.module.css';
import {get, getAsync, isLogin} from '../../../tool/api-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
const defaultAva = 'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png';

class SignedInReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      hover:0,
      render:1,
      userAvatar:localStorage.getItem('avatar'),
    };
    // i18n
    this.text = SignedInReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    if (!isLogin()) {
      this.setState({
        render: 2
      });
    }
    const result = await getAsync('/me');
    let userAvatar = this.state.userAvatar;
    if((userAvatar !== defaultAva) && userAvatar.length > 10) {
      get(`/static/${userAvatar}`).then((res)=>{
        userAvatar = res.content;
        this.setState({
          render: 1,
          user: result,
          userAvatar
        });
      });
    } else {
      userAvatar = defaultAva;
      this.setState({
        render: 1,
        user: result,
        userAvatar
      });
    }
  }


  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    const { userAvatar } = this.state;
    switch (this.state.render) {
      case 1:
        return (
          <div className="d-flex flex-row">
            <div className="flex-fill align-self-center">
              <MDBNavbarNav
                right
                className="mr-1 mr-md-3"
              >
                <MDBNavItem className="d-flex align-items-center mr-3">
                  <MDBIcon
                    icon="user-friends"
                    style={{color:'#C1C4CA'}}
                    //className={`${classes.icon} mr-2`}
                    className="mr-2"
                  />
                  <div
                    className={classes.mouse2}
                  >好友</div>
                  <div
                    style={{
                      background:'#F51A83',
                      fontFamily:'PingFang SC',
                      fontSize:'0.58vw',
                      color:'#FFFFFF',
                      width:'18px',
                      height:'16px',
                      marginLeft:'-2px',
                      alignSelf:'baseline',
                      borderRadius:'8px'
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      19
                    </div>
                  </div>
                </MDBNavItem>
                <MDBNavItem className="d-flex align-items-center">

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
                </MDBNavItem>

              </MDBNavbarNav>
            </div>
            <MDBNavbarNav
              right
            >
              <MDBNavItem
                className="p-0 align-items-center"
              >
                <MDBDropdown>
                  <MDBDropdownToggle
                    nav
                    className="py-0"
                    style={{
                      width:'4.125vw',
                    }}>
                    <div className={classes.imgWrapper}>
                      <img
                        style={deviceHelper.getType() === deviceHelper.MOBILE ? {
                          width: '5.3vw',
                          height: '5.3vw',
                          marginTop: '-2.65vw',
                          background: '#F3F5F7'
                        } : {width: '8.67vw', height: '8.67vw', marginTop: '-4.335vw', background: '#F3F5F7'}}
                        // 因为要更新头像
                        src={userAvatar}
                        //src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'
                        className="rounded-circle img-fluid p-0 float-right"
                        alt="Sample avatar"
                      />
                    </div>
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
      case 2:
        return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
      default:
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
