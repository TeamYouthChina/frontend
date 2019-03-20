import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import {CompanyCardBarAuth} from './company-card-bar-auth/index';

import {AnswerCardBarAuth} from './answer-card-bar-auth';
import {AnswerCardBarUnauth} from './answer-card-bar-unauth';
import {ArticleCardBarUnauth} from './article-card-bar-unauth';
import {VideoCardBarAuth} from './video-card-bar-auth';
import {VideoCardBarUnauth} from './video-card-bar-unauth';
import ReviewCard from '../general-component/review-card-bar-auth';
import ReviewCardWithoutAuth from '../general-component/review-card-bar-unauth';
import ArticleCard from '../general-component/article-card-bar-auth';
import {Header2} from './header-2';

import data from './answer-card-bar-auth/components/index.data';

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
      return (<Redirect to={pathname} />);
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
                  /* 振一：填一下全文 */
                }}
              />
            </div>
            <div className={classes.space}>
              <p>article-card-bar-auth</p>
              <ArticleCard articleId={1} />
            </div>
            <div className={classes.space}>
              <p>comment-card-bar-auth</p>
              <ArticleCardBarUnauth />
            </div>
            <div className={classes.space}>
              <p>company-card-bar-auth</p>
              <CompanyCardBarAuth
                fullText={{
                  /* 振一：填一下全文 */
                }}
              />
            </div>
            <div className={classes.space}>
              <p>job-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>review-card-bar-auth</p>
              <ReviewCard reviewId={1} />
            </div>
            <div className={classes.space}>
              <p>review-card-bar-unauth</p>
              <ReviewCardWithoutAuth fullText={data.content[0]} />
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

GeneralComponentReact.i18n = [
  {},
  {}
];

GeneralComponentReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const GeneralComponent = connect(
  (state) => {
    return {
      bodyClientWidth: state.initial.bodyClientWidth
    };
  }
)(GeneralComponentReact);
