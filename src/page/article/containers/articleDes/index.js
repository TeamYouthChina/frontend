import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import {MDBIcon} from 'mdbreact';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../tool/language-helper';

import GroupList from '../group-list';
import classes from './articleDes.module.css';
import ThumbUp from '../../../review/public/thumb-up.svg';
import Comment from '../../../review/public/comment.svg';
import Share from '../../../review/public/share.svg';

const ArticleDes = (props) => (
  <div className={classes.mdbCol}>
    <div className={classes.titleWrapper}>
      {props.tags.map((item) => {
        return (
          <span className={classes.tagWrapper} key={item}>
            <button className={classes.btnStyle}>{item}</button>
          </span>
        );
      })}
      <div className={classes.readingWrapper}>
        <span className={classes.viewSpanStyle}>
          <MDBIcon className={classes.viewIcon} far icon="eye" />
              被浏览  <strong className={classes.readingColor}>1872W</strong>
        </span>
      </div>
    </div>
    <br />
    <p className={classes.questionTitle}>{props.content.title}</p>
    <div style={{display: 'flex', marginTop: '1.17vw'}}>
      <div style={{display: 'inline-block'}}>
        <img
          style={{width: '4.21vw', background: '#F4F4F4', marginRight: '0.859vw'}}
          src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
          alt="123"
          className="rounded-circle"
        />
      </div>

      <div className={classes.spanWrapper}>
        <span className={classes.titleSpan}>{props.user}</span>
        <span className={classes.desSpan}>{props.description}</span>
      </div>
      <button className={classes.btnStyleFocus}>
        +关注TA
      </button>
      <div style={{margin:'auto 0',marginLeft:'3.12vw'}}>
        <span className={classes.footerFont}>
          <img className={classes.footerIcon} src={ThumbUp} alt="" />
          198k点赞
        </span>
        <span className={classes.footerFont}>
          <img className={classes.footerIcon} src={Comment} alt="" />
          {props.commentsText}</span>
        <span className={classes.footerFontEnd}>
          <img className={classes.footerIcon} src={Share} alt="" />
            分享
        </span>
      </div>
    </div>
    <div className={classes.articleDetailWrapper}>
      <div>
        <p className={classes.questionDetail}>
          {/*dangerouslySetInnerHTML={{__html: props.editorState.toHTML(props.content.description)}}*/}
          {props.content.detail}
        </p>
        <br />
        <p className={classes.questionDetail}>
          {/*dangerouslySetInnerHTML={{__html: props.editorState.toHTML(props.content.description)}}*/}
          {props.content.detail}
        </p>
        <br />
        <p className={classes.questionDetail}>
          {/*dangerouslySetInnerHTML={{__html: props.editorState.toHTML(props.content.description)}}*/}
          {props.content.detail}
        </p>
        <br />
        <p className={classes.questionDetail}>
          {/*dangerouslySetInnerHTML={{__html: props.editorState.toHTML(props.content.description)}}*/}
          {props.content.detail}
        </p>
        <br />
        <p className={classes.questionDetail}>
          {/*dangerouslySetInnerHTML={{__html: props.editorState.toHTML(props.content.description)}}*/}
          {props.content.detail}
        </p>
        <br />
        <p className={classes.questionDetail}>
          {/*dangerouslySetInnerHTML={{__html: props.editorState.toHTML(props.content.description)}}*/}
          {props.content.detail}
        </p>
        <span style={{marginTop:'1.56vw'}} className={classes.footerFont}>2019-1-1</span>
      </div>
      <div style={{marginLeft:'1.56vw'}}>
        <GroupList />
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

ArticleDes.propTypes = {
  // self
  tags: PropTypes.array.isRequired,
  content: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  commentsText: PropTypes.string.isRequired,
  // editorState: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export default connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth,
      text: i18n[languageHelper()]
    };
  }
)(ArticleDes);
