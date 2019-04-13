import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
//import {AnswerCardBarId} from './answer-card-bar-id';
//import {AnswerCardBarFulltext} from './answer-card-bar-fulltext';
//import {ArticleCardBarFulltext} from './article-card-bar-fulltext';
//mport {ArticleCardBarId} from './article-card-bar-id';
import {Header2} from '../../header-2';
import {CompanyCardBarId} from './company-card-bar-id/index';
import {JobCardBarId} from './job-card-bar-id';
import {Location} from './location';
//import {VideoCardBarId} from './video-card-bar-id';
//import {VideoCardBarFulltext} from './video-card-bar-fulltext';
//import {ReviewCardBarId} from './review-card-bar-id';
//import {ReviewCardBarFulltext} from './review-card-bar-fulltext';
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
    this.getLocation = this.getLocation.bind(this);
  }

  getCurrentPage() {
  }

  showCommentsFunc() {
  }

  getLocation(location) {
    /* eslint-disable no-console */
    console.log(location);
    /* eslint-enable no-console */
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
              <p>location</p>
              <Location code='340103' update={this.getLocation} />
            </div>
            <div className={classes.space}>
              <p>company-card-bar-id</p>
              <CompanyCardBarId id={2} />
            </div>
            <div className={classes.space}>
              <p>job-card-bar-id</p>
              <JobCardBarId id={4} />
            </div>

            <div className={classes.space}>
              <p>user-card-bar-id</p>
              <UserCardBarAuth />
            </div>
            <div className={classes.space}>
              <p>user-card-square-id</p>
              <UserCardSquareAuth />
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
