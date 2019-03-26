import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import ReviewDes from './containers/reviewDes';

import data from './data';
import Comments from './containers/comment-card-bar';

class ReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null,
    };
    // i18n
    this.text = ReviewReact.i18n[languageHelper()];
  }
  
  componentDidMount() {
    this.setState({
      backend:data.content,
      commentsText:'1条评论'
    });
    
  }

  getCurrentPage(){}
  showCommentsFunc(){}
  
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend !== null) ? (
      <div>
        <ReviewDes
          content={this.state.backend.content}
          user={this.state.backend.user}
          description={this.state.backend.description}
          commentsText={this.state.commentsText}
        />
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <Comments
              getCurrentPage={this.getCurrentPage}
              commentsText={this.state.commentsText}
              commentsType={'answer'}
            />
          </div>
        </div>
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

ReviewReact.i18n = [
  {},
  {}
];

ReviewReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Review = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ReviewReact);
