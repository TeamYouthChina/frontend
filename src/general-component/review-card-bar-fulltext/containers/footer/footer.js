import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';
import classes from './index.module.css';
// import share from '../../public/share.svg';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../tool/language-helper';
import HalfHeart from '../../public/false.png';
import FullHeart from '../../public/true.png';

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
          <MDBBtn onClick={props.onVote} className={props.evaluateStatus === 1 ? classes.btnStyleActive : classes.btnStyle} flat>
            {props.evaluateStatus === 1 ? (
              <span>
                <MDBIcon className={classes.iconStyle} icon="thumbs-up"/>{props.upvoteCount}个{props.text.thumb}
              </span>
            ) : (
              <span>
                <MDBIcon className={classes.iconStyle} far icon="thumbs-up"/>{props.upvoteCount}个{props.text.thumb}
              </span>
            )}
          </MDBBtn>
          <MDBBtn onClick={props.onDownVote} className={props.evaluateStatus === 2 ? classes.btnStyleActive : classes.btnStyle} flat>
            {props.evaluateStatus === 2 ? (
              <span>
                <MDBIcon className={classes.iconStyle} icon="thumbs-down"/>{props.downvoteCount}个{props.text.disthumb}
              </span>
            ) : (
              <span>
                <MDBIcon className={classes.iconStyle} far icon="thumbs-down"/>{props.downvoteCount}个{props.text.disthumb}
              </span>
            )}
          </MDBBtn>
          {!props.attention ? (
            <button onClick={props.onAttention} className={classes.btnOthers}>
              <img alt={'collection'} className={classes.iconStyle} src={HalfHeart} />{props.text.collection}
            </button>
          ) : (
            <button onClick={props.onAttention} className={classes.btnOthers}>
              <img alt={'discollection'} className={classes.iconStyle} src={FullHeart} />{props.text.discollection}
            </button>
          )}
          <MDBBtn onClick={props.showComments} className={classes.btnStyle} flat>
            <MDBIcon className={classes.iconStyle} far icon="comment"/>{props.commentsText}
          </MDBBtn>
          {/*<MDBBtn onClick={props.onShare} className={classes.btnStyle} flat>*/}
            {/*<img src={share} alt="share" className={classes.iconStyle} />{props.text.share}*/}
          {/*</MDBBtn>*/}
          {/*<MDBBtn flat style={{padding: '5px 10px',}}>*/}
          {/*<MDBIcon style={{marginRight: '5px'}} icon="ban"/>*/}
          {/*举报*/}
          {/*</MDBBtn>*/}
          {/*{props.isCollapsed ? null :*/}
          {/*<MDBBtn className={classes.btnStyle} onClick={props.handleSpanClick} flat>*/}
          {/*{props.text.ellipsis}*/}
          {/*/!*<MDBIcon style={{marginRight: '5px'}} icon="arrow-up"/>*!/*/}
          {/*</MDBBtn>*/}
          {/*}*/}
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
  upvoteCount: PropTypes.number,
  downvoteCount: PropTypes.number,
  attentionCount: PropTypes.number.isRequired,
  attention: PropTypes.bool.isRequired,
  evaluateStatus: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onAttention: PropTypes.func.isRequired,
  // func
  showComments: PropTypes.func.isRequired,
  handleSpanClick: PropTypes.func.isRequired,
  // style
  stickyRow: PropTypes.object.isRequired,
};

const i18n = [
  {
    thumb:'点赞',
    disthumb:'反对',
    collection:'收藏',
    discollection:'已收藏',
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
