import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import ArticleDes from './containers/articleDes';
import Comments from './components/comment-card-bar';
import {getAsync, isLogin} from '../../tool/api-helper';
import {timeHelper} from '../../tool/time-helper';
import classes from './index.module.css';

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

  async componentDidMount() {
    if (isLogin()) {
      const id = this.props.match.params.id;
      try {
        const result = await getAsync(`/articles/${id}`);
        const comments = await getAsync(`/articles/${id}/comments`);
        if (result.status.code === 200) {
          this.setState(() => ({
            backend: result.content,
            comments:comments.content,
            commentsText:`${comments.content.data.length}条评论`
          }));
        } else {
          this.props.history.push('/page-not-found');
        }
      } catch (e) {
        alert(e);
      }
    } else {
      this.props.history.push('/login');
    }
  }

  getCurrentPage(){}

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    const backend = this.state.backend;
    return (this.state.backend !== null) ? (
      <div className={classes.wrapper}>
        <ArticleDes
          title={backend.title}
          time={timeHelper(backend.modified_at)}
          content={backend.body.braftEditorRaw} 
          user={backend.author === null ? backend.author : backend.author.username} 
          description={backend.author === null ? backend.author : backend.author.role[0]} 
          commentsText={this.state.commentsText}
        />
        <div style={{marginTop:'70px'}}
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div style={{width:'81%'}}>
              <Comments
                id={this.props.match.params.id}
                type={'answers'}
                showComments={this.showCommentsFunc}
                getCurrentPage={this.getCurrentPage}
                commentsText={this.state.commentsText}
                commentsData={backend.comments === undefined ? this.state.comments.data : backend.comments.comments}
              />
            </div>
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
