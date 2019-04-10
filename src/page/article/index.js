import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import ArticleDes from './containers/articleDes';
import data from './data';
import Comments from './components/comment-card-bar';

class ArticleReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null,
      commentsText:'1条评论'
    };
    // i18n
    this.text = ArticleReact.i18n[languageHelper()];
  }
  
  componentDidMount() {
    this.setState({
      backend:data.content
    });
  }

  getCurrentPage(){}

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend !== null) ? (
      <div>
        <ArticleDes 
          tags={this.state.backend.tags} 
          content={this.state.backend.content} 
          user={this.state.backend.user} 
          description={this.state.backend.description} 
          commentsText={this.state.commentsText}
        />
        <div style={{marginTop:'70px'}}
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

ArticleReact.i18n = [
  {},
  {}
];

ArticleReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Article = ArticleReact;
