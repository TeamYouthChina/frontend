import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

import AnswerCardBarAuthReact  from '../general-component/answer-card-bar-auth';
import AnswerCardWithoutAuth  from '../general-component/answer-card-bar-unauth';
import ReviewCard  from '../general-component/review-card-bar-auth';
import ReviewCardWithoutAuth  from '../general-component/review-card-bar-unauth';
import ArticleCard  from '../general-component/article-card-bar-auth';
import {VideoCardSearch}  from '../general-component/video-card-bar-auth';

import data from '../general-component/answer-card-bar-auth/index.data';
import Comments from './comment-card-bar';

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

  getCurrentPage(){}
  showCommentsFunc(){}

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
            style={{background:'#E5E5E5'}}
          >
            <div className={classes.space}>
              <p>answer-card-bar-auth</p>
              <AnswerCardBarAuthReact answerId={1} />
            </div>
            <div className={classes.space}>
              <p>answer-card-bar-unauth</p>
              <AnswerCardWithoutAuth fullText={data.content[0]}/>
            </div>
            <div className={classes.space}>
              <p>comment-card</p>
              <Comments
                showComments={this.showCommentsFunc}
                getCurrentPage={this.getCurrentPage}
                commentsText={'2条评论'}
                commentsType={'article'}
              />
            </div>
            <div className={classes.space}>
              <p>article-card-bar-auth</p>
              <ArticleCard articleId={1} />
            </div>
            <div className={classes.space}>
              <p>comment-card-bar-auth</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>company-card-bar-auth</p>
              
            </div>
            <div className={classes.space}>
              <p>footer</p>
            </div>
            <div className={classes.space}>
              <p>header</p>
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>header-2</p>
              {/* insert component here */}
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
              {/* insert component here */}
            </div>
            <div className={classes.space}>
              <p>video-card-bar-unauth</p>
              <VideoCardSearch />
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
