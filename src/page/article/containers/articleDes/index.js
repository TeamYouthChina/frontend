import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../tool/language-helper';

import GroupList from '../group-list';
import classes from './articleDes.module.css';
import Comment from '../../../review/public/comment.svg';
import braftEditor from 'braft-editor';
import {MDBIcon} from 'mdbreact';
import {Link} from 'react-router-dom';

const ArticleDes = React.memo((props) => (
  <div className={classes.mdbCol}>
    <p className={classes.questionTitle}>{props.title}</p>
    <div className={classes.avaWrapper} >
      <div className={classes.avaWrapper2}>
        <img
          src={(props.avatar && (props.avatar.length > 10)) ? props.avatar : 'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'}
          alt="avatar"
          className={`rounded-circle ${classes.avaImg}`}
        />
      </div>

      <div className={classes.spanWrapper}>
        <span className={classes.titleSpan}>{props.user}</span>
        <span className={classes.desSpan}>{props.description && props.description[0]}</span>
      </div>
      {String(props.id) === window.localStorage.id ? (
        <button className={classes.btnStyleFocus}>
          <Link style={{color:'#4F65E1'}} to={`/article/${props.articleId}/edit`}>
            编辑文章
          </Link>
        </button>
      ) : (
        <button onClick={props.onAttention} className={props.attention ? classes.btnStyleFocusActive : classes.btnStyleFocus}>
          {props.attention ? '已收藏' : '+收藏文章'}
        </button>
      )}
      {String(props.id) === window.localStorage.id && (
        <button className={classes.btnStyleFocus} onClick={props.onDeleteReview}>
          删除文章
        </button>
      )}
      <div className={classes.upZan}>
        {props.evaluateStatus === 1 ? (
          <span onClick={props.onVote} className={classes.footerFont}>
            <MDBIcon className={classes.footerIcon} icon="thumbs-up"/>
            {props.upvoteCount}个点赞
          </span>
        ) : (
          <span onClick={props.onVote} className={classes.footerFont}>
            <MDBIcon className={classes.footerIcon} far icon="thumbs-up"/>
            {props.upvoteCount}个点赞
          </span>
        )}
        {props.evaluateStatus === 2 ? (
          <span onClick={props.onDownVote} className={classes.footerFont}>
            <MDBIcon className={classes.footerIcon} icon="thumbs-down"/>
            {props.downvoteCount}个反对
          </span>
        ) : (
          <span onClick={props.onDownVote} className={classes.footerFont}>
            <MDBIcon className={classes.footerIcon} far icon="thumbs-down"/>
            {props.downvoteCount}个反对
          </span>
        )}
        <span className={classes.footerFont}>
          <img className={classes.footerIcon} src={Comment} alt="" />
          {props.commentsText}
        </span>
        {/*<span onClick={props.onShare} className={classes.footerFontEnd}>*/}
        {/*<img className={classes.footerIcon} src={Share} alt="" />*/}
        {/*分享*/}
        {/*</span>*/}
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
  avatar: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  description: PropTypes.string,
  evaluateStatus: PropTypes.number,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  articleId: PropTypes.number.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  downvoteCount: PropTypes.number.isRequired,
  commentsText: PropTypes.string.isRequired,
  attention: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onAttention: PropTypes.func.isRequired,
  onDeleteReview: PropTypes.func.isRequired,
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
