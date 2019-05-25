import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch, Link} from 'react-router-dom';

import {Application} from './application';
import {CollectionSwitch} from './collection/index.switch';
import {CreationSwitch} from './creation/index.switch';
import {FileSwitch} from './file/index.switch';
import {ComingSoon} from '../coming-soon';
import {ChangeAvatar} from './change-avatar/index';
import {Intention} from './intention';
import {Message} from './message';
//import {Establish} from './establish';
import {Profile} from './profile';
import {Setting} from './setting';
import classes from './index.module.css';
import {Header2} from '../header-2';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import * as deviceHelper from '../../tool/device-helper';
import {getAsync, isLogin, get} from '../../tool/api-helper';

const defaultAva = 'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png';

class MyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      userAvatar:localStorage.getItem('avatar'),
    };
    // i18n
    this.text = MyReact.i18n[languageHelper()];
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
          <div>
            <div className={`${classes.blue} cell-wall`}></div>
            <div className={`${classes.white} cell-wall`}>

              <div
                className="cell-membrane d-flex"
              >
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
                  <Link className={classes.upAvatar} to={`${this.props.match.url}/changeAvatar`}>
                    更换头像
                  </Link>
                </div>
                <div
                  className="ml-3"
                >
                  <p className={classes.name}>
                    {this.state.user.content.first_name}{this.state.user.content.last_name}
                  </p>
                  <p className={classes.education}>
                    {this.state.user.content.gender}{', '}{this.state.user.content.nation}
                  </p>
                  <p className={classes.position}>
                    {this.state.user.content.email}
                  </p>
                </div>


              </div>
            </div>
            <div className={`${classes.content} cell-wall`}>
              <div className="cell-membrane" style={{height: '3.95vw'}}>
                <Header2
                  align="left"
                  backgroundColor="#FAFBFD"
                  intervalVw={3.125}
                  itemList={[
                    {
                      name: '个人档案',
                      subPath: '/profile'
                    },
                    {
                      name: '求职意向',
                      subPath: '/intention'
                    },
                    {
                      name: '申请进度',
                      subPath: '/application'
                    },
                    {
                      name: '我的简历',
                      subPath: '/file'
                    },
                    {
                      name: '我的发布',
                      subPath: '/creation'
                    },
                    {
                      name: '我的收藏',
                      subPath: '/collection'
                    }
                  ]}
                />
              </div>
            </div>
            <Switch>
              <Route
                path={`${this.props.match.url}/application`}
                component={routeProps => <Application {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/collection`}
                component={routeProps => <CollectionSwitch {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/changeAvatar`}
                component={routeProps => <ChangeAvatar {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/creation`}
                component={routeProps => <CreationSwitch {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/comingsoon`}
                component={routeProps => <ComingSoon {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/file`}
                component={routeProps => <FileSwitch {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/intention`}
                component={routeProps => <Intention {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/message`}
                component={routeProps => <Message {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/profile`}
                component={routeProps => <Profile requestID={localStorage.getItem('id')} {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/setting`}
                component={routeProps => <Setting {...routeProps} />}
              />
              <Redirect to={`${this.props.match.url}/profile`} />
            </Switch>
          </div>
        );
      case 2:
        return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
      default:
        return null;
    }
  }
}

MyReact.i18n = [
  {},
  {}
];

MyReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const My = MyReact;
