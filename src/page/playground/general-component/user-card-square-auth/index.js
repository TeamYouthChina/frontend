import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';

class UserCardSquareAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = UserCardSquareAuthReact.i18n[languageHelper()];
  }

  render() {

    return (
      null
    );
  }
}

UserCardSquareAuthReact.i18n = [
  {},
  {}
];

UserCardSquareAuthReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const UserCardSquareAuth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(UserCardSquareAuthReact));
