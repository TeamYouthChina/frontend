import React from 'react';
import PropTypes from 'prop-types';

import AnswerCard from '../answer-card-bar-auth/components/answer-card';

const AnswerCardBarWithoutAuthReact = (props) => (
  <AnswerCard
    fullText={props.fullText}  />
);

AnswerCardBarWithoutAuthReact.propTypes = {
  fullText:PropTypes.object.isRequired
};

export default AnswerCardBarWithoutAuthReact;
