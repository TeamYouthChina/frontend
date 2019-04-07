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
    let id = 1400184624;
    let sig = 'eJxlj1FPgzAYRd-5FYTXGfdRqFlM9oAMJ0lxIW7G*UIaWliZQG3LmFv870bUiPG*nnNzc8*WbdvOmjxc0jxvu8Zk5k1yx762HXAufqGUgmXUZJ5i-yA-SqF4RgvD1QBdjDECGDuC8caIQnwbG82VP8Ka7bNh46vvA7gz-wr9UUQ5wCRKw3jJp3HxWAXBiTAiYUHyoDvBKix36eRusSTlfVSVU3zc40MgbspeSzl5UUlDSbjqk81a*W0dv1b0dkujZ9W1qE41PO22-Xw*mjSi5j*HwMPIn40vHbjSom0GAYGLXeTBZxzr3foAMUZdvg__';
    let imURL = `http://127.0.0.1:8080?id=${id}&sig=${sig}`;
    return (
      <div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div style={{ textAlign: 'center', padding: '30px 30px', boxSizing: 'border-box' }}>
              <iframe
                frameBorder="0"
                src={imURL}
                style={{
                  height: `${1032 * 0.55 / 1280 * 100}vw`,
                  width: `${1761 * 0.55 / 1280 * 100}vw`,
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
