import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBIcon} from 'mdbreact';
import classes from './index.module.css';
/**
 * @description 展现当前回答所属问题的标题以及编辑和删除部分
 * @param props, title, answerId, questionId, userId, showList
 * */
const Title = React.memo((props) => (
  <div className={classes.wrapper}>
    <Link  to={{
      pathname:`/question/${props.questionId}/answer/${props.answerId}`,
    }}>
      <strong className={classes.title}>{props.title}</strong>
    </Link>
    {String(props.userId) === window.localStorage.id && (
      <div onClick={props.onShowList} className={classes.iconStyle} >
        <MDBIcon icon="ellipsis-h"/>
        {props.showList && (
          <ul className={classes.iconUl}>
            <li>
              <Link style={{color:'#212529'}} to={{
                pathname:`/question/${props.questionId}/answer/${props.answerId}/edit`,
                state:props.data,
              }}>
                编辑内容
              </Link>
            </li>
            <li onClick={props.onGoDelete}>
              删除内容
            </li>
          </ul>
        )}
      </div>
    )}
  </div>
));

Title.displayName = 'answerTitle';
Title.propTypes = {
  // self
  title: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  answerId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  onShowList: PropTypes.func,
  showList: PropTypes.bool,
  onGoDelete: PropTypes.func,
  data: PropTypes.object,
};

export default Title;
