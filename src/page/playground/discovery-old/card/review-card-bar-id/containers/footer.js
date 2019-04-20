import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';



const Footer = (props) => (
  <Fragment>
    <MDBRow style={props.stickyRow}>
      <MDBCol size="3" style={{display:'flex',alignItems:'center'}}>
        <span style={{color: '#8D9AAF', fontSize: '1.094vw', ...props.basicFont}}>
          {props.editTime}
        </span>
      </MDBCol>
      <MDBCol size="9">
        <div style={{float: 'right',marginRight:'-1.172vw'}}>
          <MDBBtn flat style={{
            padding: '0.391vw 0.781vw',
            marginLeft: '1.172vw',
            fontSize: '1.094vw',
            color: '#8D9AAF', ...props.basicFont
          }}>
            <MDBIcon style={{marginRight: '0.391vw'}} far icon="thumbs-up"/>点赞
          </MDBBtn>
          <MDBBtn flat style={{padding: '0.391vw 0.782vw', fontSize: '1.094vw', color: '#8D9AAF', ...props.basicFont}}>
            <MDBIcon style={{marginRight: '0.391vw'}} icon="heart"/>收藏
          </MDBBtn>
          <MDBBtn onClick={props.showComments} flat style={{padding: '0.391vw 0.782vw', fontSize: '1.094vw', color: '#8D9AAF', ...props.basicFont}}>
            <MDBIcon style={{marginRight: '0.391vw'}} far icon="comment"/>{props.commentsText}
          </MDBBtn>
          <MDBBtn flat style={{padding: '0.391vw 0.782vw', fontSize: '1.094vw', color: '#8D9AAF', ...props.basicFont}}>
            <MDBIcon style={{marginRight: '0.391vw'}} icon="share"/>分享
          </MDBBtn>
          {/*<MDBBtn flat style={{padding: '5px 10px',}}>*/}
          {/*<MDBIcon style={{marginRight: '5px'}} icon="ban"/>*/}
          {/*举报*/}
          {/*</MDBBtn>*/}
          {props.isCollapsed ? null :
            <MDBBtn onClick={props.handleSpanClick} flat style={{padding: '0.391vw 0.782vw', color: '#4F65E1', fontSize: '1.094vw', ...props.basicFont}}>
              收起
              {/*<MDBIcon style={{marginRight: '5px'}} icon="arrow-up"/>*/}
            </MDBBtn>}
        </div>

      </MDBCol>

    </MDBRow>
  </Fragment>
);

Footer.defaultProps = {
  title: '123',
  basicFont:{
    fontFamily: 'PingFang SC',
    lineHeight: 'normal'
  }
};

Footer.propTypes = {
  // self-data
  editTime: PropTypes.string.isRequired,
  commentsText: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  // func
  showComments: PropTypes.func.isRequired,
  handleSpanClick: PropTypes.func.isRequired,
  // style
  basicFont:PropTypes.object.isRequired,
  stickyRow: PropTypes.object.isRequired,
};

export default Footer;
