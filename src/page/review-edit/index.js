import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import ReviewCreate from './components/edit';
import classes from './index.module.css';
import {isLogin} from '../../tool/api-helper';

class ReviewEditReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ReviewEditReact.i18n[languageHelper()];
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
      <div className={classes.wrapper}>
        <ReviewCreate />
      </div>
    );
  }
}

ReviewEditReact.i18n = [
  {},
  {}
];

ReviewEditReact.propTypes = {
  // self
  create: PropTypes.bool.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const ReviewEdit = ReviewEditReact;
