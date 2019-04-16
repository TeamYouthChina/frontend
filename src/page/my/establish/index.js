import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class EstablishReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = EstablishReact.i18n[languageHelper()];
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
            className="cell-membrane d-flex justify-content-center"
          >
            <img
              src="http://frontendpic.oss-us-east-1.aliyuncs.com/comingsoon%20%281%29.png?Expires=1555217413&OSSAccessKeyId=TMP.AQHqeGKy_Brn5N1OqJMhbHWer74zkhWB93qh6WDUQVF3oZNo2PXIkQYlPsUiADAtAhQvX0QcX6FAS-w40awKlriAj7tizgIVAIB8lT0Gajd2CyGmZjwgLb-He_8M&Signature=pNBAr5FfTL%2Bv%2FPPi1Fe8CgqjP9s%3D"
              className="img-fluid"
            />

          </div>
        </div>
      </div>
    );
  }
}

EstablishReact.i18n = [
  {},
  {}
];

EstablishReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Establish = EstablishReact;
