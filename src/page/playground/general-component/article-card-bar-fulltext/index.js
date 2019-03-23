import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import AnswerCard from './components/answer-card';
import {languageHelper} from '../../../../tool/language-helper';

class ArticleCardBarFulltextReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ArticleCardBarFulltextReact.i18n[languageHelper()];
  }

  render() {
    return (
      <AnswerCard fullText={this.props.fulltext} />
    );
  }
}

ArticleCardBarFulltextReact.i18n = [
  {},
  {}
];

ArticleCardBarFulltextReact.propTypes = {
  // self
  fulltext: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ArticleCardBarFulltext = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ArticleCardBarFulltextReact));
