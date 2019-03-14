import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';

class JobCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = JobCardBarAuthReact.i18n[languageHelper()];
  }

  render() {

    return (
      null
    );
  }
}

JobCardBarAuthReact.i18n = [
  {},
  {}
];

JobCardBarAuthReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const JobCardBarAuth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(JobCardBarAuthReact));
