import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import QuestionDes from './containers/question-des';

const basicFont = {
  fontFamily: 'PingFang SC',
  lineHeight: 'normal',
};

class QuestionReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = QuestionReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <QuestionDes
          tags={['创业','赚钱','副业','白领']}
          content={{
            title:'搞什么副业能稳定收入一万元',
            detail:'平时上班比较清闲，经常在电脑周围，平时闲来无事的时候后'}}
          basicFont={basicFont}
          questionId={1}/>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            
          </div>
        </div>
      </div>
    );
  }
}

QuestionReact.i18n = [
  {},
  {}
];

QuestionReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Question = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(QuestionReact);
