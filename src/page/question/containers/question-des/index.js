import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBCol, MDBIcon} from 'mdbreact';
import {connect} from 'react-redux';
import {languageHelper} from '../../../../tool/language-helper';

import classes from './question-des.module.css';

const QuestionDes = (props) => (
  <div>
    <MDBCol className={classes.mdbCol}>
      <div className={classes.titleWrapper}>
        {props.tags.map((item) => {
          return (
            <span className={classes.tagWrapper} key={item}>
              <button className={classes.btnStyle}>
                {item}
              </button>
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

      <p className={classes.questionDetail}>
        {/*dangerouslySetInnerHTML={{__html: props.editorState.toHTML(props.content.description)}}*/}
        {props.content.detail}
      </p>
      <div>
        <button className={classes.btnAnswer}>
          {props.text.toFocus}
        </button>
        <button className={classes.btnFocus}>
          +
          <Link to={`/question/${props.questionId}/answer/create`}>关注问题</Link>
        </button>
        <button className={classes.btnOthers}>
          <MDBIcon className={classes.btnIcon} icon="thumbs-up"/>{props.text.toInvite}
        </button>
        <button className={classes.btnOthers}>
          <MDBIcon className={classes.btnIcon} icon="comment"/>{props.text.pinglun}
        </button>
        <button className={classes.btnOthers}>
          <MDBIcon className={classes.btnIcon} icon="share" />{props.text.share}
        </button>
      </div>
    </MDBCol>

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

QuestionDes.propTypes = {
  // self
  tags: PropTypes.array.isRequired,
  content: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  questionId: PropTypes.number.isRequired,
  // editorState: PropTypes.object.isRequired,
  basicFont: PropTypes.object.isRequired,
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
)(QuestionDes);
