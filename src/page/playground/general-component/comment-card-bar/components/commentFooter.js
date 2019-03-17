import React from 'react';
import {MDBBtn, MDBIcon, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

import { AddComment } from './add-comment';

export const CommentFooter = (props) => (
  <React.Fragment>
    <MDBRow style={props.stickyRow}>
      <MDBBtn flat style={{
        padding: '5px 0',
        marginLeft: '15px',
        fontSize: '14px',
        color: '#8D9AAF', ...props.basicFont
      }}>
        <MDBIcon style={{marginRight: '5px'}} far icon="thumbs-up" />支持
      </MDBBtn>
      <MDBBtn onClick={props.giveReplies} flat style={{padding: '5px 10px', fontSize: '14px', color: '#8D9AAF', ...props.basicFont}}>
        <MDBIcon style={{marginRight: '5px'}} icon="reply" />
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
  addComments: PropTypes.func.isRequired,
  
  showGive: PropTypes.bool.isRequired,

  stickyRow: PropTypes.object,
  basicFont: PropTypes.object.isRequired,
};
