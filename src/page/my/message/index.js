import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Chat} from './chat';
import {Friend} from './friend';
import {NewFriend} from './new-friend';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class MessageReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = MessageReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/chat`}
          component={routeProps => <Chat {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/friend`}
          component={routeProps => <Friend {...routeProps} />}
        />
        <Route
          path={`${this.props.match.url}/new-friend`}
          component={routeProps => <NewFriend {...routeProps} />}
        />
        <Redirect to={`${this.props.match.url}/message`} />
      </Switch>
    );
  }
}

MessageReact.i18n = [
  {},
  {}
];

MessageReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Message = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(MessageReact);
