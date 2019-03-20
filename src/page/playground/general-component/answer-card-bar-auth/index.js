import React from 'react';
import PropTypes from 'prop-types';

import AnswerCard from './components/answer-card';

const AnswerCardBarAuthReact = (props) => (
  <AnswerCard 
    answerId={props.answerId}  />
);

AnswerCardBarAuthReact.propTypes = {
  answerId:PropTypes.number.isRequired
};

export default AnswerCardBarAuthReact;
