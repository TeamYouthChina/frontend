import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';

class ReviewCardBarUnauthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ReviewCardBarUnauthReact.i18n[languageHelper()];
  }

  render() {

    return (
      null
    );
  }
}

ReviewCardBarUnauthReact.i18n = [
  {},
  {}
];

ReviewCardBarUnauthReact.propTypes = {
  // self
  fullText: PropTypes.object.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ReviewCardBarUnauth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ReviewCardBarUnauthReact));
