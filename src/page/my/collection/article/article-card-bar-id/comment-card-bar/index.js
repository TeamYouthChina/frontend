import React from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBBtn} from 'mdbreact';
import {languageHelper} from '../../../../../../tool/language-helper';

import { AddComment } from './components/add-comment/add-comment';
import CommentCard from './components/comment-card/commentCard';
import { PaginationUse } from './components/pagination';
import classes from './index.module.css';
import Expend from '../public/expand-more.svg';
import {generateHeaders, isLogin, urlPrefix} from '../../../../../../tool/api-helper';
import {timeHelper} from '../../../../../../tool/time-helper';

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      commentLists:null,
      showReplies: false,
      showGive: false,
      showCommentsText: '查看回复',
      replyText: '回复',
      allReplies: [],
      start:0,
      end:3,
    };
    this.text = Comments.i18n[languageHelper()];
    this.addComments = this.addComments.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.showReplies = this.showReplies.bind(this);
    this.giveReplies = this.giveReplies.bind(this);
  }

  componentDidMount() {
    if(isLogin()){
      this.setState(()=>({
        commentLists:this.props.commentsData
      }));
    } else {
      this.props.history.push('/login');
    }
    
  }
  // 添加评论
  addComments(value){
    let localStorage = window.localStorage;
    const data = {
      body: value,
      is_anonymous: false
    };
    try {
      fetch(
        `${urlPrefix}/${this.props.type}/${this.props.id}/comments`,
        {
          method:'POST',
          headers:generateHeaders(),
          body:JSON.stringify(data)
        },
      );
    } catch (e) {
      alert(e);
    }
    this.setState({
      commentLists: [{
        id: localStorage.id,
        creator:{
          username:'lalala'
        },
        modified_at: new Date().getTime(),
        body: value,
        upvoteCount:0,
        downvoteCount:0,
        evaluateStatus:3,
      }, ...this.state.commentLists]
    });
  }
  // 查看回复
  showReplies(){
    let reply = !this.state.showReplies;
    let text = this.state.showCommentsText === '查看回复' ? '收起回复' : '查看回复';
    this.setState({
      showReplies:reply,
      showCommentsText:text
    });
  }
  // 添加回复
  giveReplies(){
    let show = !this.state.showGive;
    let text = this.state.replyText === '回复' ? '取消回复' : '回复';
    this.setState({
      showGive:show,
      replyText:text
    });
  }

  getCurrentPage(index){
    const start = 3 * (index-1);
    const end = 3 * index;
    this.setState({
      start,
      end
    });
  }
  
  render() {
    return (this.state.commentLists !== null) ? (
      <div className={classes.wrapper}>
        <MDBRow className={classes.mdbRow}>
          {this.state.commentLists.length}条评论
        </MDBRow>
        <AddComment 
          addComments={this.addComments}
        />
        {this.state.commentLists.length < 3 ? this.state.commentLists.map((item) => (
          <CommentCard
            key={item.modified_at}
            user={item.creator.username}
            time={timeHelper(item.modified_at)}
            content={item.body}
            upvoteCount={item.upvoteCount}
            downvoteCount={item.downvoteCount}
            evaluateStatus={item.evaluateStatus}
            addComments={this.addComments}
          />
        )) : this.state.commentLists.slice(this.state.start, this.state.end).map((item)=>(
          <CommentCard
            key={item.id}
            user={item.creator.username}
            time={timeHelper(item.modified_at)}
            content={item.body}
            upvoteCount={item.upvoteCount}
            downvoteCount={item.downvoteCount}
            evaluateStatus={item.evaluateStatus}
            addComments={this.addComments}
          />
        ))}
        {this.state.commentLists.length !== 0 ? (
          <MDBRow center className={classes.pagination}>
            <PaginationUse
              pageConfig={{totalPage: Math.ceil(this.state.commentLists.length / 3)}}
              pageCallbackFn={this.getCurrentPage}
            />
          </MDBRow>
        ) : null}
        <MDBRow center className={classes.mdbRow2}>
          <MDBBtn className={classes.btnStyle} onClick={this.props.showComments} flat>
            收起评论<img src={Expend} className={classes.iconStyle} alt='up' />
          </MDBBtn>
        </MDBRow>
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

Comments.propTypes = {
  // 评论text
  commentsText: PropTypes.string.isRequired,
  commentsData: PropTypes.array.isRequired,
  history: PropTypes.object,
  id: PropTypes.number,
  type: PropTypes.string,
  // 收起评论
  showComments: PropTypes.func.isRequired,
  
};

Comments.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default Comments;
