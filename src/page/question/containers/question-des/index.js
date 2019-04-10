import React from 'react';
import PropTypes from 'prop-types';
import braftEditor from 'braft-editor';
import {MDBCol, MDBIcon} from 'mdbreact';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../tool/language-helper';

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
    <p className={classes.questionDetail} dangerouslySetInnerHTML={{__html: braftEditor.createEditorState(props.content.detail).toHTML()}}>
      
    </p>
    <div>
      <button className={classes.btnAnswer}>
        {props.text.toFocus}
      </button>
      <button className={classes.btnFocus}>
        + 关注问题
      </button>
      <button className={classes.btnOthers}>
        <MDBIcon className={classes.btnIcon} icon="thumbs-up" />{props.text.toInvite}
      </button>
      <button className={classes.btnOthers}>
        <MDBIcon className={classes.btnIcon} icon="heart" />{props.text.collection}
      </button>
      <button className={classes.btnOthers}>
        <MDBIcon className={classes.btnIcon} icon="share" />{props.text.share}
      </button>
    </div>
  </MDBCol>
));

const i18n = [
  {
    focusNum: '关注者',
    readingNum: '浏览次数',
    toFocus: '我来回答',
    toInvite: '邀请回答',
    share: '分享',
    collection: '收藏'
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
  questionId: PropTypes.string.isRequired,
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
