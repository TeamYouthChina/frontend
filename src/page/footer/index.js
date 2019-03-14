import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';

export class FooterReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = FooterReact.i18n[languageHelper()];
  }

  render() {
    return (
      <footer
        className="page-footer font-small py-2"
        style={{
          background: '#31394D',
        }}
      >
        <div
          style={{backgroundColor: '#31394D'}}
          className="footer-copyright text-center py-3"
        >
          <span>&copy; {new Date().getFullYear()} Copyright:{' '}</span>
          <a href="http://weyouth.co/">weyouth.co</a>
        </div>
      </footer>
    );
  }
}

FooterReact.i18n = [
  {},
  {}
];

FooterReact.propTypes = {
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Footer = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(FooterReact));
