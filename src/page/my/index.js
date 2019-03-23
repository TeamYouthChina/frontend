import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Application} from './application';
import {CollectionSwitch} from './collection/index.switch';
import {Message} from './message';
import {Notification} from './notification';
import {Profile} from './profile';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class MyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = MyReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            {/* 顶部信息栏 */}
          </div>
        </div>
        {/* 二级导航条 */}
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
