import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {isLogin, getAsync} from '../../tool/api-helper';
import QuestionDes from './containers/question-des/';
import Answers from './components/answers/';
import SideBar from './components/side-bar/';
import classes from './index.module.css';

class QuestionReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null
    };
    // i18n
    this.text = QuestionReact.i18n[languageHelper()];
  }
  
  async componentDidMount() {
    if(isLogin()) {
      const id = this.props.match.params.qid;
      try{
        const result = await getAsync(`/questions/${id}`);
        if(result.status.code === 2000) {
          this.setState(()=>({
            backend:result.content
          }));
        } else {
          return (<Redirect to={'/page-not-found'} />);
        }
      } catch (e) {
        alert(e);
      }
    } else {
      return (<Redirect to={'/login'} />);
    }
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    const backend = this.state.backend;
    return (this.state.backend !== null) ? (
      <div>
        <QuestionDes
          content={{
            title:backend.title,
            detail:backend.body}}
          questionId={this.props.match.params.qid}
        />
        <div
          className="cell-wall"
          style={{backgroundColor:'#F0F3FA'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.answerWrapper}>
              <div className={classes.answerWrapper2}>
                <Answers answers={backend.answers}/>
              </div>
              <div className={classes.sideBar}>
                <SideBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

QuestionReact.i18n = [
  {},
  {}
];

QuestionReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Question = QuestionReact;
