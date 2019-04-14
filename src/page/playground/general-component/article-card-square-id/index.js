
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';



import classes from './index.module.css';
import {IfCollect} from '../if-collect';

import {languageHelper} from '../../../../tool/language-helper';


import more from './more.png';




class ArticleCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = ArticleCardSquareReact.i18n[languageHelper()];
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
        {/*<div className="d-flex">
          <div className={` px-2 mr-2 ${classes.tag1}`}>人工智能</div>
          <div className={` px-2 mr-2 ${classes.tag1}`}>发展历史</div>
          <div className={` px-2 ${classes.tag1}`}>干货分享</div>
        </div>*/}
        <div className="d-flex justify-content-between" style={{marginTop:'4.7vw'}}>
          <div className="d-flex align-items-center">
            <div className={classes.avatar}>
              <img
                src={(this.props.avatar)?(this.props.avatar):('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png')}
                className="rounded-circle img-fluid p-0 float-right"
              />
            </div>
            <div className={classes.people}>{this.props.username}</div>
            {/*<div className={classes.tag2}><div className="px-2">{this.state.backend.content.author.role}</div></div>*/}
          </div>
          <IfCollect/>
        </div>
      </div>

    );
  }
}

ArticleCardSquareReact.i18n = [
  {},
  {}
];

ArticleCardSquareReact.propTypes = {
  // self

  /* 在这里添加自定义的组件属性。重要！务必添加，否则 ESlint 会报错，并导致无法 commit。 */
  title:PropTypes.string.isRequired,
  avatar:PropTypes.string.isRequired,
  username:PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

/* 模块命名：你的命名被用在这里 */

export const ArticleCardSquare = withRouter(ArticleCardSquareReact);

/* 编辑完成后，请务必使用 `eslint.sh --fix .` 进行代码检查。若 ESlint 报错，则无法 commit。 */

/* 区块注释的内容应当删去 */
