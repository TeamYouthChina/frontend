import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { languageHelper } from '../../../tool/language-helper';
import { removeUrlSlashSuffix } from '../../../tool/remove-url-slash-suffix';
// import * as tim from '../../../tim/sdk/webim';
// import * as json2 from '../../../tim/sdk/json2';
// import {webimLogin} from '../../../tim/js/login/login';

class ZepeiReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ZepeiReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return <Redirect to={pathname} />;
    }
    return (
      <div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div style={{ textAlign: 'center', padding: '30px 30px', boxSizing: 'border-box' }}>
              <iframe
                frameBorder="0"
                src="http://127.0.0.1:8080?test1=value1&test2=value2"
                style={{
                  height: `${1032 * 0.6 / 1280 * 100}vw`,
                  width: `${1761 * 0.6 / 1280 * 100}vw`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ZepeiReact.i18n = [{}, {}];

ZepeiReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired,
};

export const Zepei = connect(state => {
  return {
    bodyClientWidth: state.bodyClientWidth,
  };
})(ZepeiReact);
