import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import AnswerCard from './components/answer-card';
import {languageHelper} from '../../tool/language-helper';

class ReviewCardBarFulltextReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ReviewCardBarFulltextReact.i18n[languageHelper()];
  }

  render() {
    return (
      <AnswerCard qid={this.props.qid} ansCommentId={this.props.ansCommentId} fullText={this.props.fulltext} type={this.props.type}/>
    );
  }
}

ReviewCardBarFulltextReact.i18n = [
  {},
  {}
];

ReviewCardBarFulltextReact.propTypes = {
  // self
  fulltext: PropTypes.object.isRequired,
  ansCommentId: PropTypes.number.isRequired,
  qid: PropTypes.number.isRequired,
  type: PropTypes.string,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const ReviewCardBarFulltext = withRouter(ReviewCardBarFulltextReact);
