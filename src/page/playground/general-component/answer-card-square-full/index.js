

import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';




import classes from './index.module.css';
import more from './more.png';
import {IfCollect} from '../if-collect';

import {languageHelper} from '../../../../tool/language-helper';


class AnswerCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
     
    };
    // i18n
    this.text = AnswerCardSquareReact.i18n[languageHelper()];
  }
  
  render() {



    return (
      <div className={classes.content}>
        <div className="d-flex justify-content-between">
          <div className={classes.title}>
            {this.props.title}
          </div>
          <div>
            <img
              src={more}
            />
          </div>
        </div>
        <div className="d-flex">
          
          {/* <div className={classes.role}>
            <div className="px-2">{this.state.backend.content.creator.role}</div>
          </div>*/}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-5">
          {/*<div className={classes.answer}>共10条回答</div>*/}
          <div className="d-flex align-self-end">
            <div className={`mr-2 ${classes.avatar}`}>
              <img
                src={(this.props.avatar==='---')?('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'):(this.props.avatar)}
                className="rounded-circle img-fluid p-0 float-right"
                alt="Sample avatar"
              />
            </div>
            <div className={classes.people}>{this.props.username}</div>
          </div>
          
          <div className={classes.answer}><IfCollect/></div>
        </div>
      </div>

    );
  }
}

AnswerCardSquareReact.i18n = [
  {},
  {}
];

AnswerCardSquareReact.propTypes = {
  // self

  /* 在这里添加自定义的组件属性。重要！务必添加，否则 ESlint 会报错，并导致无法 commit。 */
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

/* 模块命名：你的命名被用在这里 */

export const AnswerCardSquare = withRouter(AnswerCardSquareReact);

/* 编辑完成后，请务必使用 `eslint.sh --fix .` 进行代码检查。若 ESlint 报错，则无法 commit。 */

/* 区块注释的内容应当删去 */
