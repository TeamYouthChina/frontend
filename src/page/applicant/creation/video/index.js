import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import {VideoCardBarId} from './video-card-bar-id';
import {content} from './index.mock';
import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';
import {mockGetAsync} from '../../../../tool/api-helper';

class VideoReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null
    };
    // i18n
    this.text = VideoReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    this.setState({
      backend: await mockGetAsync(content)
    });
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
          style={{
            backgroundColor: '#F3F5F7'
          }}
        >
          <div
            className="cell-membrane"
          >

            <div
              style={{
                display: 'flex',
                marginTop: '1.5vw',
                marginBottom: '1.5vw'
              }}
            >
              <div
                style={{
                  marginRight: '1.5vw'
                }}
              >
                <span style={{fontSize: '1.875vw'}}>
                  视频
                </span>
              </div>
              {
                (() => {
                  if (!this.state.backend) {
                    return null;
                  }
                  if (this.state.backend.status.code.toString().startsWith('2')) {
                    return (
                      <div
                        style={{paddingTop: '0.175vw'}}
                      >
                        <span
                          style={{
                            color: '#8D9AAF',
                            fontSize: '1.09375vw'
                          }}
                        >
                          {this.state.backend.content.videos.length}条视频
                        </span>
                      </div>
                    );
                  }
                })()
              }
            </div>
            <div
              style={{
                marginTop: '1.5vw',
                marginBottom: '1.5vw'
              }}
            >
              <Link
                to={this.props.match.url.replace('/video', '')}
                style={{
                  color: '#4F65E1'
                }}
              >
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z"
                    fill="#4F65E1"
                  />
                </svg>
                <span>&#160;&#160;我的收藏</span>
              </Link>
            </div>
            {
              (() => {
                if (!this.state.backend) {
                  return null;
                }
                if (this.state.backend.status.code.toString().startsWith('2')) {
                  return (
                    <div>
                      {
                        this.state.backend.content.videos.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{marginBottom: '1.5vw'}}
                            >
                              <VideoCardBarId id={item.video.id} />
                            </div>
                          );
                        })
                      }
                    </div>
                  );
                }
              })()
            }
            <div style={{color: 'red'}}>API没有</div>
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
  location: PropTypes.object.isRequired
};

export const Video = VideoReact;
