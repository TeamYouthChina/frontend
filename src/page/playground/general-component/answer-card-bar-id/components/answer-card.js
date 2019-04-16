import React from 'react';
// import BraftEditor from 'braft-editor';
import PropTypes from 'prop-types';
import {languageHelper} from '../../../../../tool/language-helper';
import {generateHeaders, getAsync, urlPrefix} from '../../../../../tool/api-helper';
import UserInfor from '../containers/user-infor/user-infor';
import Comments from '../comment-card-bar';
import Footer from '../containers/footer/footer';
import classes from './index.module.css';
import Title from '../containers/title/title';
import {isLogin} from '../../../../../tool/api-helper';
import {timeHelper} from '../../../../../tool/time-helper';

export class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      showBottom: false,
      isCollapsed: false,
      showComments: false,
      commentsText: null,
      getFromChildLength:null,
      getFromChild:null,
      comments: null,
      pageConfig: {
        totalPage: 14 //总页码
      },
      stickyRow: {background: '#FFFFFF'},
      backend: null
    };
    this.sliceText = this.sliceText.bind(this);
    this.orderScroll = this.orderScroll.bind(this);
    this.handleSpanClick = this.handleSpanClick.bind(this);
    this.showCommentsFunc = this.showCommentsFunc.bind(this);
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
    if(this.state.getFromChild !== null){
      commentsTextNow = this.state.commentsText === `${this.state.getFromChildLength}条评论` ? '收起评论' : `${this.state.getFromChildLength}条评论`;
      showComments = this.state.commentsText === `${this.state.getFromChildLength}条评论`;
    } else {
      if(this.state.backend.comments !== undefined) {
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

  // 添加滚动和获取内容
  async componentDidMount() {
    if (isLogin()) {
      window.addEventListener('scroll', this.orderScroll);
      let comments = null;
      try {
        comments = await getAsync(`/answers/${this.props.answerId}/comments`);
      } catch (e) {
        alert(e);
      }
      if (this.props.answerId !== undefined) {
        try {
          const results = await getAsync(`/answers/${this.props.answerId}`);
          if (results.status.code === 200) {
            this.setState(() => ({
              backend: results.content,
              comments: comments.content,
              commentsText: `${comments.content.data.length}条评论`
            }));
          } else {
            this.props.history.push('/page-no-found');
          }
        } catch (e) {
          alert(e);
        }
      } else {
        this.setState({
          backend: this.props.fullText,
          comments: comments.content,
          commentsText: `${comments.content.data.length}条评论`
        });

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
          `${urlPrefix}/answers/${this.props.answerId}/vote`,
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
          `${urlPrefix}/answers/${this.props.answerId}/upvote`,
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
          `${urlPrefix}/answers/${this.props.answerId}/attention`,
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
          `${urlPrefix}/answers/attentions/${this.props.answerId}`,
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
    let getFromChild = true;
    let getFromChildLength = length;
    this.setState(()=>({
      getFromChild,
      getFromChildLength
    }));
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.orderScroll);
  }

  render() {
    const backend = this.state.backend;
    return (this.state.backend !== null) ? (
      <React.Fragment>
        <div className={classes.cardWrapper} ref={(span) => this.scrollSpan = span}>
          <Title
            title={this.props.questionTitle}
            questionId={this.props.questionId}
            answerId={this.props.answerId}
          />
          <UserInfor
            score={5}
            user={backend.creator.username}
            description={backend.creator.role[0]}
            isCollapsed={this.state.isCollapsed}
            short={backend.body.previewText}
            content={backend.body.braftEditorRaw}
            handleSpanClick={this.handleSpanClick}
          />
          {this.state.showBottom || !this.state.isCollapsed ? (
            <Footer
              editTime={timeHelper(new Date(backend.modified_at))}
              commentsText={this.state.commentsText}
              isCollapsed={this.state.isCollapsed}
              showComments={this.showCommentsFunc}
              handleSpanClick={this.handleSpanClick}
              stickyRow={this.state.stickyRow}
              evaluateStatus={backend.evaluateStatus}
              onAttention={this.onAttention}
              onVote={this.onVote}
              attention={backend.attention}
              attentionCount={backend.attentionCount}
              upvoteCount={backend.upvoteCount}
            />
          ) : null}
        </div>
        {this.state.showComments ? (
          <Comments
            id={this.props.ansCommentId}
            type={'answers'}
            showComments={this.showCommentsFunc}
            getCurrentPage={this.getCurrentPage}
            commentsText={this.state.commentsText}
            onTellParent={this.onTellParent}
          />
        ) : null}
      </React.Fragment>
    ) : (
      <div>
        loading
      </div>
    );
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
