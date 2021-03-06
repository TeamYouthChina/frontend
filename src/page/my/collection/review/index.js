import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect, withRouter} from 'react-router-dom';

import {ReviewCardBarId} from '../../../../general-component/review-card-bar-id';
import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';
import {getAsync} from '../../../../tool/api-helper';

class ReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null,
      collectionType: 'editorial'
    };
    // i18n
    this.text = ReviewReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    try {
      const result = await getAsync(`/users/${localStorage.getItem('id')}/attentions?type=${this.state.collectionType}`);
      if (result && result.status && result.status.code === 2000) {
        this.setState(() => {
          return {backend: result};
        });
      } else {
        this.setState(() => {
          return {collectionNum: 0};
        });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend !== null) ? (
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
                  短则
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
                          {this.state.backend.content.editorial.data.length}篇短则
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
                to={this.props.match.url.replace('/review', '')}
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
                        this.state.backend.content.editorial.data.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{marginBottom: '1.5vw'}}
                            >
                              <ReviewCardBarId id={item.id} />
                            </div>
                          );
                        })
                      }
                    </div>
                  );
                }
              })()
            }
          </div>
        </div>
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

ReviewReact.i18n = [
  {},
  {}
];

ReviewReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Review = withRouter(ReviewReact);
