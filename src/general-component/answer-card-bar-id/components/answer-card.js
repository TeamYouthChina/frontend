import React from 'react';
import PropTypes from 'prop-types';

import Comments from '../comment-card-bar';
import Footer from '../containers/footer/footer';
import Share from '../containers/share';
import Title from '../containers/title/title';
import UserInfor from '../containers/user-infor/user-infor';
import classes from './index.module.css';
import {defaultAva, generateHeaders, get, isLogin, urlPrefix} from '../../../tool/api-helper';
import {languageHelper} from '../../../tool/language-helper';
import {timeHelper} from '../../../tool/time-helper';

export class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 0,
      editorState: null,
      showBottom: false,
      isCollapsed: true,
      authorAvatar: null,
      showComments: false,
      showList: false,
      commentsText: null,
      getFromChildLength: null,
      getFromChild: null,
      comments: null,
      showShare: false,
      pageConfig: {
        totalPage: 14 //总页码
      },
      stickyRow: {background: '#FFFFFF'},
      backend: null
    };
    // function
    this.handleSpanClick = this.handleSpanClick.bind(this);
    this.sliceText = this.sliceText.bind(this);
    this.orderScroll = this.orderScroll.bind(this);
    this.showCommentsFunc = this.showCommentsFunc.bind(this);
    this.onVote = this.onVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
    this.onAttention = this.onAttention.bind(this);
    this.onTellParent = this.onTellParent.bind(this);
    this.onShare = this.onShare.bind(this);
    this.onShowList = this.onShowList.bind(this);
    this.onGoDelete = this.onGoDelete.bind(this);
    // 多语言
    this.text = AnswerCard.i18n[languageHelper()];
  }

  // 展开内容
  handleSpanClick() {
    // console.log(this.props.type,1)
    let isCollapsed = !this.state.isCollapsed;
    if (isCollapsed) {
      // this.divNow.style.height='100px'
      this.setState({
        stickyRow: {background: '#FFFFFF'},
        isCollapsed: true
      });
    } else {
      // this.divNow.style.height='400px'
      this.setState({
        isCollapsed: false,
        stickyRow: {
          background: '#FFFFFF',
          position: 'sticky',
          bottom: '0'
        }
      });
    }
  }

  // 截断文章
  sliceText() {

  }

  // 滚动处理
  orderScroll() {
    let discount = 0;
    if (this.scrollSpan) {
      discount = document.documentElement.clientHeight - this.scrollSpan.getBoundingClientRect().top;
    }
    setTimeout(() => {
      if (!this.state.isCollapsed) {
        if (discount > 250) {
          this.setState({
            showBottom: true,
          });
        } else if (discount < 240) {
          this.setState({
            showBottom: false,
          });
        }

      }
    }, 100);
  }

  // 展开评论
  showCommentsFunc() {
    let commentsTextNow = '';
    let showComments = false;
    if (this.state.getFromChild !== null) {
      commentsTextNow = this.state.commentsText === `${this.state.getFromChildLength}条评论` ? '收起评论' : `${this.state.getFromChildLength}条评论`;
      showComments = this.state.commentsText === `${this.state.getFromChildLength}条评论`;
    } else {
      if (this.state.backend.comments !== undefined) {
        commentsTextNow = this.state.commentsText === `${this.state.backend.comments.comments.length}条评论` ? '收起评论' : `${this.state.backend.comments.comments.length}条评论`;
        showComments = this.state.commentsText === `${this.state.backend.comments.comments.length}条评论`;
      } else {
        commentsTextNow = this.state.commentsText === `${this.state.comments.data.length}条评论` ? '收起评论' : `${this.state.comments.data.length}条评论`;
        showComments = this.state.commentsText === `${this.state.comments.data.length}条评论`;
      }
    }
    this.setState({
      commentsText: commentsTextNow,
      showComments
    });
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
      //try {
      fetch(
        `${urlPrefix}/answers/${this.props.answerId}/vote`,
        {
          method: 'DELETE',
          headers: generateHeaders(),
          body: JSON.stringify(data)
        },
      );
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
      //try {
      fetch(
        `${urlPrefix}/articles/${this.props.answerId}/upvote`,
        {
          method: 'PUT',
          headers: generateHeaders(),
          body: JSON.stringify(data)
        },
      );
      //} catch (e) {
      //  alert(e);
      //}
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
      //try {
      fetch(
        `${urlPrefix}/articles/${this.props.answerId}/upvote`,
        {
          method: 'PUT',
          headers: generateHeaders(),
          body: JSON.stringify(data)
        },
      );
      //} catch (e) {
      //  alert(e);
      //}
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
      //try {
      fetch(
        `${urlPrefix}/answers/${this.props.answerId}/vote`,
        {
          method: 'DELETE',
          headers: generateHeaders(),
          body: JSON.stringify(data)
        },
      );
      //} catch (e) {
      //  alert(e);
      //}
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
      //try {
      fetch(
        `${urlPrefix}/answers/${this.props.answerId}/downvote`,
        {
          method: 'PUT',
          headers: generateHeaders(),
          body: JSON.stringify(data)
        },
      );
      //} catch (e) {
      //  alert(e);
      //}
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
      //try {
      fetch(
        `${urlPrefix}/answers/${this.props.answerId}/downvote`,
        {
          method: 'PUT',
          headers: generateHeaders(),
          body: JSON.stringify(data)
        },
      );
      //} catch (e) {
      //  alert(e);
      //}
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
      //try {
      fetch(
        `${urlPrefix}/answers/${this.props.answerId}/attention`,
        {
          method: 'PUT',
          headers: generateHeaders(),
          body: JSON.stringify(data)
        },
      );
      //} catch (e) {
      //  alert(e);
      //}
    } else {
      //try {
      fetch(
        `${urlPrefix}/answers/attentions/${this.props.answerId}`,
        {
          method: 'DELETE',
          headers: generateHeaders(),
          body: null
        },
      );
      //} catch (e) {
      //  alert(e);
      //}
    }
  };

  onTellParent = (length) => {
    let getFromChild = true;
    let getFromChildLength = length;
    this.setState(() => ({
      getFromChild,
      getFromChildLength
    }));
  };

  onShare = () => {
    const showShare = !this.state.showShare;
    this.setState(() => ({
      showShare
    }));
  };

  // 展开下拉菜单
  onShowList = () => {
    const showList = !this.state.showList;
    this.setState(() => ({
      showList
    }));
  };

  // 删除答案
  onGoDelete = () => {
    //try {
    fetch(
      `${urlPrefix}/answers/${this.props.answerId}`,
      {
        method: 'DELETE',
        headers: generateHeaders(),
        body: null
      },
    );
    //} catch (e) {
    //  alert(e);
    //}
  };

  // 添加滚动和获取内容
  componentDidMount() {
    if (isLogin()) {
      window.addEventListener('scroll', this.orderScroll);
      if (this.props.answerId) {
        Promise.all([
          get(`/answers/${this.props.answerId}`),
          get((`/answers/${this.props.answerId}/comments`))
        ]).then((values) => {
          const results = values[0];
          const comments = values[1];
          if (results.status.code.toString().startsWith('2') && comments.status.code.toString().startsWith('2')) {
            if (results.content.creator && results.content.creator.avatar_url >= 10) {
              get(`/static/${results.content.author.avatar_url}`).then((res) => {
                this.setState(() => ({
                  render: 1,
                  authorAvatar: res.content,
                  backend: results.content,
                  comments: comments.content,
                  commentsText: `${comments.content.data.length}条评论`
                }));
              });
            } else {
              this.setState(() => ({
                render: 1,
                authorAvatar: defaultAva,
                backend: results.content,
                comments: comments.content,
                commentsText: `${comments.content.data.length}条评论`
              }));
            }
          } else if (results.status.code.toString().startsWith('401') || comments.status.code.toString().startsWith('401')) {
            this.props.history.push('/login');
          } else {
            /* eslint-disable no-console */
            console.log('answer ID', this.props.answerId);
            console.log('GET /answers/:id', results);
            console.log('GET /answers/:id/comments', comments);
            /* eslint-enable no-console */
            this.setState({
              render: 2
            });
          }
        });
      } else {
        get((`/answers/${this.props.answerId}/comments`)).then((comments) => {
          if (comments.status.code.toString().startsWith('2')) {
            this.setState({
              render: 1,
              backend: this.props.fullText,
              comments: comments.content,
              commentsText: `${comments.content.data.length}条评论`
            });
          } else if (comments.status.code.toString().startsWith('401')) {
            this.props.history.push('/login');
          } else {
            /* eslint-disable no-console */
            console.log('answer ID', this.props.answerId);
            console.log('GET /answers/:id/comments', comments);
            /* eslint-enable no-console */
            this.setState({
              render: 2
            });
          }
        });
      }
    } else {
      this.props.history.push('/login');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.orderScroll);
  }

  render() {
    switch (this.state.render) {
      case 0:
        return (
          <div>
            loading
          </div>
        );
      case 1:
        return (
          <React.Fragment>
            <div className={classes.cardWrapper} ref={(span) => this.scrollSpan = span}>
              <Title
                title={this.props.questionTitle}
                questionId={this.props.questionId}
                answerId={this.props.answerId}
                userId={this.state.backend.creator === null ? 1 : this.state.backend.creator.id}
                onShowList={this.onShowList}
                showList={this.state.backend.showList}
                onGoDelete={this.onGoDelete}
                data={this.state.backend}
              />
              <UserInfor
                score={5}
                user={`${this.state.backend.creator.last_name} ${this.state.backend.creator.first_name}`}
                avatar={this.state.authorAvatar}
                description={this.state.backend.creator.role[0]}
                isCollapsed={this.state.isCollapsed}
                short={this.state.backend.body.previewText}
                content={this.state.backend.body.braftEditorRaw}
                handleSpanClick={this.handleSpanClick}
              />
              <Share
                content={window.location.href}
                onShare={this.onShare}
                showShare={this.state.showShare}
              />
              {
                this.state.showBottom || this.state.isCollapsed ? (
                  <Footer
                    editTime={timeHelper(new Date(this.state.backend.modified_at))}
                    commentsText={this.state.commentsText}
                    isCollapsed={this.state.isCollapsed}
                    showComments={this.showCommentsFunc}
                    handleSpanClick={this.handleSpanClick}
                    stickyRow={this.state.stickyRow}
                    evaluateStatus={this.state.backend.evaluateStatus}
                    onAttention={this.onAttention}
                    onVote={this.onVote}
                    onDownVote={this.onDownVote}
                    downvoteCount={this.state.backend.downvoteCount}
                    attention={this.state.backend.attention}
                    attentionCount={this.state.backend.attentionCount}
                    upvoteCount={this.state.backend.upvoteCount}
                    onShare={this.onShare}
                  />
                ) : null
              }
            </div>
            {this.state.showComments ? (
              <Comments
                id={this.props.ansCommentId !== undefined ? this.props.ansCommentId : this.props.answerId}
                type={'answers'}
                showComments={this.showCommentsFunc}
                getCurrentPage={this.getCurrentPage}
                commentsText={this.state.commentsText}
                onTellParent={this.onTellParent}
              />
            ) : null}
          </React.Fragment>
        );
      default:
        return null;
    }
  }
}

AnswerCard.propTypes = {
  // id
  answerId: PropTypes.number,
  questionId: PropTypes.number.isRequired,
  questionTitle: PropTypes.string.isRequired,
  // 全文
  fullText: PropTypes.object,
  history: PropTypes.object,
  ansCommentId: PropTypes.number,
};

AnswerCard.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default AnswerCard;
