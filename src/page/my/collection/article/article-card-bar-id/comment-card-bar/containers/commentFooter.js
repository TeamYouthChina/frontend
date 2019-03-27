import React from 'react';
import {MDBBtn, MDBIcon, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

import { AddComment } from '../components/add-comment';

export const CommentFooter = (props) => (
  <React.Fragment>
    <MDBRow style={props.stickyRow}>
      <MDBBtn flat style={{
        padding: '0.39vw 0',
        marginLeft: '1.17vw',
        fontSize: '1.093vw',
        color: '#8D9AAF', ...props.basicFont
      }}>
        <MDBIcon style={{marginRight: '0.39vw'}} far icon="thumbs-up" />支持
      </MDBBtn>
      <MDBBtn onClick={props.giveReplies} flat style={{padding: '0.39vw 0.78vw', fontSize: '1.093vw', color: '#8D9AAF', ...props.basicFont}}>
        <MDBIcon style={{marginRight: '0.39vw'}} icon="reply" />
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
