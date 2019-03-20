import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';



const Footer = (props) => (
  <Fragment>
    <MDBRow style={props.stickyRow}>
      <MDBCol size="12" md="3" middle>
        <span style={{color: '#8D9AAF', fontSize: '14px', ...props.basicFont}}>
          {props.editTime}
        </span>
      </MDBCol>
      <MDBCol size="9">
        <div style={{float: 'right',marginRight:'-15px'}}>
          <MDBBtn flat style={{
            padding: '5px 10px',
            marginLeft: '15px',
            fontSize: '14px',
            color: '#8D9AAF', ...props.basicFont
          }}>
            <MDBIcon style={{marginRight: '5px'}} far icon="thumbs-up"/>点赞
          </MDBBtn>
          <MDBBtn flat style={{padding: '5px 10px', fontSize: '14px', color: '#8D9AAF', ...props.basicFont}}>
            <MDBIcon style={{marginRight: '5px'}} icon="heart"/>收藏
          </MDBBtn>
          <MDBBtn onClick={props.showComments} flat style={{padding: '5px 10px', fontSize: '14px', color: '#8D9AAF', ...props.basicFont}}>
            <MDBIcon style={{marginRight: '5px'}} far icon="comment"/>{props.commentsText}
          </MDBBtn>
          {/*<MDBBtn flat style={{padding: '5px 10px',}}>*/}
          {/*<MDBIcon style={{marginRight: '5px'}} icon="ban"/>*/}
          {/*举报*/}
          {/*</MDBBtn>*/}
          {props.isCollapsed ? null :
            <MDBBtn onClick={props.handleSpanClick} flat style={{padding: '5px 10px', color: '#4F65E1', fontSize: '14px', ...props.basicFont}}>
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
