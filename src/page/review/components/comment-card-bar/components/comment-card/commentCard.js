import React from 'react';
import PropTypes from 'prop-types';
import {MDBRow, MDBAvatar} from 'mdbreact';

import {CommentContent} from '../../containers/comment-content/commentContent';
import {CommentFooter} from '../../containers/comment-footer/commentFooter';
import classes from './index.module.css';
import expandMore from '../../../../public/expand-more.svg';
import {urlPrefix, generateHeaders} from '../../../../../../tool/api-helper';
import Reply from '../replies';


export class CommentCard extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      showReplies: false,
      showGive: false,
      showCommentsText: '查看回复',
      replyText: '回复',
      commentLists: [],
      evaluateStatus:null,
      downvoteCount:null,
      upvoteCount:null,
      backend:null,
    };
    this.showRepliesFunc = this.showRepliesFunc.bind(this);
  }
  

  componentDidMount() {
    const {evaluateStatus, downvoteCount, upvoteCount} = this.props;
    this.setState(()=>({
      backend:{
        evaluateStatus,
        downvoteCount,
        upvoteCount,
      }
    }));
  }

  showRepliesFunc(){
    let reply = !this.state.showReplies;
    let text = this.state.showCommentsText === '查看回复' ? '收起回复' : '查看回复';
    this.setState({
      showReplies:reply,
      showCommentsText:text
    });
  }
  
  giveReplies(){
    let show = !this.state.showGive;
    let text = this.state.replyText === '回复' ? '取消回复' : '回复';
    this.setState({
      showGive:show,
      replyText:text
    });
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
          `${urlPrefix}/comments/${this.props.id}/vote`,
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
          `${urlPrefix}/comments/${this.props.id}/upvote`,
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
          `${urlPrefix}/comments/${this.props.id}/upvote`,
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
          `${urlPrefix}/comments/${this.props.id}/vote`,
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
          `${urlPrefix}/comments/${this.props.id}/downvote`,
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
          `${urlPrefix}/comments/${this.props.id}/downvote`,
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
  
  onShowReply = () => {
    let showGive = !this.state.showGive;
    this.setState(()=>({
      showGive
    }));
  };
  
  render(){
    const {backend} = this.state;
    return (backend !== null) ? (
      <div className={classes.wrapper}>
        <div>
          <MDBRow className={classes.mdbRow}>
            <MDBAvatar className={classes.avatar}>
              <img
                src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
                alt="avatar"
                className={`rounded-circle ${classes.imgStyle}`}
              />
            </MDBAvatar>
            <div className={classes.commentWrapper}>
              <CommentContent
                user={this.props.user}
                time={this.props.time}
                content={this.props.content}
              />
              <CommentFooter
                onShowReply={this.onShowReply}
                replyText={this.state.replyText}
                showGive={this.state.showGive}
                addComments={this.addComments}
                onVote={this.onVote}
                onDownVote={this.onDownVote}
                upvoteCount={backend.upvoteCount}
                downvoteCount={backend.downvoteCount}
                evaluateStatus={backend.evaluateStatus}
              />
              <span className={classes.showSpan} onClick={this.showRepliesFunc}>
                {this.state.showCommentsText}<img style={{marginLeft:'0.39vw'}} src={expandMore} alt="" />
              </span>
              <Reply showReplies={this.state.showReplies} showGive={this.state.showGive} commentId={this.props.id} />
            </div>
          </MDBRow>
        </div>
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

CommentCard.propTypes = {
  user: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onVote: PropTypes.func,
  upvoteCount: PropTypes.number,
  downvoteCount: PropTypes.number,
  evaluateStatus: PropTypes.number,
  match: PropTypes.object,
};

export default CommentCard;
