import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {isLogin} from '../../../tool/api-helper';
import {DiscoveryVideo} from './container';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class VideoReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = VideoReact.i18n[languageHelper()];
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
          style={{backgroundColor: '#F3F5F7'}}
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
                    <DiscoveryVideo/>
                  </div>
                )
              }
              <div>{/* 右侧部分 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoReact.i18n = [
  {},
  {}
];

VideoReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Video = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(VideoReact);
