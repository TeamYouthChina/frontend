import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

import {Insight} from '../../discovery';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class DiscoveryReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = DiscoveryReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        {/* 二级导航条 */}
        {/*<TopNav/>*/}
        {/*<Switch>*/}
        {/*<Route*/}
        {/*path={`${this.props.match.url}/insight`}*/}
        {/*component={routeProps => <Insight {...routeProps} />}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*path={`${this.props.match.url}/video`}*/}
        {/*component={routeProps => <Video {...routeProps} />}*/}
        {/*/>*/}
        {/*<Redirect to={`${this.props.match.url}/insight`} />*/}
        {/*</Switch>*/}
        <Route
          path={`${this.props.match.url}/insight`}
          component={routeProps => <Insight {...routeProps} />}
        />
        <Redirect to={`${this.props.match.url}/insight`} />
      </div>
    );
  }
}

DiscoveryReact.i18n = [
  {},
  {}
];

DiscoveryReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Discovery = DiscoveryReact;
