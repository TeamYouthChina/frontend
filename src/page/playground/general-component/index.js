import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

import {AnswerCardBarId} from './answer-card-bar-id';
import {AnswerCardBarFulltext} from './answer-card-bar-fulltext';
import {ArticleCardBarFulltext} from './article-card-bar-fulltext';
import {ArticleCardBarId} from './article-card-bar-id';
import {Header2} from '../../header-2';
import {CompanyCardBarId} from './company-card-bar-id/index';
import {JobCardBarId} from './job-card-bar-id';
import {VideoCardBarId} from './video-card-bar-id';
import {VideoCardBarFulltext} from './video-card-bar-fulltext';
import {ReviewCardBarId} from './review-card-bar-id';
import {ReviewCardBarFulltext} from './review-card-bar-fulltext';
import {UserCardSquareAuth} from './user-card-square-auth';
import {UserCardBarAuth} from './user-card-bar-auth';

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
        <Header2
          align="center"
          backgroundColor="white"
          intervalVw={4.2}
          itemList={[
            {
              name: '校园招聘',
              subPath: '/sub-path-1'
            },
            {
              name: '社会招聘',
              subPath: '/sub-path-2'
            },
            {
              name: '实习',
              subPath: '/sub-path-3'
            },
            
          ]}
        />
        <div
          className={`cell-wall ${classes.background}`}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.space}>
              <p>answer-card-bar-id</p>
              <AnswerCardBarId id={1} />
            </div>
            <div className={classes.space}>
              <p>answer-card-bar-fulltext</p>
              <AnswerCardBarFulltext
                fulltext={{
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
              <p>article-card-bar-id</p>
              <ArticleCardBarId id={1} />
            </div>
            <div className={classes.space}>
              <p>article-card-bar-fulltext</p>
              <ArticleCardBarFulltext
                fulltext={{
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
              <p>company-card-bar-id</p>
              <CompanyCardBarId id={'5'}/>
            </div>
            <div className={classes.space}>
              <p>job-card-bar-id</p>
              <JobCardBarId id={'5'}/>
            </div>
            <div className={classes.space}>
              <p>review-card-bar-id</p>
              <ReviewCardBarId id={1} />
            </div>
            <div className={classes.space}>
              <p>review-card-bar-fulltext</p>
              <ReviewCardBarFulltext
                fulltext={{
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
              <p>user-card-bar-id</p>
              <UserCardBarAuth/>
            </div>
            <div className={classes.space}>
              <p>user-card-square-id</p>
              <UserCardSquareAuth/>
            </div>
            <div className={classes.space}>
              <p>video-card-bar-id</p>
              <VideoCardBarId id={1} />
            </div>
            <div className={classes.space}>
              <p>video-card-bar-fulltext</p>
              <VideoCardBarFulltext
                fulltext={{
                  'id': 0,
                  'url': 'https://www.youtube.com/watch?v=E7lxKtH_zO8',
                  'comments': [],
                  'uploader': {
                    'id': 0,
                    'username': '齐昊',
                    'email': 'user@example.com',
                    'phonenumber': '2020950095',
                    'register_date': 'string',
                    'real_name': '齐昊',
                    'gender': 'male',
                    'nation': 'string',
                    'avatar_url': 'string',
                    'role': 'string',
                    'age': 0
                  },
                  'body': {
                    'braftEditorRaw': {},
                    'previewText': {},
                    'resourceList': [
                      'string'
                    ]
                  },
                  'create_at': 1553195000,
                  'is_anonymous': false
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
  location: PropTypes.object.isRequired
};

export const GeneralComponent = GeneralComponentReact;
