import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Answer} from './answer';
import {Article} from './article';
import {Creation} from './index';

//import {Review} from './review';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class CreationSwitchReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CreationSwitchReact.i18n[languageHelper()];
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
          component={routeProps => <Creation {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/answer`}
          component={routeProps => <Answer {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/article`}
          component={routeProps => <Article {...routeProps} />}
        />
        {/*<Route*/}
        {/*path={`${this.props.match.url}/review`}*/}
        {/*component={routeProps => <Review {...routeProps} />}*/}
        {/*/>*/}
        <Redirect to={this.props.match.url} />
      </Switch>
    );
  }
}

CreationSwitchReact.i18n = [
  {},
  {}
];

CreationSwitchReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CreationSwitch = CreationSwitchReact;
