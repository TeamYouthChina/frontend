import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

import {AnswerCardBarAuth} from './answer-card-bar-auth';
import {AnswerCardBarUnauth} from './answer-card-bar-unauth';
import {ArticleCardBarUnauth} from './article-card-bar-unauth';
import {ArticleCardBarAuth} from '../general-component/article-card-bar-auth';
import {Header2} from './header-2';
import {CompanyCardBarAuth} from './company-card-bar-auth/index';
import {JobCardBarAuth} from './job-card-bar-auth';
import {VideoCardBarAuth} from './video-card-bar-auth';
import {VideoCardBarUnauth} from './video-card-bar-unauth';
import {ReviewCardBarAuth} from '../general-component/review-card-bar-auth';
import {ReviewCardBarUnauth} from '../general-component/review-card-bar-unauth';

class GeneralComponentReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = GeneralComponentReact.i18n[languageHelper()];
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.showCommentsFunc = this.showCommentsFunc.bind(this);
  }

  getCurrentPage() {
  }

  showCommentsFunc() {
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return <Redirect to={pathname} />;
    }
    return (
      <div>
        <Header2 />
        <div
          className={`cell-wall ${classes.background}`}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.space}>
              <p>answer-card-bar-auth</p>
              <AnswerCardBarAuth id={1} />
            </div>
            <div className={classes.space}>
              <p>answer-card-bar-unauth</p>
              <AnswerCardBarUnauth
                fullText={{
                  'id': 1,
                  'creator': {
                    'id': 1,
                    'username': 'Admin',
                    'email': '123456@123.com',
                    'phonenumber': '1234657890123',
                    'register_date': '2019-01-01 00:00:00.0',
                    'real_name': 'AAABBBCCC',
                    'gender': 'Male',
                    'nation': 'CHN',
                    'avatar_url': null,
                    'role': 1,
                    'age': 25
                  },
                  'title': '腾讯好么？',
                  'is_anonymous': true,
                  'create_at': '2019-01-01T00:00:00.000+0000',
                  'modified_at': '2019-01-01T00:00:00.000+0000',
                  'answers': [
                    {
                      'id': 1,
                      'body': {
                        'braftEditorRaw': {
                          'entityMap': {},
                          'blocks': [
                            {
                              'key': 'dtj4a',
                              'text': '<在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。<br>技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。<br>截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。<br>在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？>',
                              'type': 'unstyled',
                              'depth': 0,
                              'inlineStyleRanges': [],
                              'entityRanges': [],
                              'data': {}
                            }
                          ]
                        },
                        'previewText': '<在此填入你的文字>',
                        'resourceIdList': []
                      },
                      'is_anonymous': false,
                      'creator': {
                        'id': 5,
                        'username': 'DEF',
                        'email': '123456@456.com',
                        'phonenumber': '9876543210123',
                        'register_date': '2019-01-01 00:00:00.0',
                        'real_name': 'DDDEEEFFF',
                        'gender': 'Female',
                        'nation': 'USA',
                        'avatar_url': null,
                        'role': 3,
                        'age': 28
                      },
                      'modified_at': '2018-02-03 00:00:00.0',
                      'create_at': '2018-02-03 00:00:00.0'
                    }
                  ],
                  'rela_type': 1,
                  'rela_id': null,
                  'body': {
                    'braftEditorRaw': {
                      'entityMap': {},
                      'blocks': [
                        {
                          'key': 'dtj4a',
                          'text': '<asdasd>',
                          'type': 'unstyled',
                          'depth': 0,
                          'inlineStyleRanges': [],
                          'entityRanges': [],
                          'data': {}
                        }
                      ]
                    },
                    'previewText': '<在此填入你的文字>',
                    'resourceIdList': []
                  }
                }}
              />
            </div>
            <div className={classes.space}>
              <p>article-card-bar-auth</p>
              <ArticleCardBarAuth id={1} />
            </div>
            <div className={classes.space}>
              <p>article-card-bar-unauth</p>
              <ArticleCardBarUnauth
                fullText={{
                  'id': 1,
                  'creator': {
                    'id': 1,
                    'username': 'Admin',
                    'email': '123456@123.com',
                    'phonenumber': '1234657890123',
                    'register_date': '2019-01-01 00:00:00.0',
                    'real_name': 'AAABBBCCC',
                    'gender': 'Male',
                    'nation': 'CHN',
                    'avatar_url': null,
                    'role': 1,
                    'age': 25
                  },
                  'title': '腾讯好么？',
                  'is_anonymous': true,
                  'create_at': '2019-01-01T00:00:00.000+0000',
                  'modified_at': '2019-01-01T00:00:00.000+0000',
                  'answers': [
                    {
                      'id': 1,
                      'body': {
                        'braftEditorRaw': {
                          'entityMap': {},
                          'blocks': [
                            {
                              'key': 'dtj4a',
                              'text': '<在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。<br>技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。<br>截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。<br>在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？>',
                              'type': 'unstyled',
                              'depth': 0,
                              'inlineStyleRanges': [],
                              'entityRanges': [],
                              'data': {}
                            }
                          ]
                        },
                        'previewText': '<在此填入你的文字>',
                        'resourceIdList': []
                      },
                      'is_anonymous': false,
                      'creator': {
                        'id': 5,
                        'username': 'DEF',
                        'email': '123456@456.com',
                        'phonenumber': '9876543210123',
                        'register_date': '2019-01-01 00:00:00.0',
                        'real_name': 'DDDEEEFFF',
                        'gender': 'Female',
                        'nation': 'USA',
                        'avatar_url': null,
                        'role': 3,
                        'age': 28
                      },
                      'modified_at': '2018-02-03 00:00:00.0',
                      'create_at': '2018-02-03 00:00:00.0'
                    }
                  ],
                  'rela_type': 1,
                  'rela_id': null,
                  'body': {
                    'braftEditorRaw': {
                      'entityMap': {},
                      'blocks': [
                        {
                          'key': 'dtj4a',
                          'text': '<asdasd>',
                          'type': 'unstyled',
                          'depth': 0,
                          'inlineStyleRanges': [],
                          'entityRanges': [],
                          'data': {}
                        }
                      ]
                    },
                    'previewText': '<在此填入你的文字>',
                    'resourceIdList': []
                  }
                }}
              />
            </div>
            <div className={classes.space}>
              <p>company-card-bar-auth</p>
              <CompanyCardBarAuth />
            </div>
            <div className={classes.space}>
              <p>job-card-bar-auth</p>
              <JobCardBarAuth />
            </div>
            <div className={classes.space}>
              <p>review-card-bar-auth</p>
              <ReviewCardBarAuth id={1} />
            </div>
            <div className={classes.space}>
              <p>review-card-bar-unauth</p>
              <ReviewCardBarUnauth
                fullText={{
                  'id': 1,
                  'creator': {
                    'id': 1,
                    'username': 'Admin',
                    'email': '123456@123.com',
                    'phonenumber': '1234657890123',
                    'register_date': '2019-01-01 00:00:00.0',
                    'real_name': 'AAABBBCCC',
                    'gender': 'Male',
                    'nation': 'CHN',
                    'avatar_url': null,
                    'role': 1,
                    'age': 25
                  },
                  'title': '腾讯好么？',
                  'is_anonymous': true,
                  'create_at': '2019-01-01T00:00:00.000+0000',
                  'modified_at': '2019-01-01T00:00:00.000+0000',
                  'answers': [
                    {
                      'id': 1,
                      'body': {
                        'braftEditorRaw': {
                          'entityMap': {},
                          'blocks': [
                            {
                              'key': 'dtj4a',
                              'text': '<在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。<br>技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。<br>截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。<br>在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？>',
                              'type': 'unstyled',
                              'depth': 0,
                              'inlineStyleRanges': [],
                              'entityRanges': [],
                              'data': {}
                            }
                          ]
                        },
                        'previewText': '<在此填入你的文字>',
                        'resourceIdList': []
                      },
                      'is_anonymous': false,
                      'creator': {
                        'id': 5,
                        'username': 'DEF',
                        'email': '123456@456.com',
                        'phonenumber': '9876543210123',
                        'register_date': '2019-01-01 00:00:00.0',
                        'real_name': 'DDDEEEFFF',
                        'gender': 'Female',
                        'nation': 'USA',
                        'avatar_url': null,
                        'role': 3,
                        'age': 28
                      },
                      'modified_at': '2018-02-03 00:00:00.0',
                      'create_at': '2018-02-03 00:00:00.0'
                    }
                  ],
                  'rela_type': 1,
                  'rela_id': null,
                  'body': {
                    'braftEditorRaw': {
                      'entityMap': {},
                      'blocks': [
                        {
                          'key': 'dtj4a',
                          'text': '<asdasd>',
                          'type': 'unstyled',
                          'depth': 0,
                          'inlineStyleRanges': [],
                          'entityRanges': [],
                          'data': {}
                        }
                      ]
                    },
                    'previewText': '<在此填入你的文字>',
                    'resourceIdList': []
                  }
                }}
              />
            </div>
            <div className={classes.space}>
              <p>user-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>user-card-square-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>video-card-bar-auth</p>
              <VideoCardBarAuth id={1} />
            </div>
            <div className={classes.space}>
              <p>video-card-bar-unauth</p>
              <VideoCardBarUnauth
                fullText={{
                  /* 雨桐：填一下全文 */
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GeneralComponentReact.i18n = [{}, {}];

GeneralComponentReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired,
};

export const GeneralComponent = connect(state => {
  return {
    bodyClientWidth: state.bodyClientWidth,
  };
})(GeneralComponentReact);
