import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import classes from './index.module.css';
import ReviewDes from './containers/reviewDes';
import Comments from './components/comment-card-bar';
import {generateHeaders, getAsync, isLogin, urlPrefix} from '../../tool/api-helper';
import {timeHelper} from '../../tool/time-helper';

class ReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null,
      commentsText:null
    };
    // i18n
    this.text = ReviewReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (isLogin()) {
      const id = this.props.match.params.id;
      try {
        const result = await getAsync(`/editorials/${id}`);
        if (result.status.code === 200) {
          this.setState(() => ({
            backend: result.content,
            commentsText:`${result.content.comments.length}条评论`
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
    const data = {
      id:Number(window.localStorage.id)
    };
    if (evaluateStatus === 1) {
      evaluateStatus = 3;
      upvoteCount--;
      try {
        fetch(
          `${urlPrefix}/editorials/${this.props.match.params.id}/vote`,
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
    } else {
      evaluateStatus = 1;
      upvoteCount++;
      try {
        fetch(
          `${urlPrefix}/editorials/${this.props.match.params.id}/upvote`,
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
          `${urlPrefix}/editorials/${this.props.match.params.id}/attention`,
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
          `${urlPrefix}/editorials/attentions/${this.props.match.params.id}`,
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
        <ReviewDes
          content={{
            title:backend.title,
            detail:backend.body.braftEditorRaw
          }}
          time={timeHelper(backend.modified_at)}
          user={backend.author && backend.author.username}
          description={backend.author && backend.author.role[0]}
          commentsText={this.state.commentsText}
          evaluateStatus={backend.evaluateStatus}
          onAttention={this.onAttention}
          onVote={this.onVote}
          attention={backend.attention}
          attentionCount={backend.attentionCount}
          upvoteCount={backend.upvoteCount}
        />
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div style={{width:'80%'}}>
              <Comments
                id={this.props.match.params.id}
                type={'editorials'}
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

ReviewReact.i18n = [
  {},
  {}
];

ReviewReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Review = ReviewReact;
