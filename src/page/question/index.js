import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {isLogin, getAsync, urlPrefix, generateHeaders} from '../../tool/api-helper';
import QuestionDes from './containers/question-des/';
import Answers from './components/answers/';
import SideBar from './components/side-bar/';
import classes from './index.module.css';
import Share from './containers/share';

class QuestionReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null,
      ifHasAnswered:false,
      showShare:false
    };
    // i18n
    this.text = QuestionReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (isLogin()) {
      const id = this.props.match.params.qid;
      try {
        const result = await getAsync(`/questions/${id}`);
        if (result.status.code === 2000) {
          let ifHasAnswered = false;
          for(let i = 0; i < result.content.answers.length;i++){
            if(String(result.content.answers[i].creator.id) === window.localStorage.id){
              ifHasAnswered = result.content.answers[i].id;
              break;
            }
          }
          this.setState(() => ({
            backend: result.content,
            ifHasAnswered
          }));
        } else {
          this.props.history.push('/page-not-found');
        }
      } catch (e) {
        alert(e);
      }
    } else {
      this.props.history.push('/login');
    }
  }
  
  onAttention = () => {
    let attention = !this.state.backend.attention;
    this.setState(()=>({
      backend:{
        ...this.state.backend,
        attention:attention
      }
    }));
    const data = {
      id:Number(window.localStorage.id)
    };
    if(attention) {
      try {
        fetch(
          `${urlPrefix}/questions/${this.props.match.params.qid}/attention`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
    } else {
      try {
        fetch(
          `${urlPrefix}/questions/attentions/${this.props.match.params.qid}`,
          {
            method: 'DELETE',
            headers: generateHeaders(),
            body: null
          },
        );
      } catch (e) {
        alert(e);
      }
    }
  };
  
  onShare = () =>{
    const showShare = !this.state.showShare;
    this.setState(()=>({
      showShare
    }));
  };

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
            title: backend.title,
            detail: backend.body.braftEditorRaw
          }}
          questionId={this.props.match.params.qid}
          attention={backend.attention}
          onAttention={this.onAttention}
          answerStatus={this.state.ifHasAnswered}
          onShare={this.onShare}
        />
        <Share
          content={window.location.href}
          onShare={this.onShare}
          showShare={this.state.showShare}
        />
        <div
          className="cell-wall"
          style={{backgroundColor: '#F0F3FA'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.answerWrapper}>
              <div className={classes.answerWrapper2}>
                {backend.answers.length === 0 ? (
                  <div className={classes.addMore}>
                    <div>
                      <svg width="150" height="120" viewBox="0 0 150 120" fill="currentColor">
                        <g fill="none">
                          <path fill="#EBEEF5" d="M67.757 83H45c-1.66 0-3-1.338-3-2.998V37.998A3.003 3.003 0 0 1 45 35h53.42v-3H45c-3.31 0-6 2.686-6 5.998v42.004A5.994 5.994 0 0 0 45 86h21.515l6.853 6.854a2.99 2.99 0 0 0 4.234 0L84.456 86H105c3.31 0 6-2.686 6-5.998v-36.54h-3v36.54A3.003 3.003 0 0 1 105 83H83.214l-7.728 7.728L67.756 83z" />
                          <path fill="#F7F8FA" d="M55 48.5c0-.828.67-1.5 1.508-1.5h26.984a1.5 1.5 0 1 1 0 3H56.508A1.5 1.5 0 0 1 55 48.5zm0 11c0-.828.677-1.5 1.495-1.5h37.01c.826 0 1.495.666 1.495 1.5 0 .828-.677 1.5-1.495 1.5h-37.01A1.494 1.494 0 0 1 55 59.5zm0 11c0-.828.677-1.5 1.495-1.5h37.01c.826 0 1.495.666 1.495 1.5 0 .828-.677 1.5-1.495 1.5h-37.01A1.494 1.494 0 0 1 55 70.5z" />
                          <path fill="#EBEEF5" d="M94.868 50.46l18.92-18.92-2.83-2.827-18.918 18.92-2.12-2.123 18.917-18.918a3.005 3.005 0 0 1 4.245-.002l2.828 2.828a3.004 3.004 0 0 1-.002 4.245L96.99 52.58l-2.122-2.12zm-7.193 2.377l2.244-7.327 7.07 7.07-7.328 2.245c-1.575.482-2.473-.405-1.988-1.988z" />
                        </g>
                      </svg>
                      <p className={classes.pStyle}>
                        还没有回答，赶快来回答吧
                      </p>
                    </div>
                  </div>
                ) : (
                  <Answers answers={backend.answers} />
                )}
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
