import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import AnswerCard from './components/answer-card';
import {languageHelper} from '../../../../../tool/language-helper';

class ArticleCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ArticleCardBarIdReact.i18n[languageHelper()];
  }

  render() {
    return (
      <AnswerCard articleId={this.props.id} />
    );
  }
}

ArticleCardBarIdReact.i18n = [
  {},
  {}
];

ArticleCardBarIdReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const ArticleCardBarId = withRouter(ArticleCardBarIdReact);
