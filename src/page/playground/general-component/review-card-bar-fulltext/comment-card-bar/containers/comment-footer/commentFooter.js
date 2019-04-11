import React from 'react';
import {MDBBtn, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

import { AddComment } from '../../components/add-comment/add-comment';
import ThumbUp from '../../../public/thumb-up.svg';
import Comment from '../../../public/comment.svg';

export const CommentFooter = (props) => (
  <React.Fragment>
    <MDBRow style={props.stickyRow}>
      <MDBBtn flat style={{
        padding: '0.39vw 0',
        marginLeft: '1.17vw',
        fontSize: '1.093vw',
        color: '#8D9AAF', ...props.basicFont
      }}>
        <img style={{marginTop:'-.39vw',marginRight:'0.78vw'}} src={ThumbUp} alt="" />
        <span style={{verticalAlign:'bottom'}}>支持</span>
      </MDBBtn>
      <MDBBtn onClick={props.giveReplies} flat style={{padding: '0.39vw 0.78vw', fontSize: '1.093vw', color: '#8D9AAF', ...props.basicFont}}>
        <img style={{marginTop:'-.39vw',marginRight:'0.78vw'}} src={Comment} alt="" />
        {props.replyText}
      </MDBBtn>
    </MDBRow>
    {props.showGive ? (
      <AddComment
        addComments={props.addComments}
        basicFont={props.basicFont}
      />
    ) : null}
  </React.Fragment>
);


CommentFooter.propTypes = {
  giveReplies: PropTypes.func.isRequired,
  replyText: PropTypes.string.isRequired,
  addComments: PropTypes.func,
  
  showGive: PropTypes.bool.isRequired,

  stickyRow: PropTypes.object,
  basicFont: PropTypes.object.isRequired,
};
