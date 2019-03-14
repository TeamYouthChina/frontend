import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';

class ReviewCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ReviewCardBarAuthReact.i18n[languageHelper()];
  }

  render() {

    return (
      null
    );
  }
}

ReviewCardBarAuthReact.i18n = [
  {},
  {}
];

ReviewCardBarAuthReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ReviewCardBarAuth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ReviewCardBarAuthReact));
