import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import ArticleCreate from './components/edit';
import {isLogin} from '../../tool/api-helper';

class QuestionEditReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = QuestionEditReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    if (!isLogin()) {
      return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
    }
    return (
      <div style={{backgroundColor:'#FFFFFF',height:'100%',display:'inline-block'}}>
        <ArticleCreate />
      </div>
    );
  }
}

QuestionEditReact.i18n = [
  {},
  {}
];

QuestionEditReact.propTypes = {
  // self
  create: PropTypes.bool.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const QuestionEdit = withRouter(QuestionEditReact);
