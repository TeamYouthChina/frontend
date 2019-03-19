import React from 'react';
import PropTypes from 'prop-types';
import {MDBIcon, MDBRow} from 'mdbreact';

export const CommentContent = (props) => (
  <React.Fragment>
    <div>
      <span style={{
        marginRight: '10px',
        padding: '5px 0px',
        color: '#31394D',
        fontSize: '16px', ...props.basicFont
      }}>
        {props.user}
      </span>
      <span style={{
        padding: '5px 0px',
        color: '#8D9AAF',
        justifyContent: 'flex-start',
        fontSize: '16px', ...props.basicFont
      }}>{props.time}个月前
      </span>
      <MDBIcon style={{float: 'right'}} icon="ellipsis-v" />
    </div>
    

    <MDBRow style={{
      color: '#31394D',
      fontSize: '14px', ...props.basicFont,
      margin: '0px',
      marginTop: '7px',
    }}>{props.content}
    </MDBRow>
  </React.Fragment>
);

CommentContent.propTypes = {
  basicFont: PropTypes.object,

  user: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};
