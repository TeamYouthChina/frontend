import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {generateHeaders, urlPrefix} from '../../tool/api-helper';
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
      commentsText:'1条评论',
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

  // 点赞
  onVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let upvoteCount = this.state.backend.upvoteCount;
    let downvoteCount = this.state.backend.downvoteCount;
    const data = {
      id:Number(window.localStorage.id)
    };
    // 取消点赞
    if (evaluateStatus === 1) {
      evaluateStatus = 3;
      upvoteCount--;
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}/vote`,
          {
            method: 'DELETE',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount
        }
      }));
    } else if(evaluateStatus === 2) {
      // 取消反对
      evaluateStatus = 1;
      upvoteCount++;
      downvoteCount--;
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}/upvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount,
          downvoteCount
        }
      }));
    } else {
      evaluateStatus = 1;
      upvoteCount++;
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}/upvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount
        }
      }));
    }
  };
  // 反对
  onDownVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let upvoteCount = this.state.backend.upvoteCount;
    let downvoteCount = this.state.backend.downvoteCount;
    const data = {
      id:Number(window.localStorage.id)
    };
    if (evaluateStatus === 2) {
      evaluateStatus = 3;
      downvoteCount--;
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}/vote`,
          {
            method: 'DELETE',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          downvoteCount
        }
      }));
    } else if(evaluateStatus === 3) {
      evaluateStatus = 2;
      downvoteCount++;
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}/downvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          downvoteCount
        }
      }));
    } else {
      evaluateStatus = 2;
      downvoteCount++;
      upvoteCount--;
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}/downvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          downvoteCount,
          upvoteCount
        }
      }));
    }
  };
  
  // 收藏
  onAttention = () => {
    let attention = !this.state.backend.attention;
    this.setState(()=>({
      backend:{
        ...this.state.backend,
        attention:attention
      }
    }));
    const data = {
      id:Number(window.localStorage.id)
    };
    if(attention) {
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}/attention`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
    } else {
      try {
        fetch(
          `${urlPrefix}/articles/attentions/${this.props.match.params.id}`,
          {
            method: 'DELETE',
            headers: generateHeaders(),
            body: null
          },
        );
      } catch (e) {
        alert(e);
      }
    }
  };
  
  testRole = (author)=> {
    if(author === null) {
      return author;
    } else if(author.role === null){
      return null;
    } else {
      return author.role[0];
    }
  };
  
  onTellParent = (length) => {
    this.setState(()=>({
      commentsText:`${length}条评论`
    }));
  };
  
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
          description={this.testRole(backend.author)} 
          commentsText={this.state.commentsText}
          evaluateStatus={backend.evaluateStatus}
          onAttention={this.onAttention}
          onVote={this.onVote}
          onDownVote={this.onDownVote}
          downvoteCount={backend.downvoteCount}
          attention={backend.attention}
          attentionCount={backend.attentionCount}
          upvoteCount={backend.upvoteCount}
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
                type={'articles'}
                showComments={this.showCommentsFunc}
                getCurrentPage={this.getCurrentPage}
                commentsText={this.state.commentsText}
                onTellParent={this.onTellParent}
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
