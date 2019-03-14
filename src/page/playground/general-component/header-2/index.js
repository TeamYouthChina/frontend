import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';

class Header2React extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = Header2React.i18n[languageHelper()];
  }

  render() {
    return (
      null
    );
  }
}

Header2React.i18n = [
  {},
  {}
];

Header2React.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Header2 = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(Header2React));
