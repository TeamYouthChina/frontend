import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import {JobCardBarId} from './job-card-bar-id';
import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';
import {getAsync} from '../../../../tool/api-helper';

class JobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null,
      collectionType: 'job'
    };
    // i18n
    this.text = JobReact.i18n[languageHelper()];
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
                  职位
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
                          {this.state.backend.content.data.length}份职位
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
                to={this.props.match.url.replace('/job', '')}
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
                        this.state.backend.content.data.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{marginBottom: '1.5vw'}}
                            >
                              <JobCardBarId id={item.id} />
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
    );
  }
}

JobReact.i18n = [
  {},
  {}
];

JobReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Job = JobReact;
