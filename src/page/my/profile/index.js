import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class ProfileReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ProfileReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >

          </div>
        </div>
      </div>
    );
  }
}

ProfileReact.i18n = [
  {},
  {}
];

ProfileReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Profile = ProfileReact;
