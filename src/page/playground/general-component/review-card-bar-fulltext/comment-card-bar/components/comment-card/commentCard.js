import React from 'react';
import PropTypes from 'prop-types';
import {MDBRow, MDBIcon, MDBAvatar, MDBCol} from 'mdbreact';

import {CommentContent} from '../../containers/comment-content/commentContent';
import {CommentFooter} from '../../containers/comment-footer/commentFooter';

const basicFont = {
  fontFamily: 'PingFang SC',
  lineHeight: 'normal'
};

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
      <div style={{padding: '0', marginTop: '1.562vw'}}>
        <div>
          <MDBRow style={{margin: '.64vw 0', display: 'flex'}}>
            <MDBAvatar style={{height: '100%', margin: '.469vw .859vw .469vw 0'}}>
              <img
                style={{width: '2.5vw', background: '#F4F4F4'}}
                src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
                alt="123"
                className="rounded-circle"
              />
            </MDBAvatar>
            <div style={{paddingTop: '.391vw', flexGrow: '1'}}>
              <CommentContent
                user={this.props.user}
                time={this.props.time}
                content={this.props.content}
              />
              <CommentFooter
                giveReplies={this.showRepliesFunc}
                replyText={this.state.replyText}
                basicFont={basicFont}
                showGive={this.state.showGive}
                addComments={this.addComments}
              />
              <span onClick={this.showRepliesFunc} style={{fontSize: '1.093vw', color: '#31394D', ...basicFont}}>
                {this.showCommentsText}<MDBIcon style={{marginLeft: '.196vw'}} far icon="arrow-down" /></span>
              {this.showReplies ? (
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
