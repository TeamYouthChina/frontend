import React from 'react';
// import BraftEditor from 'braft-editor';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {languageHelper} from '../../../tool/language-helper';
import {defaultAva, generateHeaders, get, getAsync, urlPrefix} from '../../../tool/api-helper';
import UserInfor from '../containers/user-infor/user-infor';
import Comments from '../comment-card-bar';
import Footer from '../containers/footer/footer';
import classes from './index.module.css';
import {isLogin} from '../../../tool/api-helper';
import {timeHelper} from '../../../tool/time-helper';
import Share from '../../../page/article/containers/share';

export class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      showBottom: false,
      isCollapsed: true,
      authorAvatar:null,
      showComments: false,
      showList:false,
      commentsText: null,
      getFromChild:null,
      getFromChildLength:null,
      comments: null,
      showShare:false,
      pageConfig: {
        totalPage: 14 //总页码
      },
      stickyRow: {background: '#FFFFFF'},
      backend: null
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
    if (!this.state.isCollapsed) {
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
        commentsTextNow = this.state.commentsText === `${this.state.backend.comments.length}条评论` ? '收起评论' : `${this.state.backend.comments.length}条评论`;
        showComments = this.state.commentsText === `${this.state.backend.comments.length}条评论`;
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
          let authorAvatar;
          if (results.status.code === 200) {
            this.setState(() => ({
              backend: results.content,
              commentsText: `${results.content.comments.length}条评论`
            }));
            if((results.content.author === null) || (results.content.author.avatar_url.length < 10)){
              authorAvatar = defaultAva;
            } else {
              authorAvatar = results.content.author.avatar_url;
              get(`/static/${authorAvatar}`).then((res)=>{
                this.setState(()=>({
                  authorAvatar:res.content
                }));
              });
            }
          } else {
            this.props.history.push('/page-no-found');
          }
        } catch (e) {
          alert(e);
        }
      } else {
        let result = '';
        try {
          result = await getAsync(`/answers/${this.props.ansCommentId}/comments`);
        } catch (e) {
          alert(e);
        }
        this.setState({
          backend: this.props.fullText,
          comments: result.content,
          commentsText: `${result.content.data.length}条评论`
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
        `${urlPrefix}/editorials/${this.state.backend.id}`,
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
    const {backend, authorAvatar} = this.state;
    return (backend !== null) ? (
      <React.Fragment>
        <div className={classes.cardWrapper} ref={(span) => this.scrollSpan = span}>
          <UserInfor
            score={5} 
            reviewId={backend.id}
            user={backend.author && `${backend.author.first_name} ${backend.author.last_name}`}
            avatar={authorAvatar}
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
            id={this.props.reviewId === undefined ? this.props.ansCommentId : this.props.reviewId}
            type={this.props.type === 'fromQuestion' ? 'answers' : 'editorials'}
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
  reviewId: PropTypes.number,
  history: PropTypes.object.isRequired,
  ansCommentId: PropTypes.number,
  type: PropTypes.string,
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
