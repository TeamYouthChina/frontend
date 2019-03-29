import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {DiscoveryInsight} from './container';
import {isLogin} from '../../../tool/api-helper';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import * as device from '../../../tool/device-helper';

class InsightReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = InsightReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (device.getType()) {
      case device.DESKTOP:
        return (
          <div>
            <div
              style={{backgroundColor: '#F3F5F7'}}
              className="cell-wall"
            >
              <div
                className="cell-membrane"
              >
                <div
                  className={classes.content}
                >
                  {
                    isLogin() ? (
                      <div>
                        {/* 已登陆：从后端获取 id 给卡片 */}
                      </div>
                    ) : (
                      <div>
                        {/* 未登陆：从后端获取 fullText 给卡片 */}
                        <DiscoveryInsight/>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        );
      case device.MOBILE:
        return (
          <div>
            <div
              className="cell-wall"
            >
              <div
                className="cell-membrane"
              >
                <div
                  className={classes.content}
                >
                  {
                    isLogin() ? (
                      <div>
                        {/* 已登陆：从后端获取 id 给卡片 */}
                      </div>
                    ) : (
                      <div>
                        {/* 未登陆：从后端获取 fullText 给卡片 */}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }

  }
}

InsightReact.i18n = [
  {},
  {}
];

InsightReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Insight = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(InsightReact);
