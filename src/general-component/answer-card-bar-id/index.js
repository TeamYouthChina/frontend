import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import AnswerCard from './components/answer-card';
import {languageHelper} from '../../tool/language-helper';

class AnswerCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = AnswerCardBarIdReact.i18n[languageHelper()];
  }

  render() {
    return (
      <AnswerCard questionId={this.props.questionId} answerId={this.props.id} questionTitle={this.props.questionTitle}/>
    );
  }
}

AnswerCardBarIdReact.i18n = [
  {},
  {}
];

AnswerCardBarIdReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,
  questionTitle: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

export const AnswerCardBarId = withRouter(AnswerCardBarIdReact);
