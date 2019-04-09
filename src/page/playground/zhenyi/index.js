import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';


// import Zhenyi from './components';

// import AnswerCard  from '../general-component/answer-card-bar-id/components/answer-card';
// import AnswerCardWithoutAuth  from '../general-component/answer-card-bar-fulltext';
import {ReviewCardBarId}  from '../general-component/review-card-bar-id';
// import ReviewCardWithoutAuth  from '../general-component/review-card-bar-fulltext';
// import ArticleCard  from '../general-component/article-card-bar-id';
// import {VideoCardBarAuth}  from '../general-component/video-card-bar-id';
//
// import data from '../general-component/answer-card-bar-id/components/index.data';

class ZhenyiReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ZhenyiReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div style={{background:'#E5E5E5'}}>
        <ReviewCardBarId id={1}/>
      </div>
    );
  }
}

ZhenyiReact.i18n = [
  {},
  {}
];

ZhenyiReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ZhenyiWrapper = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ZhenyiReact);
// 我能改吗？

