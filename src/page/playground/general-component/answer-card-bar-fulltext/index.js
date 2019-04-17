import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import AnswerCard from './/components/answer-card';
import {languageHelper} from '../../../../tool/language-helper';

class AnswerCardBarFulltextReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = AnswerCardBarFulltextReact.i18n[languageHelper()];
  }

  render() {
    return (
      <AnswerCard fullText={this.props.fulltext} />
    );
  }
}

AnswerCardBarFulltextReact.i18n = [
  {},
  {}
];

AnswerCardBarFulltextReact.propTypes = {
  // self
  fulltext: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const AnswerCardBarFulltext = withRouter(AnswerCardBarFulltextReact);
