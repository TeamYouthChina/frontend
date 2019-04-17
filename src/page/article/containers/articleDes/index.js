import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../tool/language-helper';

import GroupList from '../group-list';
import classes from './articleDes.module.css';
import ThumbUp from '../../../review/public/thumb-up.svg';
import Comment from '../../../review/public/comment.svg';
import Share from '../../../review/public/share.svg';
import braftEditor from 'braft-editor';

const ArticleDes = React.memo((props) => (
  <div className={classes.mdbCol}>
    <p className={classes.questionTitle}>{props.title}</p>
    <div className={classes.avaWrapper} >
      <div className={classes.avaWrapper2}>
        <img
          src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
          alt="avatar"
          className={`rounded-circle ${classes.avaImg}`}
        />
      </div>

      <div className={classes.spanWrapper}>
        <span className={classes.titleSpan}>{props.user}</span>
        <span className={classes.desSpan}>{props.description && props.description[0]}</span>
      </div>
      <button onClick={props.onAttention} className={props.attention ? classes.btnStyleFocusActive : classes.btnStyleFocus}>
        {props.attention ? '已关注' : '+关注文章'}
      </button>
      <div className={classes.upZan}>
        <span onClick={props.onVote} className={props.evaluateStatus !== 3 ? classes.footerFontActive : classes.footerFont}>
          <img className={classes.footerIcon} src={ThumbUp} alt="" />
          {props.upvoteCount}个点赞
        </span>
        <span className={classes.footerFont}>
          <img className={classes.footerIcon} src={Comment} alt="" />
          {props.commentsText}
        </span>
        <span className={classes.footerFontEnd}>
          <img className={classes.footerIcon} src={Share} alt="" />
            分享
        </span>
      </div>
    </div>
    <div className={classes.articleDetailWrapper}>
      <div>
        <p className={classes.richText} dangerouslySetInnerHTML={{__html:props.content === '' ? braftEditor.createEditorState(props.content).toHTML() : braftEditor.createEditorState(JSON.parse(props.content).braftEditorRaw).toHTML()}} />
        <span className={classes.footerFont}>{props.time}</span>
      </div>
      <div className={classes.listWrapper}>
        <GroupList />
      </div>
    </div>
  </div>
));

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

ArticleDes.propTypes = {
  // self
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  description: PropTypes.string,
  evaluateStatus: PropTypes.number,
  title: PropTypes.string.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  commentsText: PropTypes.string.isRequired,
  attention: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
  onAttention: PropTypes.func.isRequired,
  // editorState: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

ArticleDes.displayName = 'ArticleDes';

export default connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth,
      text: i18n[languageHelper()]
    };
  }
)(ArticleDes);
