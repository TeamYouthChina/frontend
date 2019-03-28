import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Insight} from './insight';
import {Video} from './video';
import {TopNav} from './secondary-navagations';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

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
        <TopNav/>
        <Switch>
          <Route
            path={`${this.props.match.url}/insight`}
            component={routeProps => <Insight {...routeProps} />}
          />
          <Route
            path={`${this.props.match.url}/video`}
            component={routeProps => <Video {...routeProps} />}
          />
          <Redirect to={`${this.props.match.url}/insight`} />
        </Switch>
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
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Discovery = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(DiscoveryReact);
