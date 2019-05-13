import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {languageHelper} from '../../../../tool/language-helper';

import classes from './review-dex.module.css';
import Comment from '../../public/comment.svg';
import Share from '../../public/share.svg';
import braftEditor from 'braft-editor';
import {MDBIcon} from 'mdbreact';

const ReviewDes = (props) => (
  <div className={classes.reviewDesWrapper}>
    <div className={classes.readingWrapper}>
      <div style={{display: 'flex', marginTop: '1.17vw'}}>
        <div style={{display: 'inline-block'}}>
          <img
            src={'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'}
            alt="avatar"
            className={`rounded-circle ${classes.imgStyle}`}
          />
        </div>
        <div className={classes.spanWrapper}>
          <span className={classes.titleSpan}>{props.user}</span>
          <span className={classes.desSpan}>{props.description}</span>
        </div>
        {String(props.id) === window.localStorage.id ? (
          <button className={classes.btnStyleFocus}>
            <Link style={{color:'#FFFFFF'}} to={`/review/${props.reviewId}/edit`}>
              编辑短则
            </Link>
          </button>
        ) : (
          <button
            onClick={props.onAttention}
            className={props.attention ? classes.btnStyleFocusActive : classes.btnStyleFocus}>
            {props.attention ? '已关注' : '+关注短则'}
          </button>
        )}
        {String(props.id) === window.localStorage.id && (
          <button className={classes.btnStyleFocus} onClick={props.onDeleteReview}>
            删除短则
          </button>
        )}
      </div>
      {/*<span className={classes.viewSpanStyle}>*/}
      {/*<MDBIcon className={classes.viewIcon} far icon="eye" />*/}
      {/*被浏览  <strong className={classes.readingColor}>1872W</strong>*/}
      {/*</span>*/}
    </div>
    <br />
    <div style={{width: '66.1vw'}}>
      <p className={classes.questionTitle}>{props.content.title}</p>
      <p
        className={classes.richText}
        dangerouslySetInnerHTML={{__html: props.content.detail === '' ? braftEditor.createEditorState(props.content.detail).toHTML() : braftEditor.createEditorState(JSON.parse(props.content.detail).braftEditorRaw).toHTML()}} />
      <div className={classes.reviewFooter}>
        <span className={classes.footerFont}>
          {props.time}
        </span>
        <div>
          {props.evaluateStatus === 1 ? (
            <span onClick={props.onVote} className={classes.footerFont}>
              <MDBIcon className={classes.footerIcon} icon="thumbs-up" />
              {props.upvoteCount}个点赞
            </span>
          ) : (
            <span onClick={props.onVote} className={classes.footerFont}>
              <MDBIcon className={classes.footerIcon} far icon="thumbs-up" />
              {props.upvoteCount}个点赞
            </span>
          )}
          {props.evaluateStatus === 2 ? (
            <span onClick={props.onDownVote} className={classes.footerFont}>
              <MDBIcon className={classes.footerIcon} icon="thumbs-down" />
              {props.downvoteCount}个反对
            </span>
          ) : (
            <span onClick={props.onDownVote} className={classes.footerFont}>
              <MDBIcon className={classes.footerIcon} far icon="thumbs-down" />
              {props.downvoteCount}个反对
            </span>
          )}
          <span className={classes.footerFont}>
            <img className={classes.footerIcon} src={Comment} alt="" />
            {props.commentsText}
          </span>
          <span onClick={props.onShare} className={classes.footerFontEnd}>
            <img className={classes.footerIcon} src={Share} alt="" />
            分享
          </span>

        </div>
      </div>
    </div>

  </div>
);

const i18n = [
  {
    focusNum: '关注者',
    readingNum: '浏览次数',
    toFocus: '我来回答',
    toInvite: '邀请回答',
    share: '分享',
    pinglun: '评论'
  },
  {
    focusNum: 'focus number',
    readingNum: 'reading number',
    toFocus: 'focus answer',
    toInvite: 'invite others',
    share: 'share',
    juBao: 'ju bao'
  }
];

ReviewDes.propTypes = {
  // self
  content: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  reviewId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  commentsText: PropTypes.string.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  downvoteCount: PropTypes.number.isRequired,
  attention: PropTypes.bool.isRequired,
  showShare: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onAttention: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDeleteReview: PropTypes.func.isRequired,
  evaluateStatus: PropTypes.number,
  // editorState: PropTypes.object.isRequired
};

export default connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth,
      text: i18n[languageHelper()]
    };
  }
)(ReviewDes);
