import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import * as deviceHelper from '../../../tool/device-helper';

class ZhichengReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ZhichengReact.i18n[languageHelper()];
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
            <p>逻辑分辨率：{this.props.bodyClientWidth}px</p>
            <p>
              设备类型：
              {
                (() => {
                  switch (deviceHelper.getType(this.props.bodyClientWidth)) {
                    case deviceHelper.MOBILE:
                      return '移动端';
                    case deviceHelper.DESKTOP:
                      return '桌面端';
                  }
                })()
              }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ZhichengReact.i18n = [
  {},
  {}
];

ZhichengReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Zhicheng = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ZhichengReact);
