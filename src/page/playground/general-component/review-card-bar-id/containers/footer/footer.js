import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';
import classes from './index.module.css';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../../../tool/language-helper';

const Footer = (props) => (
  <Fragment>
    <MDBRow style={props.stickyRow}>
      <MDBCol className={classes.mdbCol} size="3">
        <span className={classes.editTime}>
          {props.editTime}
        </span>
      </MDBCol>
      <MDBCol size="9">
        <div className={classes.btnWrapper}>
          <MDBBtn className={classes.btnStyle} flat>
            <MDBIcon className={classes.iconStyle} far icon="thumbs-up"/>{props.text.thumb}
          </MDBBtn>
          <MDBBtn className={classes.btnStyle} flat>
            <MDBIcon className={classes.iconStyle} far icon="heart"/>{props.text.collection}
          </MDBBtn>
          <MDBBtn className={classes.btnStyle} flat>
            <MDBIcon className={classes.iconStyle} far icon="comment"/>{props.commentsText}
          </MDBBtn>
          <MDBBtn className={classes.btnStyle} flat>
            <MDBIcon className={classes.iconStyle} far icon="share"/>{props.text.share}
          </MDBBtn>
          {/*<MDBBtn flat style={{padding: '5px 10px',}}>*/}
          {/*<MDBIcon style={{marginRight: '5px'}} icon="ban"/>*/}
          {/*举报*/}
          {/*</MDBBtn>*/}
          {props.isCollapsed ? null :
            <MDBBtn className={classes.btnStyle} onClick={props.handleSpanClick} flat>
              {props.text.ellipsis}
              {/*<MDBIcon style={{marginRight: '5px'}} icon="arrow-up"/>*/}
            </MDBBtn>}
        </div>

      </MDBCol>

    </MDBRow>
  </Fragment>
);

Footer.propTypes = {
  // self-data
  editTime: PropTypes.string.isRequired,
  commentsText: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired,
  // func
  showComments: PropTypes.func.isRequired,
  handleSpanClick: PropTypes.func.isRequired,
  // style
  stickyRow: PropTypes.object.isRequired,
};

const i18n = [
  {
    thumb:'点赞',
    collection:'收藏',
    share:'分享',
    ellipsis:'收起',
  },
  {
    thumb:'thumb',
    collection:'collect',
    share:'share',
    ellipsis:'ellipsis'
  }
];

export default connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth,
      text: i18n[languageHelper()]
    };
  }
)(Footer);
