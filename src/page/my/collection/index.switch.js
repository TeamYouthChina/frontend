import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Answer} from './answer';
import {Article} from './article';
import {Collection} from './index';
import {Company} from './company';
import {Job} from './job';
import {Video} from './video';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class CollectionSwitchReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CollectionSwitchReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <Switch>
        <Route
          path={this.props.match.url}
          exact
          component={routeProps => <Collection {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/answer`}
          component={routeProps => <Answer {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/article`}
          component={routeProps => <Article {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/company`}
          component={routeProps => <Company {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/job`}
          component={routeProps => <Job {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/video`}
          component={routeProps => <Video {...routeProps} />}
        />
        <Redirect to={this.props.match.url} />
      </Switch>
    );
  }
}

CollectionSwitchReact.i18n = [
  {},
  {}
];

CollectionSwitchReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CollectionSwitch = CollectionSwitchReact;
