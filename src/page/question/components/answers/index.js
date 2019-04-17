import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter, Link} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';
import {ReviewCardBarFulltext} from '../../../playground/general-component/review-card-bar-fulltext';
import {isLogin} from '../../../../tool/api-helper';

import classes from './answers.module.css';

class AnswersReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null,
      aid: null
    };
    // i18n
    this.text = AnswersReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (isLogin()) {
      if (this.props.match.params.aid !== undefined) {
        let data = null;
        for (let i in this.props.answers) {
          if(String(this.props.answers[i].id) === this.props.match.params.aid){
            data = this.props.answers[i];
            break;
          }
        }
        if (data !== undefined) {
          this.setState(() => ({
            backend: data
          }));
        } else {
          alert('no this answer');
        }
      } else {
        this.setState({
          backend: this.props.answers
        });
      }
    } else {
      return (<Redirect to={'/login'} />);
    }
  }

  handleMoreAnswer = (id) => {
    this.setState({
      aid: id
    });
  };

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    const backend = this.state.backend;
    return (this.state.backend !== null) ? (
      <div className={classes.wrapper}>
        <p className={classes.answerCount}>{this.props.answers.length}条回答</p>
        {this.props.match.params.aid !== undefined ? (
          <React.Fragment>
            <ReviewCardBarFulltext type={'fromQuestion'} ansCommentId={this.props.match.params.aid} fulltext={backend} />
            <div style={{margin: '1.56vw 0vw'}}>
              <Link
                onClick={() => this.handleMoreAnswer(this.props.match.params.aid)}
                to={{pathname: `/question/${this.props.match.params.qid}`}}
                className={`${classes.showMoreAnswer} btn-block`}>
                更多回答
              </Link>
            </div>
          </React.Fragment>
        ) : (
          <div>
            <p className={classes.moreAnswer}>更多回答</p>
            {backend.map((item) => (
              item.id !== backend.aid &&
              (<div key={item.id} style={{marginBottom: '1.56vw'}}>
                <ReviewCardBarFulltext type={'fromQuestion'} ansCommentId={item.id} fulltext={item} />
              </div>)
            ))}
          </div>
        )}
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

AnswersReact.i18n = [
  {},
  {}
];

AnswersReact.propTypes = {
  // self
  answers: PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const Answers = withRouter(AnswersReact);

export default Answers;
