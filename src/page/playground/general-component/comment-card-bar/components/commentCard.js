import React from 'react';
import PropTypes from 'prop-types';
import {MDBRow, MDBIcon, MDBAvatar, MDBCol} from 'mdbreact';
import {connect} from 'react-redux';

import {CommentContent} from '../containers/commentContent';
import {CommentFooter} from './commentFooter';

import {action} from '../store';

export const CommentCard = (props) => (
  <div style={{padding: '0px', marginTop: '20px'}}>
    <div>
      <MDBRow style={{margin: '8px 0px', display: 'flex'}}>
        <MDBAvatar style={{marginRight: '10px', flexGrow: '0'}}>
          <img
            style={{width: '32px', background: '#F4F4F4'}}
            src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
            alt=""
            className="rounded-circle"
          />
        </MDBAvatar>
        <div style={{paddingTop: '5px', flexGrow: '1'}}>
          <CommentContent 
            user={props.user} 
            time={props.time} 
            content={props.content}
          />
          <CommentFooter
            giveReplies={props.showRepliesFunc}
            replyText={props.replyText} 
            basicFont={props.basicFont}
            showGive={props.showGive}
            addComments={props.addComments}
          />
          
          <span onClick={() => props.showRepliesFunc(props.showReplies, props.showCommentsText)} flat="true" style={{fontSize: '14px', color: '#31394D', ...props.basicFont}}>
            {props.showCommentsText}<MDBIcon style={{marginLeft: '5px'}} far icon="arrow-down" /></span>
          {props.showReplies ? (
            props.allReplies.map((item) => (
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

const mapStateToProps = (state) => ({
  showReplies: state.comment.showReplies,
  showGive: state.comment.showGive,
  showCommentsText: state.comment.showCommentsText,
  replyText: state.comment.replyText,
  stickyRow: state.comment.stickyRow,
  allReplies: state.comment.allReplies,
  basicFont: state.comment.basicFont,
});

const mapDispatchToProps = (dispatch) => ({

  initialCommentData: () => {
    dispatch(action.initialCommentData());
  },
  showRepliesFunc: (showReplies, commentsText) => {
    dispatch(action.showReplies(showReplies, commentsText));
  },
  giveReplies: (showGive, giveComments) => {
    dispatch(action.giveReplies(showGive, giveComments));
  },
  addComments: (newComment) => {
    dispatch(action.addComments(newComment));
  },
  getCurrentPage: () => {

  }
});

CommentCard.propTypes = {
  user: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  replyText: PropTypes.string.isRequired,
  allReplies: PropTypes.array.isRequired,
  showCommentsText: PropTypes.string.isRequired,
  showGive: PropTypes.bool.isRequired,
  showReplies: PropTypes.bool.isRequired,
  
  basicFont: PropTypes.object.isRequired,
  
  addComments: PropTypes.func.isRequired,
  showRepliesFunc: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);
