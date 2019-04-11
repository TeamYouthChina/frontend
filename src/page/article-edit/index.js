import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import ArticleCreate from './components/edit';


class ArticleEditReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ArticleEditReact.i18n[languageHelper()];
  }

  shouldComponentUpdate() {
    return false;
  }


  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <ArticleCreate />
      </div>
    );
  }
}

ArticleEditReact.i18n = [
  {},
  {}
];

ArticleEditReact.propTypes = {
  // self
  create: PropTypes.bool.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const ArticleEdit = withRouter(ArticleEditReact);
