import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import AnswerCard from './components/answer-card';
import {languageHelper} from '../../../../tool/language-helper';

class AnswerCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = AnswerCardBarAuthReact.i18n[languageHelper()];
  }

  render() {
    return (
      <AnswerCard answerId={this.props.id} />
    );
  }
}

AnswerCardBarAuthReact.i18n = [
  {},
  {}
];

AnswerCardBarAuthReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const AnswerCardBarAuth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(AnswerCardBarAuthReact));
