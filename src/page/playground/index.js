import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import {GeneralComponent} from './general-component';
import {Yu3tong} from './yu3tong';
import {Yu4tong} from './yu4tong';
import {Yuwei} from './yuwei';
import {Zepei} from './zepei';
import {ZhenyiWrapper} from './zhenyi';
import {Zhicheng} from './zhicheng';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

export class Playground extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/general-component`}
          component={routeProps => <GeneralComponent {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/yu3tong`}
          component={routeProps => <Yu3tong {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/yu4tong`}
          component={routeProps => <Yu4tong {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/yuwei`}
          component={routeProps => <Yuwei {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/zepei`}
          component={routeProps => <Zepei {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/zhenyi`}
          component={routeProps => <ZhenyiWrapper {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/zhicheng`}
          component={routeProps => <Zhicheng {...routeProps} />}
        />
        <Redirect to={`${this.props.match.url}/general-component`} />
      </Switch>
    );
  }
}

Playground.propTypes = {
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
