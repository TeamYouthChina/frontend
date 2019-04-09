import React from 'react';
import PropTypes from 'prop-types';
import {MDBRow, MDBIcon, MDBAvatar, MDBCol} from 'mdbreact';

import {CommentContent} from '../../containers/comment-content/commentContent';
import {CommentFooter} from '../../containers/comment-footer/commentFooter';
import classes from './index.module.css';

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
    };
    this.showRepliesFunc = this.showRepliesFunc.bind(this);
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
  
  render(){
    return (
      <div className={classes.wrapper}>
        <div>
          <MDBRow className={classes.mdbRow}>
            <MDBAvatar className={classes.avatar}>
              <img
                src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
                alt="123"
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
              />

              <span className={classes.showSpan} onClick={this.showRepliesFunc} flat>
                {this.state.showCommentsText}<MDBIcon className={classes.iconStyle} far icon="arrow-down" />
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
  time: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default CommentCard;
