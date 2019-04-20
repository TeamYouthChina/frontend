import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Application} from './application';
import {CollectionSwitch} from './collection/index.switch';
import {FileSwitch} from './file/index.switch';
import {ComingSoon} from '../coming-soon';
import {Message} from './message';
import {Establish} from './establish';
import {ProfileMainBody} from '../profilenew';
import {Setting} from './setting';
import classes from './index.module.css';
import {Header2} from '../header-2';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import * as deviceHelper from '../../tool/device-helper';
import {getAsync} from '../../tool/api-helper';



class MyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0
    };
    // i18n
    this.text = MyReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    this.setState({
      render: 1,
      user: await getAsync('/me'),
    });
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }

    switch (this.state.render) {
      case 0:
        return null;
      case 1:
        return (
          <div>
            <div className={`${classes.blue} cell-wall`}></div>
            <div className={`${classes.white} cell-wall`}>

              <div
                className="cell-membrane d-flex"
              >
                <div>
                  <img
                    style={deviceHelper.getType() === deviceHelper.MOBILE ? {
                      width: '5.3vw',
                      height: '5.3vw',
                      marginTop: '-2.65vw',
                      background:'#F3F5F7'
                    } : {width: '8.67vw', height: '8.67vw', marginTop: '-4.335vw',background:'#F3F5F7'}}
                    src={(this.state.user.content.avatar_url==='---')?('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'):(this.state.user.content.avatar_url==='---')}
                    //src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'
                    className="rounded-circle img-fluid p-0 float-right"
                    alt="Sample avatar"
                  />
                </div>
                <div
                  className="ml-3"
                >
                  <p className={classes.name}>
                    {this.state.user.content.username}
                  </p>
                  <p className={classes.education}>
                    {this.state.user.content.nation}
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
                      name: '申请进度',
                      subPath: '/application'
                    },
                    {
                      name: '我的文件',
                      subPath: '/file'
                    },
                    {
                      name: '我的发布',
                      subPath: '/establish'
                    },
                    {
                      name: '我的收藏',
                      subPath: '/collection'
                    },

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
                path={`${this.props.match.url}/comingsoon`}
                component={routeProps => <ComingSoon {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/file`}
                component={routeProps => <FileSwitch {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/message`}
                component={routeProps => <Message {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/establish`}
                component={routeProps => <Establish {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/profile`}
                component={routeProps => <ProfileMainBody requestID={localStorage.getItem('id')} {...routeProps} />}
              />
              <Route
                path={`${this.props.match.url}/setting`}
                component={routeProps => <Setting {...routeProps} />}
              />
              <Redirect to={`${this.props.match.url}/profile`} />
            </Switch>
          </div>
        );
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
