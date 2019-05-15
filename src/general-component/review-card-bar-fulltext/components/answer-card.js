import React from 'react';
// import BraftEditor from 'braft-editor';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync} from '../../../tool/api-helper';
import UserInfor from '../containers/user-infor/user-infor';
import Comments from '../comment-card-bar';
import Footer from '../containers/footer/footer';
import classes from './index.module.css';
import {urlPrefix, generateHeaders} from '../../../tool/api-helper';
import {isLogin} from '../../../tool/api-helper';
import {timeHelper} from '../../../tool/time-helper';
import Share from '../../../page/article/containers/share';
/**
 * @description 用于问题详情页下面的answer
 * */
export class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      showBottom: false,
      isCollapsed: true,
      showComments: false,
      commentsText: null,
      showList:false,
      getFromChild:null,
      getFromChildLength:null,
      comments: null,
      pageConfig: {
        totalPage: 14 //总页码
      },
      stickyRow: {background: '#FFFFFF'},
      backend: null,
      showShare:false
    };
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
    }, 500);
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
      if (this.props.reviewId !== undefined) {
        try {
          const results = await getAsync(`/editorials/${this.props.reviewId}`);
          if (results.status.code === 200) {
            this.setState(() => ({
              backend: results.content,
              commentsText: `${results.content.comments.length}条评论`
            }));
          } else {
            this.props.history.push('/page-no-found');
          }
        } catch (e) {
          alert(e);
        }
      } else {
        if(this.props.type === 'fromQuestion'){
          // 这里是因为question那边用的是这个卡片....
          const result = await getAsync(`/answers/${this.props.ansCommentId}/comments`);
          this.setState({
            backend: this.props.fullText,
            comments: result.content,
            commentsText: `${result.content.data.length}条评论`
          });
        } else {
          this.setState(() => ({
            backend: this.props.fullText,
            commentsText: this.props.fullText.comments === [] ? `${this.props.fullText.comments.length}条评论` : `${this.props.fullText.comments.comments.length}条评论`
          }));
        }
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
    let id = this.props.reviewId === undefined ? this.state.backend.id : this.props.reviewId;
    let type = this.props.type === 'fromQuestion' ? 'answers' : 'editorials';
    if (evaluateStatus === 1) {
      evaluateStatus = 3;
      upvoteCount--;
      try {
        fetch(
          `${urlPrefix}/${type}/${id}/vote`,
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
    } else if(evaluateStatus === 3) {
      evaluateStatus = 1;
      upvoteCount++;
      try {
        fetch(
          `${urlPrefix}/${type}/${id}/upvote`,
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
    } else {
      evaluateStatus = 1;
      upvoteCount++;
      downvoteCount--;
      try {
        fetch(
          `${urlPrefix}/${type}/${id}/upvote`,
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
    }
  };
  // 反对
  onDownVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let downvoteCount = this.state.backend.downvoteCount;
    let upvoteCount = this.state.backend.upvoteCount;
    const data = {
      id:Number(window.localStorage.id)
    };
    let id = this.props.reviewId === undefined ? this.state.backend.id : this.props.reviewId;
    let type = this.props.type === 'fromQuestion' ? 'answers' : 'editorials';
    if (evaluateStatus === 2) {
      evaluateStatus = 3;
      downvoteCount--;
      try {
        fetch(
          `${urlPrefix}/${type}/${id}/vote`,
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
          `${urlPrefix}/${type}/${id}/downvote`,
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
          `${urlPrefix}/${type}/${id}/downvote`,
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
    let id = this.props.reviewId === undefined ? this.state.backend.id : this.props.reviewId;
    let type = this.props.type === 'fromQuestion' ? 'answers' : 'editorials';
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
          `${urlPrefix}/${type}/${id}/attention`,
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
          `${urlPrefix}/${type}/attentions/${id}`,
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
  
  testUser = () =>{
    const backend = this.state.backend;
    if(backend.author !== undefined){
      return backend.author === null ? backend.author : backend.author.username;
    } else {
      return backend.creator === null ? backend.creator : backend.creator.username;
    }
  };

  onShare = () =>{
    const showShare = !this.state.showShare;
    this.setState(()=>({
      showShare
    }));
  };

  // 展开下拉菜单
  onShowList = () =>{
    const showList = !this.state.showList;
    this.setState(()=>({
      showList
    }));
  };
  // 直接删除
  onGoDelete = () =>{
    try {
      fetch(
        `${urlPrefix}/answers/${this.state.backend.id}`,
        {
          method: 'DELETE',
          headers: generateHeaders(),
          body: null
        },
      ).then((res)=>(
        res.json()
      )).then(()=>{
        window.location.reload();
      });
    } catch (e) {
      alert(e);
    }
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.orderScroll);
  }

  render() {
    const backend = this.state.backend;
    return (this.state.backend !== null) ? (
      <React.Fragment>
        <div className={classes.cardWrapper} ref={(span) => this.scrollSpan = span}>
          <UserInfor
            score={5}
            reviewId={backend.id}
            user={this.testUser}
            avatar={backend.creator && `${backend.creator.avatar_url}`}
            description={backend.author === undefined ? backend.creator.role[0] : backend.author.role[0]}
            isCollapsed={this.state.isCollapsed}
            short={backend.body.previewText}
            content={backend.body.braftEditorRaw}
            handleSpanClick={this.handleSpanClick}
            userId={backend.author === null ? 1 : backend.author.id}
            onShowList={this.onShowList}
            showList={this.state.showList}
            onGoDelete={this.onGoDelete}
          />
          <Share
            content={window.location.href}
            onShare={this.onShare}
            showShare={this.state.showShare}
            type={this.props.type}
            id={this.props.reviewId === undefined ? this.state.backend.id : this.props.reviewId}
          />
          {this.state.showBottom || this.state.isCollapsed ? (
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
              onDownVote={this.onDownVote}
              attention={backend.attention}
              attentionCount={backend.attentionCount}
              upvoteCount={backend.upvoteCount}
              downvoteCount={backend.downvoteCount}
              onShare={this.onShare}
            />
          ) : null}
        </div>
        {this.state.showComments ? (
          <Comments
            id={this.props.ansCommentId}
            type={this.props.type === 'fromQuestion' ? 'answers' : 'editorials'}
            showComments={this.showCommentsFunc}
            getCurrentPage={this.getCurrentPage}
            onTellParent={this.onTellParent}
            commentsText={this.state.commentsText}
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
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  ansCommentId: PropTypes.number,
  type: PropTypes.string,
  reviewId: PropTypes.number,
  location: PropTypes.object,
  qid: PropTypes.number,
  // 全文
  fullText: PropTypes.object,
};

AnswerCard.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default withRouter(AnswerCard);
