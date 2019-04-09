import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Campus} from './container/campus';
import {General} from './container/general';
import {Intern} from './container/intern';
import {RecommendationJobsTopNav} from './secondary-navagation';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class JobForYouReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = JobForYouReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        {/* 二级导航条 */}
        <RecommendationJobsTopNav/>
        <Switch>
          <Route
            path={`${this.props.match.url}/campus`}
            component={routeProps => <Campus {...routeProps} />}
          />
          <Route
            path={`${this.props.match.url}/general`}
            component={routeProps => <General {...routeProps} />}
          />
          <Route
            path={`${this.props.match.url}/intern`}
            component={routeProps => <Intern {...routeProps} />}
          />
          <Redirect to={`${this.props.match.url}/campus`} />
        </Switch>
      </div>
    );
  }
}

JobForYouReact.i18n = [
  {},
  {}
];

JobForYouReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const JobForYou = JobForYouReact;
