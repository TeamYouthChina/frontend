import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import img1 from './image 7.png';
import img2 from './image 7.1.png';
import {AnswerCardSquare} from '../playground/general-component/answer-card-square-fulltext';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';


class SubmitDoneReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = SubmitDoneReact.i18n[languageHelper()];
  }
  
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div className="cell-wall d-flex justify-content-start align-items-center" style={{background:'#ffffff'}}>
          <div>
            <img src={img1} style={{height:'27.34vw'}} className="img-fluid"/>
          </div>
          <div className="mx-3 justify-content-center">
            <div className={classes.title}>恭喜你！</div>
            <div className={classes.note}>我们已将您的简历发送给您投递的职位，恭喜您离成功又近了一步！</div>
            <div className={classes.btn}>查看所有申请</div>
          </div>
          <div>
            <img src={img2} style={{height:'27.34vw'}} className="img-fluid"/>
          </div>
        </div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div className={classes.more}>您可能感兴趣</div>
            <div className="d-flex justify-content-between">
              <AnswerCardSquare/>
              <AnswerCardSquare/>
              <AnswerCardSquare/>
            </div>
            <div className="d-flex justify-content-between my-4">
              <AnswerCardSquare/>
              <AnswerCardSquare/>
              <AnswerCardSquare/>
            </div>
          </div>
        </div>
        
         
        
      </div>
    );
  }
}

SubmitDoneReact.i18n = [
  {},
  {}
];

SubmitDoneReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const SubmitDone = SubmitDoneReact;
