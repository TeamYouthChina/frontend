import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'react-router-dom';

import {EResume} from './e-resume';
import {File} from './index';
import {PdfResume} from './pdf-resume-zhenyi';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class FileSwitchReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = FileSwitchReact.i18n[languageHelper()];
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
          component={routeProps => <File {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/e-resume`}
          component={routeProps => <EResume {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/pdf-resume`}
          component={routeProps => <PdfResume {...routeProps} />}
        />
        <Redirect to={this.props.match.url} />
      </Switch>
    );
  }
}

FileSwitchReact.i18n = [
  {},
  {}
];

FileSwitchReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const FileSwitch = FileSwitchReact;
