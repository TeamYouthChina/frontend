import React from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBBtn} from 'mdbreact';
import {languageHelper} from '../../../../../tool/language-helper';

import { AddComment } from './components/add-comment/add-comment';
import CommentCard from './components/comment-card/commentCard';
import { PaginationUse } from './components/pagination';
import classes from './index.module.css';
import Expend from '../public/expand-more.svg';
import { data } from './data';

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
    };
    this.text = Comments.i18n[languageHelper()];
    this.addComments = this.addComments.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.showReplies = this.showReplies.bind(this);
    this.giveReplies = this.giveReplies.bind(this);
  }

  componentDidMount() {
    this.setState({
      commentLists:data.content[this.props.commentsType]
    });
  }
  // 添加评论
  addComments(value){
    this.setState({
      commentLists: [{
        id: new Date(),
        creator:{
          username:'lalala'
        },
        create_at: 123,
        content: value,
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

  getCurrentPage(){}
  
  render() {
    return (this.state.commentLists !== null) ? (
      <div className={classes.wrapper}>
        <MDBRow className={classes.mdbRow}>
          {this.state.commentLists.length}条评论
        </MDBRow>
        <AddComment 
          addComments={this.addComments}
        />
        {this.state.commentLists.map((item) => (
          <CommentCard 
            key={item.id} 
            user={item.creator.username} 
            time={item.create_at} 
            content={item.content}
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
  commentsType: PropTypes.string.isRequired,
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
