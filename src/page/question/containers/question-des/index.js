import React from 'react';
import PropTypes from 'prop-types';
import braftEditor from 'braft-editor';
import {MDBCol, MDBIcon} from 'mdbreact';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../tool/language-helper';
import {Link} from 'react-router-dom';
import HalfHeart from '../../public/false.png';
import FullHeart from '../../public/true.png';

import classes from './question-des.module.css';

const QuestionDes = React.memo((props) => (
  <MDBCol className={classes.mdbCol}>
    {/*<div className={classes.titleWrapper}>*/}
    {/*{props.tags.map((item) => {*/}
    {/*return (*/}
    {/*<span className={classes.tagWrapper} key={item}>*/}
    {/*<button className={classes.btnStyle}>*/}
    {/*{item}*/}
    {/*</button>*/}
    {/*</span>*/}
    {/*);*/}
    {/*})}*/}
    {/*<div className={classes.readingWrapper}>*/}
    {/*<span className={classes.viewSpanStyle}>*/}
    {/*<MDBIcon className={classes.viewIcon} far icon="eye" />*/}
    {/*被浏览  <strong className={classes.readingColor}>1872W</strong>*/}
    {/*</span>*/}
    {/*</div>*/}
    {/*</div>*/}
    <br />
    <p className={classes.questionTitle}>{props.content.title}</p>
    <p
      className={classes.richText}
      dangerouslySetInnerHTML={{__html: props.content.detail === '' ? braftEditor.createEditorState(props.content.detail).toHTML() : braftEditor.createEditorState(JSON.parse(props.content.detail).braftEditorRaw).toHTML()}} />
    <div>
      {props.answerStatus !== false ? (
        <Link to={{
          pathname: `/question/${props.questionId}/answer/${props.answerStatus}/edit`,
          state: {
            content: props.content
          },
        }}>
          <button className={classes.btnAnswer}>
            {props.text.hasAnswer}
          </button>
        </Link>
      ) : (
        <Link to={{
          pathname: `/question/${props.questionId}/answer/create`,
          state: {
            content: props.content
          },
        }}>
          <button className={classes.btnAnswer}>
            {props.text.toAnswer}
          </button>
        </Link>
      )}
      {String(props.id) === window.localStorage.id && (
        <button className={classes.btnFocus}>
          <Link style={{color:'#4F65E1'}} to={`/question/${props.questionId}/edit`}>
            修改问题
          </Link>
        </button>
      )}
      {String(props.id) === window.localStorage.id && (
        <button onClick={props.onDeleteQue} className={classes.btnFocus}>
            删除问题
        </button>
      )}
      <button className={classes.btnOthers}>
        <MDBIcon className={classes.btnIcon} icon="thumbs-up" />{props.text.toInvite}
      </button>
      {!props.attention ? (
        <button onClick={props.onAttention} className={classes.btnOthers}>
          <img alt={'collection'} className={classes.btnIcon} src={HalfHeart} />{props.text.collection}
        </button>
      ) : (
        <button onClick={props.onAttention} className={classes.btnOthers}>
          <img alt={'discollection'} className={classes.btnIcon} src={FullHeart} />{props.text.discollection}
        </button>
      )}
      {/*<button onClick={props.onShare} className={classes.btnOthers}>*/}
      {/*<MDBIcon className={classes.btnIcon} icon="share" />{props.text.share}*/}
      {/*</button>*/}
    </div>
  </MDBCol>
));

const i18n = [
  {
    focusNum: '关注者',
    readingNum: '浏览次数',
    toAnswer: '我来回答',
    hasAnswer: '修改回答',
    toInvite: '邀请回答',
    share: '分享',
    collection: '收藏',
    discollection: '已收藏'
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

QuestionDes.propTypes = {
  // self
  // tags: PropTypes.array.isRequired,
  content: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
  attention: PropTypes.bool.isRequired,
  onAttention: PropTypes.func.isRequired,
  onDeleteQue: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  answerStatus: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  // editorState: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};
QuestionDes.displayName = 'QuestionDes';

export default connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth,
      text: i18n[languageHelper()]
    };
  }
)(QuestionDes);
