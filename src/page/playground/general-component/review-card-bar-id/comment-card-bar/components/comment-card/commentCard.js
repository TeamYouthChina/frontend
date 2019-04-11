import React from 'react';
import PropTypes from 'prop-types';
import {MDBRow, MDBAvatar, MDBCol} from 'mdbreact';

import {CommentContent} from '../../containers/comment-content/commentContent';
import {CommentFooter} from '../../containers/comment-footer/commentFooter';
import classes from './index.module.css';
import expandMore from '../../../public/expand-more.svg';

export class CommentCard extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      showReplies: false,
      showGive: false,
      showCommentsText: '查看回复',
      replyText: '回复',
      commentLists: [],
      allReplies: [],
      evaluateStatus:null,
      downvoteCount:null,
      upvoteCount:null,
    };
    this.showRepliesFunc = this.showRepliesFunc.bind(this);
  }

  componentWillMount() {
    this.setState(()=>({
      backend:{
        evaluateStatus:this.props.evaluateStatus,
        downvoteCount:this.props.downvoteCount,
        upvoteCount:this.props.upvoteCount,
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

  onVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let upvoteCount = this.state.backend.upvoteCount;
    if (evaluateStatus === 1) {
      evaluateStatus = 3;
      upvoteCount--;
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount
        }
      }));
    } else {
      evaluateStatus = 1;
      upvoteCount++
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount
        }
      }));
    }
  };
  
  render(){
    const {backend} = this.state
    return (
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
                giveReplies={this.showRepliesFunc}
                replyText={this.state.replyText}
                showGive={this.state.showGive}
                addComments={this.addComments}
                onVote={this.onVote}
                upvoteCount={backend.upvoteCount}
                evaluateStatus={backend.evaluateStatus}
              />

              <span className={classes.showSpan} onClick={this.showRepliesFunc}>
                {this.state.showCommentsText}<img style={{marginLeft:'0.39vw'}} src={expandMore} alt="" />
              </span>
              {this.state.showReplies ? (
                this.state.allReplies.map((item) => (
                  <MDBRow key={item}>
                    <MDBCol size="12">
                      {/*<ReplyCard addComments={this.addComments} item={item}></ReplyCard>*/}
                    </MDBCol>
                  </MDBRow>)
                )
              ) : null}
            </div>
          </MDBRow>
        </div>
      </div>
    );
  }
}

CommentCard.propTypes = {
  user: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onVote: PropTypes.func,
  upvoteCount: PropTypes.number,
  downvoteCount: PropTypes.number,
  evaluateStatus: PropTypes.number,
};

export default CommentCard;
