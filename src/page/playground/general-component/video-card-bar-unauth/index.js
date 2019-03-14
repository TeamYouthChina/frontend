import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';

class VideoCardBarUnauthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = VideoCardBarUnauthReact.i18n[languageHelper()];
  }

  render() {

    return (
      null
    );
  }
}

VideoCardBarUnauthReact.i18n = [
  {},
  {}
];

VideoCardBarUnauthReact.propTypes = {
  // self
  fullText: PropTypes.object.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const VideoCardBarUnauth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(VideoCardBarUnauthReact));
