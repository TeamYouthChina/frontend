import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Application} from './application';
import {CollectionSwitch} from './collection/index.switch';
import {content} from './index.mock';
import {Message} from './message';
import {Notification} from './notification';
import {Profile} from './profile';
import {Setting} from './setting';
import classes from './index.module.css';
import {Header2} from '../header-2';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {getType} from '../../tool/device-helper';
import {mockGetAsync} from '../../tool/api-helper';


class MyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      mockData:{
        content:{
          id: null,
          name: null,
          education:[
            {
              university: null,
              degree:null
            }
          ],
          works:[
            {
              position:null,
            }
          ]
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = MyReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ cardData: requestedData, ...this.state });

    const requestedData = await mockGetAsync(content);
    this.setState({ ...this.state, mockData: requestedData});
  }
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div className={`${classes.blue} cell-wall`}></div>
        <div className={`${classes.white} cell-wall`}>

          <div
            className="cell-membrane d-flex"
          >
            <div>
              <img
                style={getType(this.props.bodyClientWidth) === 1 ? {width: '5.3vw',height:'5.3vw',marginTop:'-2.65vw'} : {width: '8.67vw',height:'8.67vw',marginTop:'-4.335vw'}}
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                className="rounded-circle img-fluid p-0 float-right"
                alt="Sample avatar"
              />
            </div>
            <div
              className="ml-3"
            >
              <p className={classes.name}>
                {this.state.mockData.content.name}
              </p>
              <p className={classes.education}>
                {this.state.mockData.content.education[0].university},{this.state.mockData.content.education[0].degree}
              </p>
              <p className={classes.position}>
                {this.state.mockData.content.works[0].position}
              </p>
            </div>
           
            
          </div>
        </div>
        <div className={`${classes.content} cell-wall`}>
          <div className="cell-membrane" style={{height:'3.95vw'}}>
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
                  subPath: '/sub-path-3'
                },
                {
                  name: '我的发布',
                  subPath: '/sub-path-4'
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
            path={`${this.props.match.url}/message`}
            component={routeProps => <Message {...routeProps} />}
          />
          <Route
            path={`${this.props.match.url}/notification`}
            component={routeProps => <Notification {...routeProps} />}
          />
          <Route
            path={`${this.props.match.url}/profile`}
            component={routeProps => <Profile {...routeProps} />}
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

MyReact.i18n = [
  {},
  {}
];

MyReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const My = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(MyReact);
