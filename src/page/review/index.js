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
import Share from './containers/share';

class ReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null,
      commentsText: null,
      showShare: false
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
            commentsText: `${result.content.comments.length}条评论`
          }));
        } else {
          this.props.history.push('/page-not-found');
        }
      } catch (e) {
        alert(e);
      }
    } else {
      this.props.history.push(`/login?to=${this.props.location.pathname}`);
    }
  }

  // 点赞
  onVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let upvoteCount = this.state.backend.upvoteCount;
    let downvoteCount = this.state.backend.downvoteCount;
    const data = {
      id: Number(window.localStorage.id)
    };
    // 取消点赞
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
    } else if (evaluateStatus === 2) {
      // 取消反对
      evaluateStatus = 1;
      upvoteCount++;
      downvoteCount--;
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
          upvoteCount,
          downvoteCount
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
  // 反对
  onDownVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let upvoteCount = this.state.backend.upvoteCount;
    let downvoteCount = this.state.backend.downvoteCount;
    const data = {
      id: Number(window.localStorage.id)
    };
    if (evaluateStatus === 2) {
      evaluateStatus = 3;
      downvoteCount--;
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
          downvoteCount
        }
      }));
    } else if (evaluateStatus === 3) {
      evaluateStatus = 2;
      downvoteCount++;
      try {
        fetch(
          `${urlPrefix}/editorials/${this.props.match.params.id}/downvote`,
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
          `${urlPrefix}/editorials/${this.props.match.params.id}/downvote`,
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
    this.setState(() => ({
      backend: {
        ...this.state.backend,
        attention: attention
      }
    }));
    const data = {
      id: Number(window.localStorage.id)
    };
    if (attention) {
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
  // 上传评论数
  onTellParent = (length) => {
    this.setState(() => ({
      commentsText: `${length}条评论`
    }));
  };
  // 分享
  onShare = () => {
    const showShare = !this.state.showShare;
    this.setState(() => ({
      showShare
    }));
  };
  //删除短则
  onDeleteReview = () => {
    try {
      fetch(
        `${urlPrefix}/editorials/${this.props.match.params.id}/`,
        {
          method: 'DELETE',
          headers: generateHeaders(),
          body: null
        },
      );
    } catch (e) {
      alert(e);
    }
    this.props.history.push('/my/profile');
  };

  getCurrentPage() {
  }

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
            title: backend.title,
            detail: backend.body.braftEditorRaw
          }}
          time={timeHelper(backend.modified_at)}
          user={backend.author && backend.author.username}
          description={backend.author && backend.author.role[0]}
          commentsText={this.state.commentsText}
          evaluateStatus={backend.evaluateStatus}
          onAttention={this.onAttention}
          onVote={this.onVote}
          onDownVote={this.onDownVote}
          downvoteCount={backend.downvoteCount}
          attention={backend.attention}
          attentionCount={backend.attentionCount}
          upvoteCount={backend.upvoteCount}
          onShare={this.onShare}
          showShare={this.state.showShare}
          id={backend.author.id}
          reviewId={this.props.match.params.id}
          onDeleteReview={this.onDeleteReview}
        />
        <Share
          content={window.location.href}
          onShare={this.onShare}
          showShare={this.state.showShare}
        />
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div style={{width: '80%'}}>
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
